import {Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import SwitchSelector from 'react-native-switch-selector';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {useTranslation} from 'react-i18next';
import {AppImages} from '../../constants/AppImages';
import {THEME} from '../../shared/theme';
import { AppConstants } from '../../constants/AppConstants';

const {colro5A3278, colorFFBE50, colorGray} = THEME.colors;
const {latoRegular} = THEME.fonts;
export default function ListIconNavigationCard({
  icon,
  label,
  type,
  switchValue,
  onPress,
  setSwitchValue,
}) {
  const {i18n} = useTranslation();
  const styles = getStyles(type, i18n.language);
  return (
    <TouchableOpacity
      disabled={type == 'switch' ? true : false}
      onPress={onPress}
      activeOpacity={AppConstants.buttonActiveOpacity}
      style={styles.settingsListContainer}>
      <Image
        resizeMode="contain"
        source={icon}
        style={styles.settingListImage}
      />
      <Text style={styles.settingListLabel}>{label}</Text>
      {type == 'switch' ? (
        <SwitchSelector
          style={styles.switchStyles}
          initial={switchValue == 'en' ? 0 : 1}
          value={parseInt(switchValue)}
          onPress={setSwitchValue}
          textColor={colro5A3278}
          height={moderateVerticalScale(20)}
          active
          fontSize={scale(8)}
          selectedColor={colorFFBE50}
          textStyle={{fontFamily: latoRegular}}
          borderColor={colorGray}
          hasPadding
          options={[
            {label: 'ENG', value: 'en', activeColor: colro5A3278}, //images.feminino = require('./path_to/assets/img/feminino.png')
            {label: 'اردو', value: 'urdu', activeColor: colro5A3278}, //images.masculino = require('./path_to/assets/img/masculino.png')
          ]}
        />
      ) : (
        <Image
          resizeMode="contain"
          source={
            i18n.language == 'urdu' ? AppImages.LeftIcon : AppImages.RightIcon
          }
          style={styles.settingListIcon}
        />
      )}
    </TouchableOpacity>
  );
}
const getStyles = (type, language) =>
  StyleSheet.create({
    settingsListContainer: {
      flexDirection: language == 'urdu' ? 'row-reverse' : 'row',
      alignItems: 'center',
      marginVertical: moderateVerticalScale(10),
    },
    settingListImage: {
      height: moderateVerticalScale(24),
      width: moderateScale(24),
      // width: "15%"
    },
    settingListLabel: {
      width: type == 'switch' ? '55%' : '70%',
      // backgroundColor: "red",
      marginHorizontal: moderateScale(25),
      textAlign:language=="urdu"?"right":"left"
    },
    settingListIcon: {
      height: moderateVerticalScale(13),
      width: moderateScale(8),
      // width: "15%"
    },
    switchStyles: {
      width: moderateScale(60),
      height: moderateVerticalScale(25),
    },
  });
