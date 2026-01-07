import {StyleSheet} from 'react-native';
import {THEME} from '../../shared/theme';
import {moderateScale} from 'react-native-size-matters';

const {colorCACACA} = THEME.colors;

export const getStyles = () =>
  StyleSheet.create({
    container: {
        width: 1,
            height: '100%',
            alignItems: 'center',  
            zIndex: 999999,
            position: 'absolute',
            marginLeft: moderateScale(30),
            marginTop: moderateScale(31),
      },
      dotsContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
      },
      dot: {
        width: 5,
        height: 5,
        borderRadius: 50,
        backgroundColor: colorCACACA,
      },
  });
