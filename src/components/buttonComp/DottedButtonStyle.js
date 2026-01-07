import {StyleSheet} from 'react-native';
import {THEME} from '../../shared/theme';

import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

const {color4E008A} = THEME.colors;
const {latoRegular,jameelNooriNastaleeq} = THEME.fonts;
export const getStyles = (language) =>
  StyleSheet.create({
    container: {
      marginHorizontal: moderateScale(56),
      marginTop: moderateVerticalScale(100),
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnView: {
      width: '100%',
      height: moderateScale(140),
      flexDirection: 'row',
      borderStyle: 'dashed',
      borderWidth: 1,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: color4E008A,
    },
    iconText: {
      fontSize: language === 'urdu' ? scale(16) : scale(14),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoRegular,
    },
    btnImage: {
      width: moderateScale(20),
      height: moderateScale(20),
    },
  });
