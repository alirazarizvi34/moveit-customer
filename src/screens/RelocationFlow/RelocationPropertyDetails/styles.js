import {Platform, StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../../../shared/theme';
import {colorTheme} from '../../../constants/ColorConstants';

const {
  defaltBorderColor,
} = THEME.colors;
const {latoSemiBold, jameelNooriNastaleeq, latoMedium} = THEME.fonts;
const {stepsBackground,primaryText} = colorTheme;
export const getStyles = ({language}) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    containerView: {
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
    
    titleView: {
      marginHorizontal: moderateScale(22),
      marginTop: moderateVerticalScale(25),
      marginBottom: moderateVerticalScale(7),
      // marginHorizontal: moderateScale(30),
      // marginTop: moderateVerticalScale(25),
      // marginBottom: moderateVerticalScale(22),
    },
    titleText: {
      fontSize: scale(13),
      fontFamily: latoMedium,
      color: primaryText,
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
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 12,
        shadowColor: '#000000',
      },
    }),
    },
    shadowWrapper: {
      overflow: 'hidden',
      paddingBottom: 5, // Add padding to show the bottom shadow
      borderBottomRightRadius: moderateScale(8),
      borderBottomLeftRadius: moderateScale(8),
    },
  });
