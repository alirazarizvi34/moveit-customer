import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';

import IconComponent from '../iconComp';

import {THEME} from '../../shared/theme';
import {moderateScale} from 'react-native-size-matters';
import {getStyles} from './InputStyle';
import { colorTheme } from '../../constants/ColorConstants';
const {colorB0B0C3} = THEME.colors;
const {lightGrayBackground,primaryBackground ,darkGrayBackgrounud,infoText} = colorTheme;
const InputTextComponent = ({
  numberOfLines,
  placeholder,
  keyboardType,
  onChangeText,
  iconLeft,
  imageLeft,
  imageRight,
  iconRight,
  editable,
  bgColor,
  width,
  defaultValue,
  height,
  hasBorder,
  borderRadius,
  value,
  borderShadow,
  onPressIcon,
  borderColor,
  textInputStyle,
  isTouchDisable=false,
  textRight,
  onPressText,
  pressStatus,
  ...props
}) => {
  const styles = getStyles(bgColor, hasBorder, borderRadius, borderShadow, borderColor);
  return (
    <View style={{...styles.mainInputStyle, width: width, height: height}}>
      {/* For Image */}
      {imageLeft?.show && (
        <Image source={imageLeft.url} style={styles.imageIcon} />
      )}

      {/* For Icon */}
      {iconLeft && (
        <IconComponent
          name={iconLeft.name}
          size={iconLeft.size}
          color={iconLeft.color}
        />
      )}

      {/* For Input */}
      <TextInput
        defaultValue={defaultValue}
        editable={editable}
        style={{...styles.textInputStyle, ...textInputStyle}}
        numberOfLines={numberOfLines}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor={colorB0B0C3}
        {...props}
      />

      {/* For Icon */}
      {iconRight && (
        <IconComponent
          name={iconRight.name}
          size={iconRight.size}
          color={iconRight.color}
        />
      )}
      {/* For Text */}
       {textRight?.show && (
        <>
        {pressStatus ? (
          <ActivityIndicator
          size="small"
          color={primaryBackground}
          style={{padding: 3}}
        />
        ) : (
          <TouchableOpacity
          disabled={isTouchDisable}
            style={styles.textRightView}
            onPress={onPressText}>
              <Text style={[styles.textRight, {color: textRight?.color ? textRight?.color : infoText}]}>{textRight?.text}</Text>
          </TouchableOpacity>
        )}
        </>
      )}
      {/* For Image */}
      {imageRight?.show && (
        <TouchableOpacity
        disabled={isTouchDisable}
          style={styles.imageIconView}
          onPress={onPressIcon}>
          <Image source={imageRight.url} style={{...styles.imageIcon, tintColor:darkGrayBackgrounud}}/>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputTextComponent;
