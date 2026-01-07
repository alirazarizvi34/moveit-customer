import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {getStyles} from './styles';
import {THEME} from '../../shared/theme';
import {useTranslation} from 'react-i18next';

const {colorAAAAAA} = THEME.colors;
const MultiLineInput = ({
  placeholder,
  onChangeText,
  value,
  disabled,
  hasBorder = true,
  bgColor,
  ...props
}) => {
  const {i18n} = useTranslation();

  const styles = getStyles(i18n.language, hasBorder, bgColor);
  return (
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={disabled}
        scrollEnabled={false} 
        value={value}
        {...props}
        numberOfLines={10}
        placeholderTextColor={colorAAAAAA}
        multiline
        style={styles.inputElement}
      />
    </View>
  );
};

export default MultiLineInput;
