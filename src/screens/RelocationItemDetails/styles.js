import {Platform, StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import {colorTheme} from '../../constants/ColorConstants';

const {latoRegular, latoBold, latoSemiBold} = THEME.fonts;

const {
  lightPurpleBackground,
  defaultBackground,
  primaryText,
  darkGrayText,
  defaultBorder,
  drawerPinkBackground,
  stepsBackground,
  darkBlackBorder,
} = colorTheme;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
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
  innerContainer: {
    flex: 1,
    // paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(18),
  },
  topContainer: {
    height: 64,
    backgroundColor: lightPurpleBackground,
    borderRadius: moderateScale(6),
    flexDirection: 'row',
    marginHorizontal: moderateScale(10),
    marginTop: moderateVerticalScale(20),
  },
  iconContainer: {
    backgroundColor: defaultBackground,
    paddingHorizontal: moderateScale(26),
    elevation: 8,
    borderRadius: moderateScale(6),
    shadowColor: 'rgb(78, 0, 138)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    borderTopRightRadius: moderateScale(50),
    borderBottomRightRadius: moderateScale(50),
    justifyContent: 'center',
    alignContent: 'center',
  },
  titleContainer: {
    marginLeft: moderateScale(28),
    justifyContent: 'center',
  },
  title: {
    fontSize: scale(16),
    fontFamily: latoBold,
    color: primaryText,
  },
  selectedItem: {
    color: darkGrayText,
    fontSize: scale(12),
    fontFamily: latoRegular,
  },
  icon: {
    height: moderateScale(42),
    width: moderateScale(42),
  },
  searchContainer: {
    flexDirection: 'row',
    marginTop: moderateScale(20),
    marginBottom: moderateVerticalScale(10),
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: defaultBorder,
    borderRadius: 5,
  },
  searchIcon: {
    height: moderateScale(14),
    width: moderateScale(14),
    tintColor: darkBlackBorder,
  },
  input: {
    marginLeft: moderateScale(12),
    fontSize: scale(12),
    flex: 1,
    fontFamily: latoRegular,
    paddingVertical:
      Platform.OS === 'android' ? moderateScale(6) : moderateScale(10),
  },
  itemListContainer: {
    flex: 1,
  },
  buttonContainer: {
    // marginVertical: moderateScale(10),
    // paddingVertical: moderateScale(5),
    // marginHorizontal: moderateScale(4),
    paddingHorizontal: moderateScale(22),
    paddingVertical: moderateScale(10),
    borderTopRightRadius: moderateScale(8),
    borderTopLeftRadius: moderateScale(8),
    backgroundColor: defaultBackground,
  },
  shadowStyle: {
    width: '100%',
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
  },
  btnText: {
    fontSize: scale(20),
    fontFamily: latoSemiBold,
  },
  noItemsText: {
    fontSize: scale(15),
    textAlign: 'center',
    fontFamily: latoBold,
  },
  shadowWrapper: {
    overflow: 'hidden',
    paddingBottom: 5, // Add padding to show the bottom shadow
    borderBottomRightRadius: moderateScale(8),
    borderBottomLeftRadius: moderateScale(8),
  },
});

export default styles;
