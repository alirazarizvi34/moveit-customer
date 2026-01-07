import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';

import {colorTheme} from '../../constants/ColorConstants'
const {colorCCC} = THEME.colors;
const {defaultBackground} = colorTheme;
export const getStyles = (language,hasBorder, bgColor) =>
  StyleSheet.create({
    inputContainer: {},
    inputElement: {
      backgroundColor:bgColor ? bgColor : defaultBackground,
      borderWidth: hasBorder ? 1 : 0,
      height: moderateScale(103),
      borderRadius: moderateScale(10),
      borderColor: colorCCC,
      textAlignVertical: 'top',
      fontSize: moderateScale(12),
      paddingHorizontal: moderateScale(10),
      textAlign: language=="urdu"?'right':"left",
    },
  });
