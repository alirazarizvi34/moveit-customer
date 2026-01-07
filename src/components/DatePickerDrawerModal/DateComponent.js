import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import moment from 'moment';
import {moderateScale, scale} from 'react-native-size-matters';
import {colorTheme} from '../../constants/ColorConstants';
import {THEME} from '../../shared/theme';

const DateComponent = ({
  day,
  selectedDate,
  onDaySelect,
  type,
  currentRequestType,
}) => {
  const currentDate = moment(new Date()).format('yyyy-MM-DD');

  const isCurrentDateGreaterThanGivenDate = givenDate => {
    // Parse the given date using moment
    const givenDateTime = moment(givenDate, 'YYYY-MM-DD');

    // Get the current date using moment
    const currentDate = moment();

    // Compare the two dates, excluding equality for the current date
    return currentDate.isAfter(givenDateTime, 'day');
  };

  const dateDifferenceHandler = dateString => {
    try{

      const a = new Date();
      const b = new Date(moment(dateString));
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      // Discard the time and time-zone information.
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      
      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }catch(err){
      console.log("this is err=========",err)
    }
  };

  const disabledHandler = day => {
    if (isCurrentDateGreaterThanGivenDate(day)) {
      return true;
    }
    if (currentRequestType && currentRequestType == 'move') {
      if (currentDate == day) {
        return true;
      } else {
        return false;
      }
    }

    if (currentRequestType && currentRequestType == 'survey') {
      let formattedDay = moment(day).format('dddd');

      if (
        (type == 'survey' && formattedDay == 'Sunday') ||
        (currentRequestType == 'survey' && formattedDay == 'Sunday')
      ) {
        return true;
      } else if (
        (type == 'survey' && formattedDay == 'Saturday') ||
        (currentRequestType == 'survey' && formattedDay == 'Saturday')
      ) {
        const difference = dateDifferenceHandler(day);
        if (difference <= 2) {
          return true;
        } else {
          return false;
        }
      }
    }
  };

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

export default DateComponent;

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
