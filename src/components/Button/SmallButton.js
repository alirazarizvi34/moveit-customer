import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import {useTranslation} from 'react-i18next';
import {AppConstants} from '../../constants/AppConstants';

const {
  color4E008A,
  colorWhite,
  colorBlack,
  color737373,
  colorD9D9D9,
  colorGray,
} = THEME.colors;
const {jameelNooriNastaleeq, latoMedium, latoBold} = THEME.fonts;

const SmallButton = ({title, onPress, disabled, outline, grey}) => {
  const {i18n} = useTranslation();
  const styles = getStyles(i18n.language);
  return (
    <TouchableOpacity
      activeOpacity={AppConstants.buttonActiveOpacity}
      disabled={disabled}
      onPress={onPress}
      style={
        outline
          ? styles.outlineContainer
          : grey
          ? styles.greyContainer
          : styles.container
      }>
      <Text
        style={
          outline ? styles.titleOutline : grey ? styles.greyTitle : styles.title
        }>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SmallButton;

const getStyles = language =>
  StyleSheet.create({
    outlineContainer: {
      width: moderateScale(14),
      backgroundColor: colorWhite,
      borderColor: colorBlack,
      borderWidth: 1,
      borderRadius: moderateScale(100),
    },
    container: {
      height: moderateVerticalScale(50),
    },
    greyContainer: {
      height: moderateVerticalScale(27),
      width: moderateScale(106),
    },
    title: {
      color: colorWhite,
      fontSize: scale(16),
      textAlign: 'center',
    },
    titleOutline: {
      color: color737373,
      fontSize: scale(16),
      textAlign: 'center',
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoMedium,
    },
    greyTitle: {
      color: colorWhite,

      fontSize: language == 'urdu' ? scale(10) : scale(9),
      textAlign: 'center',
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoBold,
    },
  });
