import React, {useState} from 'react';
import {StyleSheet, Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import {AppImages} from '../../constants/AppImages';
import {THEME} from '../../shared/theme';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { colorTheme } from '../../constants/ColorConstants';

const {defaultText,placeholderText,primaryText,darkGrayText,defaultBorder,defaultBackground,lightGrayBackground,lightGrayBorder} = colorTheme;
const {
  latoSemiBold,
} = THEME.fonts;

export default DropDownPickerComponent = ({
  value,
  setValue,
  setOpen,
  setItems,
  items,
  open,
  placeholder,
  onChangeValue,
  isTouchDisable=false,
}) => {
  const {t, i18n} = useTranslation();
  const styles = getStyles(i18n.language);
 
  return (
    <DropDownPicker
      disabled={isTouchDisable}
      open={open}
      value={value}
      listMode="SCROLLVIEW"
      dropDownDirection='BOTTOM'
      scrollViewProps={{
        nestedScrollEnabled: true,
      }}
      listItemContainerStyle={styles.listItemContainerStyle}
      dropDownContainerStyle={styles.dropDownContainerStyle}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder={placeholder}
      labelStyle= {{
        color: defaultText,
        fontSize: scale(12),
      }}
      onChangeValue={(value) => {
        onChangeValue(value)
      }}
      textStyle={styles.textStyle}
      style={styles.style}
      placeholderStyle={styles.placeholderStyle}
    />
  );
};

const getStyles = language =>
  StyleSheet.create({
    listItemContainerStyle: {
      borderBottomWidth: 1,
      borderBottomColor: defaultBorder,
    },
    dropDownContainerStyle: {
      position: 'relative',
      top: 0,
      borderColor: lightGrayBorder,
      borderRadius: 8,
      backgroundColor: lightGrayBackground,
    },
    textStyle: {
      fontSize: scale(11),
      color: defaultText,
      fontFamily: latoSemiBold,
      paddingHorizontal: moderateScale(14),
    },
    style: {
      backgroundColor: lightGrayBackground,
      borderWidth: 0,
      paddingVertical:
        Platform.OS === 'ios'
          ? moderateVerticalScale(12)
          : moderateVerticalScale(6),
      borderRadius: 8,
      marginBottom: moderateVerticalScale(5),
    },
    placeholderStyle: {
      color: placeholderText,
      fontSize: scale(12),
      fontFamily: latoSemiBold,
    },
  });
