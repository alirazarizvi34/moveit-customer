import {StyleSheet} from 'react-native';
import {THEME} from '../../shared/theme';
import {moderateScale, scale} from 'react-native-size-matters';

const {color4E008A, colorFFBE50} = THEME.colors;

export default StyleSheet.create({
  container: {
    // padding: moderateScale(5),
    marginHorizontal: moderateScale(10),
  },
  buttonContainer: {
    zIndex: 9999999,
    position: 'absolute',
    right: moderateScale(-5),
  },
  crossButton: {
    width: moderateScale(16),
    height: moderateScale(15),
  },
  playIcon: {
    position: 'absolute',
    //  right:moderateScale(25),
    left: moderateScale(20),
    fontSize: scale(14),
    zIndex: 999,
    top: moderateScale(15),
    color: colorFFBE50,
    //  bottom:25
  },
  LoadingIcon: {
    position: 'absolute',
    //  right:moderateScale(25),
    // left: moderateScale(20),
    // fontSize: scale(14),
    zIndex: 999,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: "rgba(255,255,255,0.5)",
    borderWidth: moderateScale(1.5),
    // top: moderateScale(15),
    color: colorFFBE50,
    width: moderateScale(50),
    borderRadius: moderateScale(8),
    borderColor: color4E008A,
    height: moderateScale(50),
    //  bottom:25
  },
  imageStyles: {
    borderRadius: moderateScale(8),
    width: moderateScale(50),
    height: moderateScale(50),

    borderWidth: moderateScale(1.5),
    borderColor: color4E008A,
  },
});
