import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';

const {colro5A3278, colorWhite, colorBlack, color4E008A} = THEME.colors;
const {latoBold, latoSemiBold, latoRegular, jameelNooriNastaleeq} = THEME.fonts;

export const getStyles = language =>
  StyleSheet.create({
    container: {
      height:
        language == 'urdu'
          ? moderateVerticalScale(151)
          : moderateVerticalScale(140),
      elevation: 3,
      borderRadius: moderateScale(8),
      marginTop: moderateVerticalScale(10),
      shadowColor: '#000',

      shadowOffset: {
        width: 1,
        height: 2,
      },
      shadowOpacity: 0.3,
      marginHorizontal: 2,
      shadowRadius: 4,
      backgroundColor: colorWhite,
      // flex: 1
    },
    textContainer: {
      paddingVertical: moderateVerticalScale(10),
      marginHorizontal: moderateScale(23),
      borderBottomWidth: 2,
      flexDirection: language == 'urdu' ? 'row-reverse' : 'row',
    },
    textSubContainer: {
      paddingTop: moderateVerticalScale(10),
    },
    textInnerContainer: {
      flexDirection: language == 'urdu' ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    label: {
      fontSize: language == 'urdu' ? scale(14) : scale(10),
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoSemiBold,
      color: colorBlack,

      lineHeight: language == 'urdu' ? 22 : 15,
    },
    textOuterContainer: {
      flex: 1,
      justifyContent: 'space-between',
      gap: 2,
    },
    value: {
      fontSize: scale(10),
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoRegular,
      color: colorBlack,
      lineHeight: language == 'urdu' ? 22 : 15,
      textTransform: 'capitalize',
    },
    addressContainer: {
      flexDirection: language == 'urdu' ? 'row-reverse' : 'row',
      marginHorizontal: moderateScale(32),
      justifyContent: 'space-between',
      marginTop: moderateVerticalScale(11),
    },
    pickupContainer: {},
    dropOffContainer: {},
    addressHeading: {
      fontSize: language == 'urdu' ? scale(14) : scale(10),
      color: colorBlack,
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoBold,
      lineHeight: language == 'urdu' ? 22 : 15,
    },
    addressValue: {
      fontSize: scale(6),
      width: moderateScale(116),
    },
    dateContainer: {
      height: moderateVerticalScale(17),
      backgroundColor: colro5A3278,
      position: 'absolute',
      bottom: 0,
      zIndex: 999,
      right: 0,
      left: 0,
      borderBottomLeftRadius: moderateScale(8),
      borderBottomRightRadius: moderateScale(8),
      justifyContent: 'center',
      flexDirection: language === 'urdu' ? 'row-reverse' :'row',
      gap:3
    },
    rideDateText: {
      color: colorWhite,
      textAlign: 'center',
      fontSize: scale(10),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq :  latoSemiBold,
      lineHeight: language == 'urdu' ?  moderateScale(10 * 1.35) : moderateScale(18),
      paddingTop: language == 'urdu' ?  moderateScale(10 - (10 * 0.75)) : 0,
    },
    sideContainerMargin: {
      marginLeft: language == 'urdu' ? 0 : 10,
      marginRight: language == 'urdu' ? 10 : 0,
    },
    multipleLabel: {
      color: color4E008A,
      fontFamily: latoBold,
      lineHeight: language == 'urdu' ? 22 : 15,
    },
  });
