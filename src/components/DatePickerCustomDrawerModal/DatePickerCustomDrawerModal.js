import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import BottomModal from '../Modal/BottomModal';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Entypo';
import ButtonComponent from '../buttonComp/ButtonComponent';
import {colorTheme} from '../../constants/ColorConstants';
import moment from 'moment';
import toastService from '../../services/toast-service';
import Day from 'react-native-calendars/src/calendar/day';
import {AppConstants} from '../../constants/AppConstants';
import DateComponent from '../DatePickerDrawerModal/DateComponent';
import CustomDateComponent from './CustomDateComponent';

const {
  defaultText,
  defaultBackground,
  defaultBorder,
  secondaryBackground,
  primaryBackground,
  primaryText,
  disableText,
  whiteText,
  lightPurpleBackground,
  drawerPinkBackground,
} = colorTheme;
const {jameelNooriNastaleeq, latoSemiBold, latoHeavy,latoBold} = THEME.fonts;

const DatePickerCustomDrawerModal = ({
  children,
  visible,
  onModalClose,
  draggable,
  onClose,
  onPress,
  mode,
  type,
  max_days,
  ...props
}) => {
  const {i18n, t} = useTranslation();
  const initDate = moment(new Date()).format("YYYY-MM-DD");
  LocaleConfig.locales['en'] = AppConstants.relocationCalendarLocale;
  LocaleConfig.defaultLocale = 'en';
  const [selected, setSelected] = useState(initDate);
  const marked = useMemo(
    () => ({
      [selected]: {
        selected: true,
        selectedColor: secondaryBackground,
        selectedTextColor: defaultBackground,
      },
    }),
    [selected],
  );

  const bgColorHandler = () => {
    if (!mode || mode == 'dark') {
      return primaryBackground;
    } else {
      return drawerPinkBackground;
    }
  };

  const styles = getStyles(i18n.language, bgColorHandler);

  const onDayPressHandler = day => {
    setSelected(day);
  };

  return (
    <BottomModal onClose={onClose} draggable={true} visible={visible}>
      <View style={styles.modalView}>
        <View style={styles.labelView}>
          <Text style={styles.label}>
          {t('select_your_move_day')}
          </Text>
        </View>

        <View style={styles.horizontalLineView}>
          <View style={styles.horizontalLine} />
        </View>

        <View style={styles.calendarView}>
          <Calendar
            disabledDaysIndexes={[0]}
            disableAllTouchEventsForInactiveDays={true}
            disableAllTouchEventsForDisabledDays={true}
            headerStyle={styles.calenderHeader}
            markedDates={marked}
            dayComponent={day => (
                <CustomDateComponent
                  onDaySelect={onDayPressHandler}
                  selectedDate={selected}
                  max_days={max_days}
                  day={day}
                />
              )}
            hideExtraDays
            enableSwipeMonths
            renderArrow={direction =>
              direction === 'left' ? (
                <Icon
                  name={'chevron-left'}
                  size={30}
                  color={primaryBackground}
                />
              ) : (
                <Icon
                  name={'chevron-right'}
                  size={30}
                  color={primaryBackground}
                />
              )
            }
            onDayPress={onDayPressHandler}
            {...props}
            theme={styles.calendarTheme}
          />
        </View>
        <View style={styles.buttonView}>
          <ButtonComponent
            disabled={false}
            pressStatus={false}
            text={t('continue')}
            textStyle={styles.buttonTitle}
            onPress={() => onPress(selected)}
          />
        </View>
      </View>
    </BottomModal>
  );
};
export default DatePickerCustomDrawerModal;

const getStyles = (language, bgColorHandler) =>
  StyleSheet.create({
    modalView: {
      backgroundColor: bgColorHandler(),
      borderTopRightRadius: 12,
      borderTopLeftRadius: 12,
      paddingBottom: moderateVerticalScale(20),
      paddingTop: moderateVerticalScale(35),
    },
    labelView: {
      marginHorizontal: moderateScale(33),
    },
    label: {
      fontSize: scale(20),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoBold,
      color: defaultText,
      textAlign: language === 'urdu' ? 'right' : 'left',
    },
    headerTitle: {
      fontSize: scale(24),
      fontFamily: latoHeavy,
      color: primaryText,
    },
    calenderHeader: {
      gap: moderateScale(15),
    },
    horizontalLineView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: moderateVerticalScale(28),
    },
    horizontalLine: {
      flex: 1,
      height: moderateScale(1),
      backgroundColor: defaultBorder,
    },
    calendarView: {
      flex: 1,
      marginHorizontal: moderateScale(10),
      backgroundColor: drawerPinkBackground,
    },
    calendarTheme: {
      backgroundColor: drawerPinkBackground,
      calendarBackground: drawerPinkBackground,
      textSectionTitleColor: defaultText,
      selectedDayTextColor: whiteText,
      todayTextColor: primaryText,
      dayTextColor: defaultText,
      textSectionTitleDisabledColor: disableText,
      textDisabledColor: disableText,
      monthTextColor: primaryText,
      textDayFontFamily: latoSemiBold,
      textMonthFontFamily: latoSemiBold,
      textDayHeaderFontFamily: latoSemiBold,
      textMonthFontWeight: '900',
      textDayHeaderFontWeight: '400',
      textDayFontSize: scale(16),
      textMonthFontSize: scale(24),
      textDayHeaderFontSize: scale(16),
    },
    buttonView: {
      marginTop: moderateVerticalScale(16),
      marginBottom: moderateVerticalScale(10),
      paddingHorizontal: moderateScale(22),
    },
    buttonTitle: {
      fontSize: language === 'urdu' ? scale(24) : scale(20),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoSemiBold,
      // fontSize: scale(20),
      // fontFamily: latoSemiBold,
      textAlign: 'center',
    },
  });
