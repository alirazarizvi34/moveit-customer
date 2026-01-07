import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {moderateScale, scale} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import {AppConstants} from '../../constants/AppConstants';
import BadgeComponent from './BadgeComponent';
import {colorTheme} from '../../constants/ColorConstants';
import {moderateVerticalScale} from 'react-native-size-matters';
import {useTranslation} from 'react-i18next';
import {AppImages} from '../../constants/AppImages';

const BigCard = ({categoryData, onPress, isTouchDisable = false}) => {
  const {i18n, t} = useTranslation();
  const {icon, name, caption, count} = categoryData;
  const styles = getStyles(i18n.language);

  return (
    <TouchableOpacity
      disabled={isTouchDisable}
      activeOpacity={AppConstants.buttonActiveOpacity}
      onPress={onPress}
      style={styles.container}>
      {count > 0 && <BadgeComponent count={count} />}
      {name.toLowerCase() === 'parcels' && (
        <View style={styles.evImageView}>
          <Image
            source={AppImages.ev}
            resizeMode="contain"
            style={styles.evImage}
          />
          <Text style={styles.evText}>Powered</Text>
        </View>
      )}
      <View style={styles.titleContainer}>
        <Text numberOfLines={2} style={styles.title}>
          {name}
        </Text>
        <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
          {caption}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <Image resizeMode="contain" source={{uri: icon}} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

export default memo(BigCard);

const {lightPurpleBackground, primaryText} = colorTheme;
const {latoRegular, latoHeavy} = THEME.fonts;
const getStyles = language =>
  StyleSheet.create({
    container: {
      backgroundColor: lightPurpleBackground,
      paddingHorizontal: moderateScale(8),
      paddingTop: moderateScale(10),
      borderRadius: moderateScale(6),
      zIndex: 99999,
      height: moderateScale(135),
      flex: 1,
      elevation: 2,
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 4.65,
      maxWidth: '48%',
    },
    titleContainer: {
      // width: moderateScale(100),
      // maxWidth:moderateScale(100),
      flex: 1,
      flexGrow: 1,
    },

    title: {
      fontSize: scale(18),
      color: primaryText,
      fontFamily: latoHeavy,
    },
    description: {
      marginTop: moderateVerticalScale(6),
      color: primaryText,
      fontSize: scale(9),
      fontFamily: latoRegular,
      width: '75%',
      // flex:1,
      // flexGrow: 1,
    },
    icon: {
      height: moderateScale(56),
      width: moderateScale(56),
    },
    iconContainer: {
      alignItems: 'flex-end',
      paddingBottom: moderateScale(5),
      justifyContent: 'flex-end',
      // width:""
      flex: 1,
    },
    evImageView: {
      position: 'absolute',
      right: language == 'urdu' ? undefined : 0,
      left: language == 'urdu' ? 0 : undefined,
      marginHorizontal: moderateScale(4),
      marginTop: moderateVerticalScale(2),
    },
    evImage: {
      width: moderateScale(26),
      height: moderateScale(30),
    },
    evText: {
      fontSize: scale(5),
      fontFamily: latoRegular,
      textAlign: 'center',
    },
  });
