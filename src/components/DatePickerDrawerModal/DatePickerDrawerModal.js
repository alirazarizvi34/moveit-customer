import {View, Text, StyleSheet} from 'react-native';
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
import DateComponent from './DateComponent';

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
const {latoBold, latoSemiBold, latoHeavy, jameelNooriNastaleeq} = THEME.fonts;

const DatePickerDrawerModal = ({
  children,
  visible,
  onModalClose,
  draggable,
  onClose,
  onPress,
  mode,
  onDaySelect,
  type,
  currentDate,
  currentRequestType,
  requestType=null,
  ...props
}) => {
  const {i18n, t} = useTranslation();
  const initDate = currentDate ?? new Date();
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

  useEffect(() => {
    try {
      if (type == 'move' && currentRequestType == 'move') {
        var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        const tommorowDate = year + '-' + month + '-' + day;
        const tommorowFormmatedDate = moment(tommorowDate).format('YYYY-MM-DD');
        const currentSelectedDate = moment(selected).format('YYYY-MM-DD');
        const currentDay = moment(new Date()).format('YYYY-MM-DD');
        if (
          currentSelectedDate !== tommorowFormmatedDate &&
          currentSelectedDate !== currentDay
        ) {
          setSelected(currentSelectedDate);
        } else {
          setSelected(tommorowFormmatedDate);
        }
        let formattedDay = moment(initDate).format('dddd');
        if (onDaySelect) {
          onDaySelect(formattedDay);
        }
      } else {
        setSelected(moment(initDate).format('YYYY-MM-DD'));
        let formattedDay = moment(initDate).format('dddd');
        if (onDaySelect) {
          onDaySelect(formattedDay);
        }
      }
    } catch (err) {}
  }, [currentRequestType, type]);

  const bgColorHandler = () => {
    if (!mode || mode == 'dark') {
      return primaryBackground;
    } else {
      return drawerPinkBackground;
    }
  };

  const styles = getStyles(i18n.language, bgColorHandler);

  const onDayPressHandler = day => {
    if (type == 'move' && currentRequestType == 'move') {
      onMovePressHandler(day);
    } else {
      onSurveyPressHandler(day);
    }
  };

  const dateDifferenceHandler = dateString => {
    const a = new Date();
    const b = new Date(moment(dateString));
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  };

  const onMovePressHandler = dateString => {
    var diffDays = dateDifferenceHandler(dateString);
    let formattedDay = moment(dateString).format('dddd');

    if (diffDays > 0) {
      setSelected(dateString);
      onDaySelect(formattedDay);
    } else {
      toastService.shortToast('You Cannot book move on same date');
    }
  };

  const onSurveyPressHandler = dateString => {
    let formattedDay = moment(dateString).format('dddd');

    if (
      (type == 'survey' && formattedDay == 'Sunday') ||
      (currentRequestType == 'survey' && formattedDay == 'Sunday')
    ) {
      toastService.shortToast('You Cannot Book a Survey on Sunday');
    } else if (
      (type == 'survey' && formattedDay == 'Saturday') ||
      (currentRequestType == 'survey' && formattedDay == 'Saturday')
    ) {
      const difference = dateDifferenceHandler(dateString);
      if (difference >= 2) {
        setSelected(dateString);
        onDaySelect(formattedDay);
      } else {
        toastService.shortToast(
          'Survey can only be booked on Saturday if there is a margin of 2 days.',
        );
      }
    } else {
      setSelected(dateString);
      onDaySelect(formattedDay);
    }
  };
  return (
    <BottomModal onClose={onClose} draggable={true} visible={visible}>
      <View style={styles.modalView}>
        <View style={styles.labelView}>
          <Text style={styles.label}>
            When do you want to schedule{' '}
            {requestType ? requestType : currentRequestType == 'survey' ? currentRequestType : type}?
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
              <DateComponent
                currentRequestType={currentRequestType}
                type={type}
                onDaySelect={onDayPressHandler}
                selectedDate={selected}
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
export default DatePickerDrawerModal;

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
      fontSize: scale(16),
      fontFamily: latoBold,
      color: defaultText,
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
      // backgroundColor
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
      fontSize: language === 'urdu' ? scale(16) : scale(20),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoSemiBold,
      // fontFamily: latoSemiBold,
      textAlign: 'center',
    },
  });
