import {StyleSheet} from 'react-native';
import {colorTheme} from '../../constants/ColorConstants';
import {THEME} from '../../shared/theme';
import {scale, moderateScale, moderateVerticalScale} from 'react-native-size-matters';

const {defaultBorder} = colorTheme;
const {latoBold, latoRegular,latoSemiBold} = THEME.fonts;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(12),
    paddingVertical:moderateVerticalScale(5)
  },
  searchContainer: {
    flexDirection: 'row',
    marginVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    borderBottomWidth: 1,
    borderBottomColor: defaultBorder,
    alignItems: 'center',
  },
  searchIcon: {
    height: moderateScale(14),
    width: moderateScale(14),
  },
  input: {
    marginLeft: moderateScale(12),
    fontSize: scale(16),
    flex:1,
    fontFamily: latoRegular,
    paddingVertical: moderateScale(15),
  },
  itemListContainer: {
    flex: 1,
  },
  noItemText: {fontSize: scale(15), textAlign: 'center', fontFamily: latoBold},
  btnText: {
    fontSize: scale(20),
    fontFamily: latoSemiBold,
  },
  buttonContainer:{
    // paddingHorizontal:moderateScale(z),
    paddingVertical:moderateVerticalScale(26)
  }
});

export default styles;
