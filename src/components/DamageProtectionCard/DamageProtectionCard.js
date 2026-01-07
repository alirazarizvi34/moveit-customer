import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {THEME} from '../../shared/theme';
import {moderateScale, scale} from 'react-native-size-matters';
import {AppConstants} from '../../constants/AppConstants';
import {useTranslation} from 'react-i18next';
import {colorTheme} from '../../constants/ColorConstants';
import {GlobalContext} from '../../../context/GlobalState';
import {AppImages} from '../../constants/AppImages';

const DamageProtectionCard = ({
  onOtherPress,
  onNonePress,
  damageProtectionData = [],
  updateCurrentProtection,
  selectedCoverage,
  setSelectedCoverage,
  pressInfoBtn,
  isTouchDisable = false,
}) => {
  const {t} = useTranslation();
  const {bootMeUpData} = useContext(GlobalContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerHeading}>{t('damageProtectionOptions')}</Text>
        {/* <Text style={styles.headerDescription}>{t('youCanEarnUpto')}</Text> */} 
        <TouchableOpacity
          disabled={isTouchDisable}
          style={styles.infoBtn}
          onPress={pressInfoBtn}
          activeOpacity={AppConstants.buttonActiveOpacity}>
          <Image source={AppImages.infoIcon} style={styles.infoIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.radioGroupContainer}>
        {damageProtectionData.map((card, index) => (
          <TouchableOpacity
            disabled={isTouchDisable}
            onPress={() => {
              if (card.id == 6) {
                onOtherPress();
              }
              setSelectedCoverage(card.id);
              updateCurrentProtection(card);
            }}
            activeOpacity={AppConstants.buttonActiveOpacity}
            key={index}
            style={[
              styles.cardContainer,
              {
                borderBottomWidth:
                  index == damageProtectionData.length - 1 ? 0 : 1,
              },
            ]}>
            <View
              style={[
                styles.btn,
                {
                  borderColor:
                    card.id == selectedCoverage ? primaryBorder : defaultBorder,
                },
              ]}>
              {card.id == selectedCoverage && (
                <View style={styles.selectedBtn} />
              )}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>{card.label}</Text>
              {card.value != 0 && (
                <Text style={styles.value}>
                  + PKR {card?.value.toLocaleString('en-US')}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default DamageProtectionCard;

const {colorFFEDCE} = THEME.colors;
const {
  defaultBackground,
  primaryText,
  darkGrayText,
  defaultBorder,
  primaryBackground,
  defaultText,
  primaryBorder,
} = colorTheme;
const {latoRegular, latoBold, latoHeavy} = THEME.fonts;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultBackground,
    borderRadius: moderateScale(15),
    elevation: 4,
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  radioRow: {
    backgroundColor: 'red',
    marginVertical: moderateScale(5),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorFFEDCE,
    borderTopLeftRadius: moderateScale(15),
    borderTopRightRadius: moderateScale(15),
    paddingVertical: moderateScale(10),
  },
  headerHeading: {
    color: primaryText,
    fontSize: scale(15),
    fontFamily: latoHeavy,
    textAlign: 'center',
  },
  headerDescription: {
    color: darkGrayText,
    fontSize: scale(10),
    fontFamily: latoRegular,
    textAlign: 'center',
  },
  radioGroupContainer: {
    padding: moderateScale(10),
  },
  cardContainer: {
    flexDirection: 'row',
    paddingVertical: moderateScale(10),
    alignItems: 'center',
    borderColor: defaultBorder,
  },
  btn: {
    height: moderateScale(18),
    width: moderateScale(18),
    borderWidth: 2.5,
    borderColor: defaultBorder,
    borderRadius: moderateScale(18),
    justifyContent: 'center',
    alignItems: 'center',
    // flex:.
  },
  selectedBtn: {
    height: moderateScale(8),
    width: moderateScale(8),
    borderRadius: moderateScale(8),
    backgroundColor: primaryBackground,
  },
  label: {
    fontSize: scale(10),
    color: defaultText,
    fontFamily: latoBold,
    marginLeft: 12,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    flex: 5,
  },
  value: {
    fontSize: scale(10),
    fontFamily: latoHeavy,
    color: primaryText,
  },
  infoIcon: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  infoBtn: {
    height: moderateScale(25),
    width: moderateScale(25),
    position: 'absolute',
    right: moderateScale(25),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
