import {
  View,
  Text,
  Modal,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {memo, useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import {AppImages} from '../../constants/AppImages';
import BottomModal from '../Modal/BottomModal';
import {colorTheme} from '../../constants/ColorConstants';
import moment from 'moment';
import ButtonComponent from '../buttonComp/ButtonComponent';
import {GlobalContext} from '../../../context/GlobalState';
import ScrollPicker from 'react-native-wheely-simple-picker';
import toastService from '../../services/toast-service';

const {
  primaryText,
  darkBlackBorder,
  defaultBorder,
  defaultText,
  errorText,
  errorBackground,
  disableText,
  primaryBackground,
  defaultBackground,
  secondaryBackground,
} = colorTheme;
const {jameelNooriNastaleeq, latoHeavy, latoRegular} = THEME.fonts;

const SmallMoveScheduleTimeModal = ({
  visible,
  small,
  onClose,
  onPress,
  mode,
  min_hours,
}) => {
  const {setScheduledAt, scheduledAt} = useContext(GlobalContext);
  const {i18n, t} = useTranslation();
  const currentNewDate = moment(new Date());
  const [selectedHour, setSelectedHour] = useState(currentNewDate.format('hh'));
  const [selectedMinute, setSelectedMinute] = useState(
    currentNewDate.format('mm'),
  );
  const [selectedAmPm, setSelectedAmPm] = useState(currentNewDate.format('A'));
  const [formatedDateTwelveHours, setFormatedDateTwelveHours] = useState([
    'AM',
    'PM',
  ]);
  const [isTimeValid,setTimeValid] = useState(false);

  const bgColorHandler = () => {
    if (!mode || mode == 'dark') {
      return primaryBackground;
    } else {
      return defaultBackground;
    }
  };
  const styles = getStyles(i18n.language, small, bgColorHandler);

  const hours = Array.from({length: 12}, (_, index) =>
    index < 9 ? `0${index + 1}` : `${index + 1}`,
  );
  const minutes = Array.from({length: 60}, (_, index) =>
    index < 10 ? `0${index}` : `${index}`,
  );

  const calculateTimeDifference = (startTime, endTime) => {
    const format = 'HH:mm';
    const startMoment = moment(startTime, format);
    const endMoment = moment(endTime, format);
    const duration = moment.duration(endMoment.diff(startMoment));
    const differenceInMinutes = duration.asMinutes();
    return differenceInMinutes;
  };

  const confirmBtnHandler = () => {
    const targetDate = moment(scheduledAt);
    const formattedTime = moment(
      selectedHour + ':' + selectedMinute + ' ' + selectedAmPm,
      'hh:mm:ss A',
    );
    const time24Hours = formattedTime.format('HH:mm:ss');
    const offset = moment(currentNewDate).format('Z').replace(':', '');
    const timeDifferenceInMinutes = calculateTimeDifference(currentNewDate, time24Hours);
    if(targetDate.isAfter(currentNewDate)){
      setScheduledAt((pre)=> pre+' '+time24Hours +''+offset);
      onPress();
    }else{
      if (timeDifferenceInMinutes > min_hours*60) {
        setScheduledAt((pre)=> pre+' '+time24Hours +''+offset);
        onPress();
      } else {
        setTimeValid(true);
      }
    }
   
  };

  return (
    <BottomModal onClose={onClose} draggable={true} visible={visible}>
      <View style={styles.modalView}>
        <View style={styles.labelView}>
          <Text style={styles.label}>{t('select_your_move_time')}</Text>
        </View>

        <View style={styles.horizontalLineView}>
          <View style={styles.horizontalLine} />
        </View>

        <View style={styles.picker}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <ScrollPicker
              dataSource={hours}
              selectedIndex={hours.indexOf(selectedHour)}
              onValueChange={(data) => {
                setSelectedHour(data);
                setTimeValid(false);
              }}
              wrapperHeight={150}
              wrapperWidth={54}
              wrapperBackground={defaultBackground}
              itemHeight={50}
              highlightColor={darkBlackBorder}
              highlightBorderWidth={1}
              activeItemTextStyle={{
                fontSize: 20,
                color: primaryText,
                fontFamily: latoHeavy,
              }}
              itemTextStyle={{
                fontSize: 16,
                color: disableText,
                fontFamily: latoHeavy,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <ScrollPicker
              dataSource={minutes}
              selectedIndex={minutes.indexOf(selectedMinute)}
              onValueChange={(data) => {
                setSelectedMinute(data);
                setTimeValid(false);
              }}
              wrapperHeight={150}
              wrapperWidth={54}
              wrapperBackground={defaultBackground}
              itemHeight={50}
              highlightColor={darkBlackBorder}
              highlightBorderWidth={1}
              activeItemTextStyle={{
                fontSize: 20,
                color: primaryText,
                fontFamily: latoHeavy,
              }}
              itemTextStyle={{
                fontSize: 16,
                color: disableText,
                fontFamily: latoHeavy,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <ScrollPicker
              dataSource={formatedDateTwelveHours}
              selectedIndex={formatedDateTwelveHours.indexOf(selectedAmPm)}
              onValueChange={(data) => {
                setSelectedAmPm(data);
                setTimeValid(false);
              }}
              wrapperHeight={150}
              wrapperWidth={54}
              wrapperBackground={defaultBackground}
              itemHeight={50}
              highlightColor={darkBlackBorder}
              highlightBorderWidth={1}
              activeItemTextStyle={{
                fontSize: 20,
                color: primaryText,
                fontFamily: latoHeavy,
              }}
              itemTextStyle={{
                fontSize: 16,
                color: disableText,
                fontFamily: latoHeavy,
              }}
            />
          </View>
        </View>
        {isTimeValid && (
          <View style={styles.errorTextView}>
        <Text style={styles.errorText}>
        {t('schedule_time_validation_text')}
              </Text>
              </View>
        )}
        <View style={styles.confirmButtonView}>
          <ButtonComponent
            disabled={false}
            pressStatus={false}
            text={t('confirm')}
            textStyle={styles.confirmButtonTitle}
            onPress={confirmBtnHandler}
          />
        </View>

        <View style={styles.cancelButtonView}>
          <ButtonComponent
            disabled={false}
            pressStatus={false}
            text={t('cancel')}
            textStyle={styles.cancelButtonTitle}
            btnStyle={{backgroundColor: errorBackground}}
            onPress={onClose}
          />
        </View>
      </View>
    </BottomModal>
  );
};

export default memo(SmallMoveScheduleTimeModal);

const getStyles = (language, small, bgColorHandler) =>
  StyleSheet.create({
    modalView: {
      backgroundColor: bgColorHandler(),
      borderTopRightRadius: 12,
      borderTopLeftRadius: 12,
      // alignItems: 'center',
      paddingBottom: moderateVerticalScale(20),
      paddingTop: moderateVerticalScale(40),
    },
    buttonSubTitle: {
      color: primaryText,
      fontSize: language === 'urdu' ? scale(24) : scale(16),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoHeavy,
      marginBottom:
        language === 'urdu'
          ? moderateVerticalScale(0)
          : moderateVerticalScale(5),
      textAlign: language == 'urdu' ? 'right' : 'left',
    },
    picker: {
      flexDirection: 'row',
      marginHorizontal: moderateScale(57),
      justifyContent: 'center',
      alignItems: 'center',
    },
    labelView: {
      marginHorizontal: moderateScale(33),
    },
    label: {
      fontSize: scale(20),
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoHeavy,
      color: defaultText,
      textAlign: language === 'urdu' ? 'right' : 'left'
    },
    horizontalLineView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: moderateVerticalScale(20),
      // marginVertical: moderateVerticalScale(28),
    },
    horizontalLine: {
      flex: 1,
      height: moderateScale(1),
      backgroundColor: defaultBorder,
    },
    confirmButtonView: {
      marginTop: moderateVerticalScale(16),
      marginBottom: moderateVerticalScale(11),
      marginHorizontal: moderateScale(22),
    },
    cancelButtonView: {
      // marginTop: moderateVerticalScale(16),
      marginBottom: moderateVerticalScale(10),
      marginHorizontal: moderateScale(22),
    },
    confirmButtonTitle: {
      fontSize: language == 'urdu' ? scale(24) : scale(20),
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoHeavy,
      textAlign: 'center',
    },
    cancelButtonTitle: {
      fontSize: language == 'urdu' ? scale(24) : scale(20),
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoHeavy,
      textAlign: 'center',
      color: errorText,
    },
    errorText: {
      fontSize: language == 'urdu' ? scale(18) : scale(12),
      color: errorText,
      paddingTop: moderateScale(6),
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoRegular,
      textAlign: language == 'urdu' ? 'right' : 'left'
  },
  errorTextView: {
    marginHorizontal: moderateScale(22)
  }
  });
