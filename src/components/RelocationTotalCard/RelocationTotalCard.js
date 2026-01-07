import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {useTranslation} from 'react-i18next';
import {THEME} from '../../shared/theme';
import {AppConstants} from '../../constants/AppConstants';
import {colorTheme} from '../../constants/ColorConstants';
const {colorE2BCFF, colorCD8CFF, color4E008A} = THEME.colors;

const {lightPurpleBackground, primaryText, secondaryText} = colorTheme;
const {latoSemiBold, latoBold} = THEME.fonts;

const RelocationTotalCard = ({onPress, totalCount}) => {
  const {i18n, t} = useTranslation();

  return (
    <TouchableOpacity
      activeOpacity={AppConstants.buttonActiveOpacity}
      onPress={onPress}
      style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.totalItemText}>{t('totalItemSelected')}</Text>
      </View>
      <View style={styles.outerContainer}>
        <View style={styles.firstLayer}></View>
        <View style={styles.secondLayer}></View>

        <View style={styles.thirdLayer}>
          <Text style={styles.valueText}>{totalCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(RelocationTotalCard);

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightPurpleBackground,
    elevation: 8,
    shadowColor: 'rgba(78, 0, 138, 1)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: moderateScale(40),
    borderRadius: moderateScale(20),
  },
  titleContainer: {
    flex: 5,
    paddingVertical: moderateScale(11),
    paddingHorizontal: moderateScale(22),
  },
  outerContainer: {
    flex: 3,
    flexDirection: 'row',
    borderRadius: moderateScale(20),
    zIndex: 1,
  },
  firstLayer: {
    backgroundColor: colorE2BCFF,
    height: moderateScale(40),
    flex: 2,
    borderRadius: moderateScale(30),
    zIndex: 9999,
    width: '90%',
    left: '10%',
    position: 'absolute',
  },
  secondLayer: {
    backgroundColor: colorCD8CFF,
    height: moderateScale(40),
    flex: 2,
    borderRadius: moderateScale(30),
    zIndex: 9999,
    width: '80%',
    left: '20%',
    position: 'absolute',
  },
  thirdLayer: {
    backgroundColor: color4E008A,
    height: moderateScale(40),
    flex: 2,
    borderRadius: moderateScale(30),
    zIndex: 9999,
    width: '70%',
    left: '30%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',

    // width: moderateScale(80),
  },
  valueText: {
    fontFamily: latoSemiBold,
    color: secondaryText,
    fontSize: scale(15),
  },
  totalItemText: {
    fontFamily: latoBold,
    color: primaryText,
    lineHeight: moderateScale(16),
    fontSize: scale(12),
  },
});
