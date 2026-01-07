import {Platform, StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../shared/theme';
import {colorTheme} from '../constants/ColorConstants';

const {defaultText, primaryBorder, primaryText, drawerPinkBackground} =
  colorTheme;
const {jameelNooriNastaleeq, latoRegular, latoBold, latoSemiBold} = THEME.fonts;

export const getStyles = ({language}) =>
  StyleSheet.create({
    Topcontainer: {
      flex: 1,
      // marginBottom: Platform.OS === 'ios' ? moderateVerticalScale(10) : undefined,
    },
    mainContainer: {
      flex: 1,
    },
    headerStyles: {
      fontSize: language === 'urdu' ? scale(35) : scale(20),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoSemiBold,
      paddingTop:
        Platform.OS === 'ios'
          ? moderateVerticalScale(5)
          : moderateVerticalScale(0),
    },
    HomeCarouselContainer: {
      alignItems: 'center',
    },
    topBarView: {
      flex: 1,
      marginBottom: moderateVerticalScale(27),
    },
    horizontalCardContainer: {
      flexDirection: 'row',
      flex: 1,
      marginHorizontal: moderateScale(22),
      gap: 14,
      marginBottom: moderateVerticalScale(70),
    },
    modalStyle: {
      borderTopRightRadius: 28,
      borderTopLeftRadius: 28,
      backgroundColor: drawerPinkBackground,
    },
    handleStyle: {
      backgroundColor: '#AF88C7',
      height: 4,
      width: 32,
      marginTop: 25,
    },
    modalHeader: {
      height: moderateScale(100),
      backgroundColor: 'F7EDFF',
      justifyContent: 'center',
      alignItems: 'center',
      borderTopRightRadius: 28,
      borderTopLeftRadius: 28,
    },
    modulizeHeader: {
      lineHeight:
        language === 'urdu'
          ? moderateVerticalScale(30)
          : moderateVerticalScale(20),
      fontSize: language === 'urdu' ? scale(24) : scale(18),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoBold,
      color: primaryText,
      textAlign: 'center',
    },
    ourServicesDividerView: {
      flexDirection: language === 'urdu' ? 'row-reverse' : 'row',
      alignItems: 'center',
      marginHorizontal: moderateScale(25),
      justifyContent: 'center',
    },
    ourServicesDividerText: {
      fontSize: language === 'urdu' ? scale(24) : scale(18),
      textAlign: 'center',
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoBold,
      color: primaryText,
      marginRight: language === 'urdu' ? undefined : moderateScale(10),
      marginLeft: language === 'urdu' ? moderateScale(10) : undefined,
    },
    ourServicesDividerLine: {
      flex: 1,
      height: moderateScale(2),
      backgroundColor: primaryBorder,
      marginTop: moderateVerticalScale(6),
    },
  });
