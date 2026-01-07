import {StyleSheet} from 'react-native';
import {THEME} from '../../shared/theme';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

const {jameelNooriNastaleeq, latoRegular, latoSemiBold, latoBold, latoMedium, colorBlack} = THEME.fonts;
const {
  colorFFBE50,
  colorWhite,
  priTxtColor,
  colorFDF3ED,
  colorF8F8F8,
  colorE5E5E5,
  color0F0F0F,
  color666666,
} = THEME.colors;

export const getStyles = language =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    mainContainer: {
      flex: 1,
      flexDirection: 'column',
    },
    locationContainer: {
      height: moderateScale(147),
      borderRadius: moderateScale(10),
      backgroundColor: colorFDF3ED,
      marginHorizontal: moderateScale(10),
    },
    locationView: {
      flexDirection: 'row',
      paddingHorizontal: moderateScale(18),
      paddingTop: moderateVerticalScale(5),
      marginBottom: moderateVerticalScale(20),
    },
    locationLabelView: {
      flex: 1.5,
    },
    locationTitleView: {
      flex: 4.5,
      marginLeft: moderateScale(5),
    },
    text: {
      fontSize: scale(14),
      fontFamily: latoRegular,
    },
    dropDownHeader: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      marginVertical: moderateVerticalScale(15),
      backgroundColor: colorF8F8F8,
      borderColor: colorE5E5E5,
    },
    dropDownHeaderView: {
      flexDirection: language === 'urdu' ? 'row-reverse' : 'row',
      marginHorizontal: moderateScale(12),
      padding: language === 'urdu' ? moderateScale(7) : moderateScale(13),
      justifyContent: 'space-between',
    },
    dropDownHeaderTitle: {
      paddingTop: language === 'urdu' ? 34 - 34 * 0.75 : 0,
      lineHeight:
        language === 'urdu'
          ? moderateVerticalScale(34)
          : moderateVerticalScale(20),
      fontSize: language === 'urdu' ? scale(24) : scale(16),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoRegular,
      color: color0F0F0F,
    },
    labourAmountView: {
      flexDirection: language === 'urdu' ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    labourAmount: {
      paddingTop: 18 - 18 * 0.75,
      lineHeight:
        language === 'urdu'
          ? moderateVerticalScale(25)
          : moderateVerticalScale(18),
      fontSize: language === 'urdu' ? scale(18) : scale(14),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoRegular,
      color: color666666,
    },
    subTotalView: {
      flexDirection: language === 'urdu' ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: moderateScale(10),
    },
    subTotal: {
      paddingTop: language === 'urdu' ? 18 - 18 * 0.75 : 0,
      lineHeight:
        language === 'urdu'
          ? moderateVerticalScale(25)
          : moderateVerticalScale(18),
      fontSize: language === 'urdu' ? scale(18) : scale(14),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoRegular,
      color: color666666,
    },
    taxView: {
      flexDirection: language === 'urdu' ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: moderateScale(10),
    },
    tax: {
      paddingTop: language === 'urdu' ? 18 - 18 * 0.75 : 0,
      lineHeight:
        language === 'urdu'
          ? moderateVerticalScale(25)
          : moderateVerticalScale(18),
      fontSize: language === 'urdu' ? scale(18) : scale(14),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoRegular,
      color: color666666,
    },
    totalAmountView: {
      flexDirection: language === 'urdu' ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: moderateScale(20),
    },
    totalAmountTitle: {
        paddingTop: language === 'urdu' ? 26 - 26 * 0.75 : 0,
        lineHeight:
          language === 'urdu'
            ? moderateVerticalScale(37)
            : moderateVerticalScale(23),
        fontSize:
          language === 'urdu' ? scale(26) : scale(18),
        fontFamily:
          language === 'urdu'
            ? jameelNooriNastaleeq
            : latoMedium,
        color: color666666,
    },
    totalKmView: {
      flexDirection: language === 'urdu' ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    totalKm: {
      lineHeight:
        language === 'urdu'
          ? moderateVerticalScale(25)
          : moderateVerticalScale(18),
      fontSize: language === 'urdu' ? scale(18) : scale(14),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoRegular,
      color: color666666,
    },
    totalAmount: {
        fontSize: scale(18),
        fontFamily: latoSemiBold,
        color: colorBlack,
    },
    rideDurationView: {
      flexDirection: language === 'urdu' ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: moderateScale(10),
    },
    rideDuration: {
      lineHeight:
        language === 'urdu'
          ? moderateVerticalScale(25)
          : moderateVerticalScale(18),
      fontSize: language === 'urdu' ? scale(18) : scale(14),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoRegular,
      color: color666666,
    },
    distanceInfoContainer: {
      marginHorizontal: moderateScale(40),
    },
    pricesContainer: {
      marginHorizontal: moderateScale(40),
    },
    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginTop: moderateVerticalScale(15),
      marginBottom: moderateVerticalScale(30),
      marginHorizontal: moderateScale(16),
    },
  });
