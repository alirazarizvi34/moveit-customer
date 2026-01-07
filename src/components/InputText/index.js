import React, {useState} from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import IconComponent from '../iconComp';
import {THEME} from '../../shared/theme';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

const {colorBlack, colorB0B0C3, color4E008A, colorGray} = THEME.colors;
const {latoRegular} = THEME.fonts;

const InputText = ({
  maxLength = 35,
  numberOfLines,
  placeholder,
  inLineStyle = {},
  width = 100,
  onChangeText = () => {},
  iconLeft,
  iconRight,
  value,
  inputStyle,
  iconStyle,
  error,
  ...props
}) => {
  const [inputFocused, setInputFocused] = useState(false);

  return (
    <>
      <View style={{...styles.mainView, ...inLineStyle}}>
        <TextInput
          onFocus={() => {
            // if (!error) {
            setInputFocused(true);
            // }
          }}

          onEndEditing={() => setInputFocused(false)}
          maxLength={maxLength}
          placeholder={placeholder}
          style={{
            ...styles.inputStyle,
            borderRadius: moderateScale(12),
            borderColor: inputFocused ? color4E008A : colorGray,
            borderWidth: 1,
            ...inputStyle,
          }}
          placeholderTextColor={colorB0B0C3}
          onChangeText={text => {
            onChangeText(text);
          }}
          value={value}
          {...props}
        />

        {iconRight && (
          <View style={{...iconStyle}}>
            <IconComponent
              name={iconRight?.name}
              size={iconRight?.size}
              color={iconRight?.color}
            />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    borderRadius: moderateScale(12),
    // borderColor: colorF0F0F0,
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    // This commit will remove after testing
    // I have add this flex 9-12-22
    flex: 1,
    borderWidth: 0,
    paddingHorizontal: moderateVerticalScale(21),
    paddingVertical: moderateVerticalScale(10),
    fontFamily: latoRegular,
    fontSize: scale(14),
    height: moderateVerticalScale(40),
    color: colorBlack,
    // backgroundColor:"pink"
  },
});

export default InputText;
