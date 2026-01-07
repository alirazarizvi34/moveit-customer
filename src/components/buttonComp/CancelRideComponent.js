import React, {useContext, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import IconComponent from '../iconComp';
import {THEME} from '../../shared/theme';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {baseURL} from '../../config/config';
import {GlobalContext} from '../../../context/GlobalState';
import axios from 'axios';
import toastService from '../../services/toast-service';
import analytics from '@react-native-firebase/analytics';
import AlertModal from '../Modal/AlertModal';
import {AppImages} from '../../constants/AppImages';
import { useNavigation } from '@react-navigation/native';

const {colorWhite, color4E008A, colorF0F0F0, colorC1C1C1, colorCancel} =
  THEME.colors;
const {jameelNooriNastaleeq, latoBlack, latoRegular} = THEME.fonts;

const CancelRideComponent = ({
  text,
  btnStyle = {},
  textStyle = {},
  disabled = true,
  image,
  icon,
  pressStatus,
  loader,
  customNavigator,
  disabledIconColor = colorC1C1C1,
  // onPress = () => { },
}) => {
  return (
    <>
      <TouchableOpacity
        disabled={disabled || pressStatus}
        onPress={() => {customNavigator()}}
        style={styles.btnStyle}
        activeOpacity={0.5}>
        {icon && (

              <IconComponent
                name={icon.name}
                size={icon.size}
                color={disabled ? disabledIconColor : icon.color}
              />
 
        )}
        {text && (
          <>
            {pressStatus ? (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                style={{padding: 3}}
              />
            ) : (
              <Text style={{...styles.textStyle, ...textStyle}}>{text}</Text>
            )}
          </>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    // height:moderateVerticalScale(25),
    // width:moderateScale(25)
    // height: moderateScale(31),
    // width: moderateScale(82),
    // borderRadius: moderateScale(8),
    // borderWidth: moderateScale(1),
    // borderColor: colorCancel,
    // backgroundColor:'red',
    // justifyContent: 'center',
  },
  icon: {
    height: moderateVerticalScale(25),
    width: moderateScale(25),
  },
  textStyle: {
    fontSize: scale(12),
    fontFamily: latoRegular,
    color: colorCancel,
    textAlign: 'center',
  },
});

export default CancelRideComponent;
