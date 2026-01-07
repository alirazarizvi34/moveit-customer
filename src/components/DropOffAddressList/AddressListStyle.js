import {StyleSheet} from 'react-native';
import {THEME} from '../../shared/theme';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {colorTheme} from '../../constants/ColorConstants';

const {colorGray, colorF6F6F6, colorFFBE50} = THEME.colors;
const {latoMedium, latoHeavy} = THEME.fonts;
const {lightGrayBackground, primaryText} = colorTheme;
export const getStyles = language =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: moderateVerticalScale(10),
    },
    listView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: moderateScale(22),
    },
    headingContainer: {
      flex: 1,
      marginHorizontal: moderateScale(45),
      flexDirection: language == 'urdu' ? 'row-reverse' : 'row',
    },
    pickUp: {
      marginTop: moderateVerticalScale(15),
      fontSize: scale(16),
      fontFamily: latoMedium,
    },
    dropPinCountTxt: {
      // top: moderateVerticalScale(4),
      position: 'absolute',
      fontSize: scale(8),
      color: colorFFBE50,
      alignItems: 'center',
      fontFamily: latoHeavy,
    },
    dropPinCountView: {
      width: 14,
      height: 21,
      alignContent: 'center',
      alignItems: 'center',
    },
    locationCircleImage: {
      width: moderateScale(18),
      height: moderateScale(18),
      borderRadius: 150 / 2,
      borderWidth: 1,
      borderColor: colorGray,
    },
    inputView: {
      flex: 1,
      marginHorizontal: moderateScale(5),
      justifyContent: 'center',
      alignSelf: 'center',
      marginBottom: 5,
    },
    deleteImage: {
      width: moderateScale(20),
      height: moderateScale(20),
    },
    dottedVerticleLine: {
      borderStyle: 'dotted',
      borderColor: colorGray,
      height: moderateScale(30),
      borderLeftWidth: 4,
      marginLeft: moderateScale(17),
      justifyContent: 'center',
      zIndex: 999999,
      position: 'absolute',
      marginTop: moderateVerticalScale(44),
    },
    inputBgColor: {
      backgroundColor: colorF6F6F6,
    },
    buttonView: {
      marginBottom: moderateVerticalScale(16),
      marginHorizontal: moderateScale(33),
      marginTop: moderateScale(31),
    },
    btnStyle: {
      flexDirection: 'row',
      backgroundColor: lightGrayBackground,
    },
    btnTextStyle: {
      fontSize: scale(14),
      fontFamily: latoMedium,
      color: primaryText,
      marginHorizontal: moderateScale(6),
    },
  });
