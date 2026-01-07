import {StyleSheet} from 'react-native';
import {THEME} from '../../shared/theme';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

const {jameelNooriNastaleeq, latoRegular, latoSemiBold, latoBold, latoHeavy} = THEME.fonts;
const {colorFFBE50, colorWhite, priTxtColor} = THEME.colors;
 const screen = ['Home',"NonPremiumEstimatedQuote", "RelocationSelectCategory"];
const backgroundColorHandler = (name) => {
const getScreenName = screen.includes(name);
if(getScreenName){
  return colorWhite;
}else{
  return '#F7EDFF'
}
}

export const getStyles = (language,screenName) =>
  StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      paddingHorizontal: moderateScale(12),
      height: moderateScale(78),
      // elevation: 5,
      backgroundColor:backgroundColorHandler(screenName)
    },
    cancelRideComponentText: {
      lineHeight:
        language === 'urdu'
          ? moderateVerticalScale(26)
          : moderateVerticalScale(15),
      fontSize: language === 'urdu' ? scale(14) : scale(12),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoRegular,
    },
    cancelRideComponentBtn: {
      backgroundColor: colorWhite,
      width: scale(62),
      height: scale(24),
    },
    logo: {
      height: moderateScale(24),
      width: moderateScale(104),
    },
    menuIcon: {
      height: moderateScale(22),
      width: moderateScale(22),
    },
    rightIcon:{
      height: moderateScale(20),
      width: moderateScale(20),
    },
    menuIconView: {
      justifyContent: 'center',
      height: moderateScale(35),
      width: moderateScale(35),
      alignItems:'center'
    },
    notificationIcon: {
      height: moderateScale(30),
      width: moderateScale(30),
    },
    iconContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconView: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colorFFBE50,
    },
    skipStyle: {
      color: colorWhite,
      textDecorationLine: 'underline',
    },
    titleContainer: {
      flex: 3,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleStyle: {
      color: priTxtColor,
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoHeavy,
      fontSize: language === 'urdu' ? scale(24) : scale(18),
      lineHeight:
        language === 'urdu'
          ? moderateVerticalScale(35)
          : moderateVerticalScale(20),
    },
    navigationView: {
      justifyContent: 'center',
      alignItems: 'center',
      width: moderateScale(42),
      height: moderateScale(42),
    },
  });
