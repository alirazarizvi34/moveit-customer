import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import IconComponent from '../iconComp';
import {THEME} from '../../shared/theme';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {colorTheme} from '../../constants/ColorConstants';
import {AppConstants} from '../../constants/AppConstants';
const {colorWhite, color4E008A, colorF0F0F0, colorC1C1C1} = THEME.colors;
const {disableBackground, primaryBackground} = colorTheme;
const {jameelNooriNastaleeq, latoBlack} = THEME.fonts;

const ButtonComponent = ({
  text,
  disabled = true,
  icon,
  pressStatus,
  disabledIconColor = colorC1C1C1,
  btnStyle,
  onPressIn,
  onPressOut,
  textStyle,
  iconRight,
  indicatorColor,
  activeOpacity,
  isTouchDisable=false,
  onPress = () => {},
}) => {
  const {t, i18n} = useTranslation();
  return (
    <TouchableOpacity
      disabled={disabled || pressStatus || isTouchDisable}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={{
        ...styles.btnStyle,
        backgroundColor: disabled ? disableBackground : primaryBackground,
        ...btnStyle,
      }}
      activeOpacity={activeOpacity ? activeOpacity : 0.8}>
      {icon && !iconRight && (
        <>
          {pressStatus ? (
            <ActivityIndicator
              size="large"
              color={indicatorColor ?? '#FFF'}
              style={{padding: 3}}
            />
          ) : (
            <IconComponent
              name={icon?.name}
              size={icon?.size}
              color={disabled ? disabledIconColor : icon.color}
            />
          )}
        </>
      )}
      {text && (
        <>
          {pressStatus ? (
            <ActivityIndicator
              size="large"
              color={indicatorColor ?? '#FFF'}
              style={{padding: 3}}
            />
          ) : (
            <Text style={{...styles.textStyle, ...textStyle}}>{text}</Text>
          )}
        </>
      )}

      {iconRight && (
        <>
          {pressStatus ? (
            <ActivityIndicator
              size="large"
              color={indicatorColor ?? '#FFF'}
              style={{padding: 3}}
            />
          ) : (
            <IconComponent
              name={iconRight?.name}
              size={iconRight?.size}
              color={disabled ? disabledIconColor : iconRight.color}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    height: moderateScale(140),
    width: '100%',
    backgroundColor: color4E008A,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: scale(6),
    color: colorWhite,
    fontFamily: latoBlack,
    textAlign: 'center',
  },
  disableBtnStyle: {
    backgroundColor: color4E008A,
    borderRadius: 12,
    alignSelf: 'center',
  },
});

export default ButtonComponent;
