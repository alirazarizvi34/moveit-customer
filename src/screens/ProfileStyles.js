import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

import {THEME} from '../shared/theme';

const {colorWhite, colorGray, color4E008A, color0267FF,colorBlack} = THEME.colors;
const {latoSemiBold, latoMedium} = THEME.fonts;
export const getStyles = language =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorWhite,
    },
    userInfoContainer: {
      marginVertical: moderateVerticalScale(15),
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoTextContainer: {
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      marginVertical: moderateVerticalScale(10),
    },
    infoName: {
      fontSize: scale(20),
      fontFamily: latoSemiBold,
      color: color4E008A,
    },
    infoNumber: {
      fontSize: scale(16),
      color: colorGray,
      fontFamily: latoMedium,
    },
    btnContainer: {
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    settingsContainer: {
      marginVertical: moderateVerticalScale(25),
      marginHorizontal: moderateScale(30),
    },
    footerContainer: {
      marginTop: moderateVerticalScale(50),
    },
    logoutButtonContainer: {
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    accountDeleteContainer: {
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      marginTop: moderateVerticalScale(16),
    },
    accountDeleteText: {
      textDecorationLine: 'underline',
      color: color0267FF,
      fontSize: scale(14),
      fontFamily: latoMedium,
      letterSpacing: 0.1,
    },
    appVersionContainer: {
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      marginTop: moderateVerticalScale(11),
    },
    appversionText: {
      fontSize: scale(10),
      fontFamily: latoMedium,
      color:colorBlack
    },
  });
