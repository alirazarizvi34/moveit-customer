import {Platform, StyleSheet} from 'react-native';
import {moderateScale, moderateVerticalScale, scale} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import {colorTheme} from '../../constants/ColorConstants';

const {latoSemiBold, latoBold,latoHeavy} = THEME.fonts;
const {
  primaryText,
  primaryBackground,
  secondaryText,
  defaultBorder,
  whiteText,
  disableBackground,
  secondaryBackground,
  stepsBackground,
  // defaultText
  defaultText
} = colorTheme;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(18),
    paddingVertical: moderateScale(10),
  },
  topContainer: {
    paddingVertical: moderateScale(20),
    borderBottomWidth: 1,
    borderColor: defaultBorder,
  },
  topBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalText: {
    fontSize: scale(16),
    fontFamily: latoHeavy,
    color: primaryText,
  },
  totalValue: {
    color: primaryText,
    fontFamily: latoHeavy,
    fontSize: scale(16),
  },
  itemListContainer: {
    flex: 1,
  },
  buttonContainer: {
    paddingVertical: moderateScale(20),
  },
  btn: {
    backgroundColor: secondaryBackground,
  },
  btnText: {
    color: primaryText,
    fontSize: scale(20),
    fontFamily: latoSemiBold,
  },
  disabledBtn: {
    backgroundColor: disableBackground,
  },
  disabledBtnText:{
    // color: defaultText,
    fontSize: scale(20),
    fontFamily: latoSemiBold,
  },
  shadowWrapper: {
    overflow: 'hidden',
    paddingBottom: 5,
    borderBottomRightRadius: moderateScale(8),
    borderBottomLeftRadius: moderateScale(8),
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
});

export default styles;
