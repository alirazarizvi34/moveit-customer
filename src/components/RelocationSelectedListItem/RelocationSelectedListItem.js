import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {memo} from 'react';
import ItemCounter from '../ItemCounter/ItemCounter';
import {AppImages} from '../../constants/AppImages';
import {moderateScale, scale} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import {AppConstants} from '../../constants/AppConstants';
import {colorTheme} from '../../constants/ColorConstants';

const RelocationSelectedListItem = ({
  title,
  count,
  onDecreaseCount,
  onIncreaseCount,
  onDeletePress,
  description,
  searchItem,
  category,
  isFragile,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {!searchItem && (
            <TouchableOpacity
              onPress={onDeletePress}
              activeOpacity={AppConstants.buttonActiveOpacity}
              style={styles.trashBtn}>
              <Image source={AppImages.trashIcon} style={styles.trashIcon} />
            </TouchableOpacity>
          )}
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {description && (
              <Text numberOfLines={1} style={styles.description}>
                {description}
              </Text>
            )}
            {category && <Text style={styles.category}>{category}</Text>}
          </View>
          {isFragile === 1 && (
            <Image
              source={AppImages?.fragile}
              resizeMode="contain"
              style={styles.fragileIcon}
            />
          )}
        </View>
      </View>
      <View style={styles.counterContainer}>
        <ItemCounter
          onDecreaseCount={onDecreaseCount}
          onIncreaseCount={onIncreaseCount}
          count={count}
        />
      </View>
    </View>
  );
};

export default memo(RelocationSelectedListItem);

const {lightGrayBackground, primaryText, darkGrayText} = colorTheme;
const {latoHeavy, latoRegular, latoItalic} = THEME.fonts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  category: {
    color: primaryText,
    fontFamily: latoItalic,
    fontSize: scale(8),
  },
  titleContainer: {
    width: '45%',
  },
  trashIcon: {
    height: moderateScale(12),
    width: moderateScale(12),
  },
  counterContainer: {
    width: '45%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  trashBtn: {
    height: moderateScale(22),
    width: moderateScale(22),
    backgroundColor: lightGrayBackground,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(24),
    marginRight: moderateScale(9),
  },
  textContainer: {
    gap: 1,
  },
  title: {
    color: primaryText,
    fontFamily: latoHeavy,
    fontSize: scale(11),
  },
  description: {
    color: primaryText,
    fontFamily: latoItalic,
    fontSize: scale(8),
  },
  fragileIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginLeft: 15,
  },
});
