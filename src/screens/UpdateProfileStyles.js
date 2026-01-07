import {StyleSheet} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {THEME} from '../shared/theme';

const {colorWhite, color4E008A} = THEME.colors;
export const getStyles = language =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
      marginTop: moderateVerticalScale(120),
      width: '100%',
      flex: 1,
      borderWidth: 1,
      borderRadius: 25,
      borderColor: color4E008A,
      zIndex: 99999999,
    },
    imageContainer: {
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      height: 100,
    },
    avatarContainer: {
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      top: -50,
    },
    line: {
      height: moderateVerticalScale(1),
      backgroundColor: 'black',
      width: '100%',
      position: 'absolute',
    },
    inputContainer: {
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      paddingHorizontal: moderateScale(28),
    },
    inputInnerContainer: {
      width: '100%',
      marginVertical: moderateVerticalScale(10),
    },
    footerView: {
      paddingHorizontal: moderateScale(20),
      marginTop:moderateVerticalScale(60),
      paddingBottom:moderateVerticalScale(30)
    },
  });
