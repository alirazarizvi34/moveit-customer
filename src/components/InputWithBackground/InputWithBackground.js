import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {THEME} from '../../shared/theme';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

const {colorF8EEFF, colorCCADE3, colorB0B0C3} = THEME.colors;
const InputWithBackground = ({placeholder, disabled, value, setValue}) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={setValue}
      editable={disabled ? false : true}
      placeholder={placeholder}
      placeholderTextColor={colorB0B0C3}
    />
  );
};

export default InputWithBackground;

const styles = StyleSheet.create({
  input: {
    height: moderateVerticalScale(60),
    backgroundColor: colorF8EEFF,
    width: '100%',
    borderWidth: 1,
    borderColor: colorCCADE3,
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(20),
  },
});
