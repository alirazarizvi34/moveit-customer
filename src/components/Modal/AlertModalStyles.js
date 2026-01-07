import {StyleSheet, Dimensions} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import {colorTheme} from '../../constants/ColorConstants';

const deviceHeight = Dimensions.get('window').height;

const {latoSemiBold, jameelNooriNastaleeq, latoBold} = THEME.fonts;
const {colorBlack} = THEME.colors;
const {
  defaultText,
  defaultBackground,
  lightGrayBorder,

  placeholderText,
  lightPurpleBackground,
  drawerPinkBackground,
  darkGrayBorder,
  defaultBorder
} = colorTheme;
export const getStyles = (language, titleColor) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: moderateScale(31),
      justifyContent: 'center',
      paddingVertical: moderateVerticalScale(10),
      alignItems: 'center',
      // backgroundColor: drawerPinkBackground,
      flex: 1,
    },
    alertIcon: {
      height: moderateVerticalScale(30),
      width: moderateScale(30),
    },
    buttonContainer: {
      width: '100%',
      justifyContent: 'center',
      gap: moderateScale(18),
      alignItems: 'center',
      alignContent: 'space-between',
      flexDirection: 'row',
      marginTop: moderateVerticalScale(30),
    },
    title: {
      color: titleColor ? titleColor : defaultText,
      fontSize: language == 'urdu' ? scale(24) : scale(18),
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoBold,
      textAlign:'center'
    },
    subTitle: {
      fontSize: language == 'urdu' ? scale(16) : scale(12),
      textAlign: 'center',
    },
    titleContainer: {
      marginTop: moderateVerticalScale(20),
    },
    subTitleContainer: {
      marginTop: moderateVerticalScale(5),
    },
    acceptBtn: {
      width: moderateScale(140),
      borderRadius: moderateScale(100),
      // backgroundColor:lightPurpleBackground
    },
    rejectBtn: {
      width: moderateScale(140),
      borderRadius: moderateScale(100),
      backgroundColor: drawerPinkBackground,
      borderWidth: 1,
      borderColor: defaultBorder,
    },
    rejectText: {
      color: placeholderText,
      fontSize: scale(14),
    },
    acceptText: {
      fontSize: scale(14),
    },
  });
