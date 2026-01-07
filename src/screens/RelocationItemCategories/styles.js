import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import {Platform, StyleSheet} from 'react-native';
import {colorTheme} from '../../constants/ColorConstants';

const {
  defaultBorder,
  primaryText,
  drawerPinkBackground,
  lightPurpleBackground,
  primaryBorder,
  defaultBackground,
  defaultText,
  secondaryBorder,
  stepsBackground,
  secondaryBackground,
} = colorTheme;

const {latoRegular, latoSemiBold, latoMedium, latoBold} = THEME.fonts;

const getStyles = language =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
      flex: 1,
    },
    titleView: {
      marginHorizontal: moderateScale(17),
      paddingTop: moderateScale(25),
      paddingBottom: moderateScale(14),
    },
    titleText: {
      fontSize: scale(13),
      fontFamily: latoMedium,
      color: primaryText,
    },
    categoriesContainer: {
      flex: 1,
      marginVertical: moderateScale(13),
      marginHorizontal: moderateScale(12),
    },
    listColumns: {
      justifyContent: 'space-between',
      // gap:12,
      marginHorizontal: moderateScale(6),
      // marginVertical:0
    },
    buttonContainer: {
      paddingHorizontal: moderateScale(22),
      paddingVertical: moderateScale(10),
      borderTopRightRadius: moderateScale(8),
      borderTopLeftRadius: moderateScale(8),
      backgroundColor: defaultBackground,
    },
    btnText: {
      fontSize: scale(20),
      fontFamily: latoSemiBold,
    },
    spaceBtnText: {
      fontSize: scale(20),
      fontFamily: latoSemiBold,
      color: primaryText
    },
    btnStyle: {
      backgroundColor: defaultBackground,
      borderColor: primaryBorder,
      borderWidth: 1.5,
    },
    shadowStyle: {
      width: '100%',
      borderTopLeftRadius: moderateScale(8),
      borderTopRightRadius: moderateScale(8),
    },
    progressBarContainer: {
      paddingVertical: moderateVerticalScale(15),
      backgroundColor: stepsBackground,
      borderBottomRightRadius: moderateScale(8),
      borderBottomLeftRadius: moderateScale(8),
      // iOS shadow properties
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 5},
          shadowOpacity: 0.15,
          shadowRadius: 4,
        },
        android: {
          elevation: 12,
          shadowColor: '#000000',
        },
      }),
    },
    searchBarContainer: {
      marginHorizontal: moderateScale(6),
      borderWidth: 1,
      borderColor: defaultBorder,
      borderRadius: 5,
    },
    searchBar: {
      flexDirection: 'row',
      paddingHorizontal: moderateScale(12),
      paddingVertical: moderateVerticalScale(10),
      alignItems: 'center',
    },
    searchIcon: {
      height: moderateScale(14),
      width: moderateScale(14),
    },
    shoppingCardView: {
      paddingTop:5,
      position: 'absolute',
      bottom: 20,
      zIndex: 9999,
      right: 12,
      width: moderateScale(52),
      height: moderateScale(52),
      backgroundColor: secondaryBackground,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    totalItem: {
      position: 'absolute',
      top: moderateVerticalScale(4),
      left: moderateScale(26),
      fontSize: scale(12),
      fontFamily: latoBold,
      color: primaryText
    },
    shoppingCardIcon: {
      height: moderateScale(28),
      width: moderateScale(28),
    },
    searchText: {
      fontSize: scale(12),
      marginLeft: moderateScale(15),
      color: defaultText,
      fontFamily: latoRegular,
    },
    searchBarMainContainer: {
      paddingTop: moderateVerticalScale(6),
      paddingBottom:moderateVerticalScale(12),
    },
    toolTipView: {
      width: '100%',
      backgroundColor: defaultBackground,
      paddingVertical: moderateVerticalScale(6),
      borderWidth: 2,
      borderRadius: 8,
      borderColor: secondaryBorder,
    },
    categoryToolTipView: {
      width: '100%',
      backgroundColor: defaultBackground,
      paddingBottom: moderateVerticalScale(8),
      marginTop: moderateVerticalScale(12),
      borderWidth: 2,
      borderRadius: 8,
      borderColor: secondaryBorder,
    },
    shadowWrapper: {
      overflow: 'hidden',
      paddingBottom: 5, // Add padding to show the bottom shadow
      borderBottomRightRadius: moderateScale(8),
      borderBottomLeftRadius: moderateScale(8),
    },
  });

export default getStyles;
