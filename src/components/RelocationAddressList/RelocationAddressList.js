import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {colorTheme} from '../../constants/ColorConstants';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {AppImages} from '../../constants/AppImages';
import {AppConstants} from '../../constants/AppConstants';
import {useTranslation} from 'react-i18next';
import {THEME} from '../../shared/theme';

const RelocationAddressList = ({type, title, onAddressPress, isTouchDisable=false}) => {
  const {t} = useTranslation();
  return (
    <TouchableOpacity
      disabled={isTouchDisable}
      onPress={onAddressPress}
      activeOpacity={AppConstants.buttonActiveOpacity}
      style={styles.container}>
      <View style={styles.headingContainer}>
        <Image
          resizeMode="contain"
          source={type == 'p' ? AppImages.locationPin : AppImages.dropoffpin}
          style={styles.icon}
        />
        <Text style={styles.addressTypeText}>
          {type == 'p' ? t('pickup_address') : t('droppoff_address')}
        </Text>
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default RelocationAddressList;

const {
  defaultBackground,
  lightGrayBorder,
  darkGrayText,
  defaultBorder,
  defaultText,
} = colorTheme;
const {latoMedium} = THEME.fonts;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(18),
    paddingVertical: moderateVerticalScale(8),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderColor: lightGrayBorder,
    backgroundColor: defaultBackground,
    borderRadius: moderateScale(8),
    width: '100%',
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: moderateScale(11),
    width: moderateScale(11),
  },
  addressTypeText: {
    fontSize: scale(10),
    color: darkGrayText,
    marginLeft: moderateScale(8),
    fontFamily: latoMedium,
  },
  title: {
    fontFamily: latoMedium,
    paddingVertical: moderateVerticalScale(5),
    fontSize: scale(13),
    color: defaultText,
  },
});
