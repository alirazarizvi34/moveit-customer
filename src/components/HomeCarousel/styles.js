import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import { colorTheme } from '../../constants/ColorConstants';

const {primaryBackground ,disableBackground, whiteText, lightGrayBackground} = colorTheme;
const {jameelNooriNastaleeq, latoRegular, latoBold, latoMedium} = THEME.fonts;

export const getStyles = ({language}) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      marginTop:moderateVerticalScale(5),
      marginBottom: moderateVerticalScale(10),
      // backgroundColor:'red'
    },
    carouselView: {
      flex: 1,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent:'center',
      marginHorizontal: moderateScale(10),
    },
    carouselImage: {
      width:'100%',
      height:'100%',
      borderRadius: 15,
    },
    carouseltext1: {
      fontSize: scale(12),
      fontFamily: latoBold,
      textAlign: 'center',
      color: whiteText,
    },
    carouseltext2: {
      fontSize: scale(8),
      fontFamily: latoMedium,
      textAlign: 'center',
      color: whiteText,
    },
    carouselPaginationMainContainer: {
      marginTop: moderateVerticalScale(18),
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      // marginTop: moderateVerticalScale(10),
    },
    paginationDot: {
      width: moderateScale(16),
      height: moderateScale(6),
      borderRadius: 5,
      backgroundColor: lightGrayBackground, // Inactive dot color
      marginHorizontal: moderateScale(5),
    },
    activeDot: {
      backgroundColor: primaryBackground, // Active dot color
    },
  });
