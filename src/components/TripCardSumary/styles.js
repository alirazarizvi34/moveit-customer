import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import { colorTheme } from '../../constants/ColorConstants';

const {
  colorWhite,
  color000,
  colorBlack,
  color0359FF,
} = THEME.colors;
const {jameelNooriNastaleeq, latoRegular, latoBold, latoSemiBold, latoMedium} =
  THEME.fonts;
  const {secondaryBackground} = colorTheme;
export const getStyles = (language,footerBgColorHandler) =>
  StyleSheet.create({
    container: {
      height: scale(92),
      marginHorizontal: moderateScale(15),
      marginBottom: moderateVerticalScale(13),
      borderRadius: 8,
      backgroundColor: colorWhite,
      shadowColor: color000,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 2,
    },
    mainView: {
      flexDirection: 'row',
      paddingHorizontal: moderateScale(21),
      paddingTop: moderateVerticalScale(13),
    },
    ColumnView: {
      flex: 1,
      justifyContent: 'space-between',
    },
    vehicleTypeView: {
      flexDirection: language == 'urdu' ? 'row-reverse' : 'row',
      alignItems: 'flex-start',
    },
    vehicleTypeText: {
      fontSize: language == 'urdu' ? scale(14) : scale(10),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoBold,
      color: colorBlack,
      lineHeight: language == 'urdu' ?  moderateScale(14 * 1.25) : moderateScale(13),
      paddingTop: language == 'urdu' ?  moderateScale(14 - (14 * 0.75)) : 0,
      textAlign:'center',
    },
    vehicleTypeValue: {
      fontSize: scale(10),
      fontFamily: latoRegular,
      color: colorBlack,
      lineHeight: language === 'urdu' ? moderateScale(22) : moderateScale(14),
      textTransform: 'capitalize',
      marginHorizontal: moderateScale(11),
    },
    vehicleStatusView: {
      flexDirection: language == 'urdu' ? 'row-reverse' : 'row',
      alignItems: 'flex-end',
      marginTop: moderateVerticalScale(13),
    },
    vehicleStatusText: {
      fontSize: language == 'urdu' ? scale(14) : scale(10),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoBold,
      color: colorBlack,
      lineHeight: language == 'urdu' ? moderateScale(18) : moderateScale(15),
    },
    vehicleStatusValue: {
      fontSize: language == 'urdu' ? scale(14) : scale(10),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoBold,
      color: colorBlack,
      lineHeight: language == 'urdu' ?  moderateScale(14 * 1.25) : moderateScale(12),
      paddingTop: language == 'urdu' ?  moderateScale(14 - (14 * 0.8)) : 0,
      textTransform: 'capitalize',
      marginHorizontal: moderateScale(11),
      textAlign:'center',
    },
    vehicleDistanceView: {
      flexDirection: language == 'urdu' ? 'row-reverse' : 'row',
      // alignItems: 'flex-end',
      alignItems: 'center',
      justifyContent: language == 'urdu' ?  'flex-start' : 'flex-end',
    },
    vehicleDistanceText: {
      fontSize: language == 'urdu' ? scale(14) : scale(10),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoBold,
      color: colorBlack,
      marginLeft:language=="urdu"?moderateScale(11):undefined,
      marginRight:language=="urdu"?undefined:moderateScale(11),
      lineHeight: language == 'urdu' ?  moderateScale(14 * 1.25) : moderateScale(12),
      paddingTop: language == 'urdu' ?  moderateScale(14 - (14 * 0.75)) : 0,
    },
    vehicleDistanceValue: {
      fontSize: scale(10),
      fontFamily: latoRegular,
      color: colorBlack,
      lineHeight: language == 'urdu' ? moderateScale(12)  : moderateScale(14),
      textTransform: 'capitalize',
      textAlign:'center',
      textAlignVertical:'center',
    },
    trackMoveView: {
      alignSelf: 'flex-end',
      marginTop: moderateVerticalScale(13),
    },
    trackMove: {
      fontSize: language == 'urdu' ? scale(14) : scale(10),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq :  latoSemiBold,
      color: color0359FF,
      lineHeight: language == 'urdu' ? moderateScale(26) :  moderateScale(22),
      textDecorationLine: 'underline',
    },
    footerView: {
      height: moderateScale(17),
      backgroundColor: footerBgColorHandler(),
      position: 'absolute',
      bottom: 0,
      zIndex: 999,
      right: 0,
      left: 0,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      justifyContent: 'center',
      alignItems:'center',
      flexDirection:language == 'urdu' ? 'row-reverse' : 'row',
      gap:3
    },
    footerText: {
      color: colorWhite,
      textAlign: 'center',
      fontSize: scale(10),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq :  latoSemiBold,
      lineHeight: language == 'urdu' ?  moderateScale(10 * 1.35) : moderateScale(18),
      paddingTop: language == 'urdu' ?  moderateScale(10 - (10 * 0.75)) : 0,
    },
  });
