import React, {useState, useContext, useEffect, useCallback} from 'react';
import {View,Text,Image, TouchableOpacity} from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppImages } from '../../constants/AppImages';
import { getStyles } from './SearchListItemStyle';

export default SearchListItems = ({title,description,place_id,onPress}) => {

  const styles = getStyles();
  const { t, i18n } = useTranslation();

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onPress(place_id)}>
    <View style={styles.itemContainer}>
    <View style={styles.itemImageView}>
    <Image
      source={AppImages?.locationPin}
      style={styles.itemImage}
    />
    </View>
    <View style={styles.itemDetailView}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
    </View>
  </View>
  </TouchableOpacity>
  );
};

