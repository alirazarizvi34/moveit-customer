import {StyleSheet} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';

import {THEME} from '../shared/theme';

const {color4D226D, colorFFBE50, color6F6477, validateColor} = THEME.colors;
const {jameelNooriNastaleeq, latoRegular} = THEME.fonts;

export const getStyles = language =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    cotainer: {flex: 1, overflow: 'hidden'},
    otpInputTextStyle: {
      padding: 7,
      backgroundColor: '#ECECEC',
      marginHorizontal: 10,
      width: 40,
      fontSize: 20,
      textAlign: 'center',
      borderBottomColor: '#4E008A',
      borderBottomWidth: 4,
    },
    btnVerifyStyle: {
      marginTop: 40,
    },
    btnResendStyle: {
      marginTop: 25,
      marginBottom: 25,
      backgroundColor: colorFFBE50,
    },
    btnResendTextStyle: {
      color: color4D226D,
      fontSize: language === 'urdu' ? scale(24) : scale(20),
      lineHeight: language === 'urdu' ? moderateScale(33) : null,
    },
    numberText: {
      textAlign: 'center',
      marginTop: 25,
      color: color6F6477,
      fontSize: scale(18),
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoRegular,
    },
    otpNumber: {
      textAlign: 'center',
      color: color6F6477,
      fontSize: language == 'urdu' ? scale(22) : scale(20),
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoRegular,
    },
    otpContainer: {
      flexDirection: 'row',
      marginTop: 20,
      justifyContent: 'center',
    },
    buttonContainer: {
      marginHorizontal: 30,
      marginBottom: 10,
    },
    invalidOtp: {
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoRegular,
      fontSize: scale(20),
      textAlign: 'center',
      marginTop: 40,
      color: validateColor,
    },
    otpBtn: {
      fontSize: language === 'urdu' ? scale(24) : scale(20),
      lineHeight: language === 'urdu' ? moderateScale(33) : null,
    },
  });
