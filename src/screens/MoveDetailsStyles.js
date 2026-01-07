import {StyleSheet} from 'react-native';
import {THEME} from '../shared/theme';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {colorTheme} from '../constants/ColorConstants';

const {
  color4E008A,
  colorFFBE50,
  colorWhite,
  colorBlack,
  colro5A3278,
  priTxtColor,
} = THEME.colors;
const {
  varningBackground,
  darkBlackBorder,
} = colorTheme;
const {latoBold, latoRegular, latoHeavy, jameelNooriNastaleeq, latoSemiBold, latoMedium} =
  THEME.fonts;
export const getStyles = (
  language,
  actinBtnBgColorHandler,
  actinBtnTxtColorHandler,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
      flex:1
    },
    topBar: {
      height: moderateVerticalScale(45),
      backgroundColor: color4E008A,
      borderBottomLeftRadius: moderateScale(20),
      borderBottomRightRadius: moderateScale(20),
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      flexDirection: language == 'urdu' ? 'row-reverse' : 'row',
      paddingHorizontal:moderateScale(26),
    },
    topBarLabel: {
      fontSize: language == 'urdu' ? scale(16) : scale(14),
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoBold,
      lineHeight: language == 'urdu' ? 22 : 15,
      color: colorWhite,
      textAlign:'center',
    },
    topbarValue: {
      fontSize: language == 'urdu' ? scale(16) : scale(14),
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoBold,
      lineHeight: language == 'urdu' ? 22 : 15,
      color: colorFFBE50,
      textAlign:'center',

    },
    detailsContainer: {
      paddingHorizontal: moderateScale(30),
      paddingVertical: moderateVerticalScale(20),
    },
    detailsInnerContainer: {
      flexDirection: language == 'urdu' ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      marginVertical: moderateVerticalScale(10),
    },
    detailsLabel: {
      fontSize: language == 'urdu' ? scale(14) : scale(12),
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoBold,
      color: colorBlack,
      lineHeight: language == 'urdu' ? 22 : 15,
    },
    detailsValue: {
      fontSize: scale(12),
      fontFamily: latoRegular,
      color: colorBlack,
      lineHeight: language == 'urdu' ? 22 : 15,
      textTransform: 'capitalize',
    },
    detailsCapital: {
      textTransform: 'uppercase',
    },
    totalText: {
      fontSize: language == 'urdu' ? scale(16) : scale(14),
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoHeavy,
      color: colorBlack,
      lineHeight: language == 'urdu' ? 25 : 15,
    },
    totalValue: {
      fontSize: scale(14),
      fontFamily: latoHeavy,
      color: colorBlack,
      lineHeight: language == 'urdu' ? 25 : 15,
    },
    lineBreak: {
      height: moderateVerticalScale(2),
      backgroundColor: colorBlack,
      marginHorizontal: moderateScale(40),
    },
    addressContainer: {
      paddingVertical: moderateVerticalScale(30),
      paddingHorizontal: moderateScale(30),
    },
    addressLabelContainer: {
      flexDirection: language == 'urdu' ? 'row-reverse' : 'row',
    },
    icon: {
      height: moderateVerticalScale(16),
      width: moderateScale(16),
    },
    dropIcon: {
      height: moderateVerticalScale(17),
      width: moderateScale(17),
      alignContent: 'center',
      // backgroundColor: "red",
      alignItems: 'center',
    },
    addressLabel: {
      marginLeft: language == 'urdu' ? 0 : moderateScale(7),
      marginRight: language == 'urdu' ? moderateScale(7) : 0,
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoBold,
      fontSize: language == 'urdu' ? scale(16) : scale(12),
      lineHeight: language == 'urdu' ? 21 : 15,
    },
    addressValueContainer: {
      marginVertical: moderateVerticalScale(10),
    },
    addressValue: {
      color: colro5A3278,
      fontSize: scale(12),
      fontFamily: latoRegular,
      textAlign: language == 'urdu' ? 'right' : 'left',
    },
    dropText: {
      fontSize: scale(6),
      zIndex: 99,
      fontFamily: latoBold,
      color: colorFFBE50,
    },
    buttonView: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: moderateVerticalScale(33),
    },
    btnContainer: {
      backgroundColor: actinBtnBgColorHandler(),
      height: 40,
      borderRadius: 20,
      width: 141,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnText: {
      color: actinBtnTxtColorHandler(),
      fontSize: language == 'urdu' ? scale(18) : scale(14),
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoHeavy,
      textAlign: 'center',
    },
    scheduledAlertSliderView: {
      height: moderateScale(43),
      backgroundColor: varningBackground,
      flexDirection: language == 'urdu' ? 'row-reverse' : 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    scheduledAlertSliderImage: {
      height: moderateScale(18),
      width: moderateScale(18),
      tintColor: darkBlackBorder,
    },
    scheduledAlertSliderText: {
      fontSize: language == 'urdu' ? scale(14) : scale(10),
      marginHorizontal: moderateScale(10),
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoSemiBold
    },
  });
