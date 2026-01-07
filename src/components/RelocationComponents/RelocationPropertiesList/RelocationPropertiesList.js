import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {THEME} from '../../../shared/theme';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {colorTheme} from '../../../constants/ColorConstants';
import {AppImages} from '../../../constants/AppImages';

const {defaultText, primaryText, defaultBackground, secondaryBackground} =
  colorTheme;
const {latoSemiBold, latoHeavy, latoBold} = THEME.fonts;

const RelocationPropertiesList = ({item, onPress, selectedId,index, isTouchDisable=false}) => {

  const backgroundColor =
    item.name === selectedId ? secondaryBackground : defaultBackground;
  const elevation = item.name === selectedId ? 5 : 5;
  const textColor = item.name === selectedId ? primaryText : primaryText;
  const textFamily = item.name === selectedId ? latoHeavy : latoBold;
  const styles = getStyles(backgroundColor, elevation, textColor, textFamily);

  const propertyName = [
    {House: AppImages.home},
    {Office: AppImages.office},
    {Store: AppImages.home},
    {Apartment: AppImages.apartment},
    {Others: AppImages.others},
  ];

  const imageHandler = item => {
    // the in operator to check if the key exists within each object.
    let foundObject = propertyName.find(obj => item?.name in obj);
    if (foundObject) {
      let foundValue = foundObject[item?.name];
      return foundValue;
    }
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
      disabled={isTouchDisable}
       onPress={() => onPress(item,index)}
        style={styles.containerView}>
        <Image
          source={imageHandler(item)}
          resizeMode="contain"
          style={styles.image}
        />
      <Text style={styles.text}>{item?.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RelocationPropertiesList;

const getStyles = (backgroundColor, elevation, textColor, textFamily) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: moderateVerticalScale(8),
      paddingHorizontal: moderateScale(2),
    },
    containerView: {
      gap:8,
      backgroundColor: backgroundColor,
      width: moderateScale(98),
      height: moderateScale(75),
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      // marginVertical: moderateVerticalScale(8),
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowOffset: {
        width: 3,
        height: 6,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: elevation,
    },
    image: {
      width: moderateScale(30),
      height: moderateScale(30),
    },
    text: {
      fontSize: scale(11),
      fontFamily: textFamily,
      color: textColor,
    },
  });
