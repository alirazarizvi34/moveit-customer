import React, { useState, useContext, useEffect, useRef } from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import IconMaterial from 'react-native-vector-icons/SimpleLineIcons';
import Modal from 'react-native-modal';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import { THEME } from '../../shared/theme';
import { useTranslation } from 'react-i18next';

const {buttonBgColor, buttonTxtColorWhite, priButtonBorderColor, PriButtonBgColor, modalBgColor } = THEME.colors;
const {latoMedium} = THEME.fonts;

const AttachPictureModal = ({
    onPress,
    onPressCamera,
    onPressgallery,
    modalVisible,
    ...props
}) => {
  const { t, i18n } = useTranslation();

  return (
    <Modal isVisible={modalVisible}>
    <View
      style={{
        backgroundColor: modalBgColor,
        padding: moderateScale(20),
        height: moderateScale(272),
        borderRadius: moderateScale(20),
      }}
    >

      <TouchableOpacity onPress={onPress} style={{width: moderateScale(25), height: moderateScale(25),alignItems:'center',justifyContent:"center",position:"absolute",right:moderateScale(0),top:moderateVerticalScale(23),marginRight:moderateScale(23),zIndex:1}}>

        <Image style={{ width: moderateScale(18), height: moderateScale(18)}}
          source={require('../../../assets/icons/close.png')}
        />

      </TouchableOpacity>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <TouchableOpacity
          onPress={onPressCamera}
          style={styles.modalTouchableOpacity}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: scale(18),
              fontFamily:latoMedium,
              color: buttonTxtColorWhite,
              marginRight: moderateScale(18)
            }}>
            {t('Open Camera')}
          </Text>
          <IconMaterial name={'camera'} size={scale(22)} color={buttonTxtColorWhite} />

        </TouchableOpacity>

        <TouchableOpacity
          onPress={onPressgallery}
          style={[styles.modalTouchableOpacity, { backgroundColor: buttonBgColor, marginTop: moderateVerticalScale(12) }]}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: scale(18),
              fontFamily:latoMedium,
              color: '#4C1F6B',
              marginRight: moderateScale(18)
            }}>
            {t('Open Gallery')}
          </Text>
          <Image
            style={{ width: moderateScale(25), height: (22) ,resizeMode:"contain"}}
            source={require('../../../assets/icons/imageFolder.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  );
};

const styles = StyleSheet.create({
    modalTouchableOpacity: {
      flexDirection: 'row',
      justifyContent: "center",
      backgroundColor: PriButtonBgColor,
      borderWidth: moderateScale(2),
      borderColor: priButtonBorderColor,
      fontSize: scale(24),
      borderRadius: moderateScale(50),
      padding: moderateScale(12),
    },
  
  
  });

export default AttachPictureModal;