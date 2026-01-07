import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';

import BottomModal from './BottomModal';
import {AppImages} from '../../constants/AppImages';
import ButtonComponent from '../buttonComp/ButtonComponent';
import { colorTheme } from '../../constants/ColorConstants';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import { THEME } from '../../shared/theme';

const {latoSemiBold, jameelNooriNastaleeq, latoBold,latoMedium} = THEME.fonts;
const {
  defaultText,
  defaultBackground,
  lightGrayBorder,

  placeholderText,
  lightPurpleBackground,
  drawerPinkBackground,
  darkGrayBorder,
  defaultBorder
} = colorTheme;

const RelocationLoadibngUnloadingModal = ({
  visible,
  onClose,
  acceptPress,
  rejectPress,
  title,
  description,
  titleColor,
  loader,
  loadingState,
}) => {
  const {i18n, t} = useTranslation();
  const {defaultBorder} = colorTheme

  const styles = getStyles(i18n.language, titleColor);

  return (
    <BottomModal onClose={onClose} draggable={true} visible={visible}>
    {/* // <BottomModal draggable type={"pink"} small visible={visible} onModalClose={!loadingState && onClose}> */}
      <View style={styles.container}>
        
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>{description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonComponent
            disabled={false}
            pressStatus={loadingState}
            indicatorColor={defaultBorder}
            textStyle={styles.rejectText}
            btnStyle={styles.rejectBtn}
            onPress={rejectPress}
            text={t('no')}
          />
          <ButtonComponent
            btnStyle={styles.acceptBtn}
            textStyle={styles.acceptText}
            disabled={loadingState ? true : false}
            onPress={acceptPress}
            text={t('yes')}
          />
        </View>
      </View>
    </BottomModal>
  );
};

export default RelocationLoadibngUnloadingModal;

const getStyles = (language, titleColor) =>
    StyleSheet.create({
        container: {
            paddingHorizontal: moderateScale(30),
            paddingTop: moderateVerticalScale(15),
            paddingBottom: moderateVerticalScale(30),
            flex: 1,
          },
          alertIcon: {
            height: moderateVerticalScale(30),
            width: moderateScale(30),
          },
          buttonContainer: {
            width: '100%',
            justifyContent: 'space-between',
            // gap: (18),
            alignItems: 'center',
            alignContent: 'space-between',
            flexDirection: 'row',
            marginTop: moderateVerticalScale(25),
          },
          title: {
            color: titleColor ? titleColor : defaultText,
            fontSize: language == 'urdu' ? scale(24) : scale(16),
            fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoBold,
          },
          subTitle: {
            fontSize: language == 'urdu' ? scale(16) : scale(12),
            textAlign: 'center',
          },
          titleContainer: {
            marginTop: moderateVerticalScale(20),
          },
          subTitleContainer: {
            marginTop: moderateVerticalScale(5),
          },
          acceptBtn: {
            width: moderateScale(140),
            borderRadius: moderateScale(100),
            // backgroundColor:lightPurpleBackground
          },
          rejectBtn: {
            width: moderateScale(140),
            borderRadius: moderateScale(100),
            backgroundColor: defaultBackground,
            borderWidth: 1,
            borderColor: defaultBorder,
          },
          rejectText: {
            color: placeholderText,
            fontSize: scale(14),
            fontFamily:latoSemiBold
          },
          acceptText: {
            fontSize: scale(14),
            fontFamily:latoSemiBold
          },
    });
  
