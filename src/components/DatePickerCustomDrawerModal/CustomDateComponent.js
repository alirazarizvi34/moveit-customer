import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import moment from 'moment';
import {moderateScale, scale} from 'react-native-size-matters';
import {colorTheme} from '../../constants/ColorConstants';
import {THEME} from '../../shared/theme';

const CustomDateComponent = ({day, selectedDate, onDaySelect,max_days}) => {
  const currentDate = moment(new Date()).format('yyyy-MM-DD');

  const isCurrentDateGreaterThanGivenDate = givenDate => {
    const givenDateTime = moment(givenDate, 'YYYY-MM-DD');
    const currentDate = moment();
    return currentDate.isAfter(givenDateTime, 'day');
  };

  const disabledHandler = day => {
    if (isCurrentDateGreaterThanGivenDate(day)) {
      return true;
    } else {
      if (isDateAfterDays(day, max_days)) {
        return true;
      } else {
        return false;
      }
    }
  };

  function isDateAfterDays(inputDate, days) {
    const parsedDate = moment(inputDate, 'YYYY-MM-DD');
    const targetDate = moment().add(days, 'days');
    return parsedDate.isAfter(targetDate);
  }

  return (
    <TouchableOpacity
      disabled={disabledHandler(day?.date?.dateString)}
      onPress={() => onDaySelect(day?.date?.dateString)}
      style={
        selectedDate == day?.date?.dateString
          ? styles.selectedContainer
          : currentDate == day?.date?.dateString
          ? styles.currentDate
          : styles.container
      }>
      <Text
        style={
          disabledHandler(day?.date?.dateString)
            ? styles.disabledText
            : selectedDate == day?.date?.dateString
            ? styles.selectedText
            : currentDate == day?.date?.dateString
            ? styles.currentDateText
            : styles.dateText
        }>
        {moment(day?.date.dateString).format('D')}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomDateComponent;

const {
  defaultText,
  secondaryBackground,
  primaryBorder,
  primaryText,
  whiteText,
  disableText,
} = colorTheme;
const {latoRegular} = THEME.fonts;

const styles = StyleSheet.create({
  container: {
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  disabledText: {
    color: disableText,
    fontSize: scale(16),
    fontFamily: latoRegular,
  },
  currentDate: {
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    borderColor: primaryBorder,
    borderWidth: 1,
  },
  selectedText: {
    fontSize: scale(16),
    fontFamily: latoRegular,
    color: whiteText,
  },
  currentDateText: {
    color: primaryText,
    fontSize: scale(16),
    fontFamily: latoRegular,
  },
  selectedContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: secondaryBackground,
    borderRadius: 20,
  },
  dateText: {
    fontSize: scale(16),
    fontFamily: latoRegular,
    color: defaultText,
  },
});
