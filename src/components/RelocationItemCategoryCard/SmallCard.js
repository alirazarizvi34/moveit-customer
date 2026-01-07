import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {THEME} from '../../shared/theme';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {AppConstants} from '../../constants/AppConstants';
import BadgeComponent from './BadgeComponent';
import {colorTheme} from '../../constants/ColorConstants';

const SmallCard = ({categoryData, onPress}) => {
  const {icon, name, caption, count} = categoryData;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={AppConstants.buttonActiveOpacity}
      style={styles.container}>
      {count > 0 && <BadgeComponent count={count} />}
      <View style={styles.titleContainer}>
        <Text style={styles.title} ellipsizeMode="tail" numberOfLines={2}>
          {name}
        </Text>
        <Text style={styles.description} ellipsizeMode="tail" numberOfLines={2}>
          {caption}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <Image resizeMode='contain' source={{uri: icon}} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

export default memo(SmallCard);

const {latoRegular, latoHeavy} = THEME.fonts;
const {lightPurpleBackground, primaryText} = colorTheme;
const styles = StyleSheet.create({
  container: {
    backgroundColor: lightPurpleBackground,
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: moderateScale(68),
    flex: 1,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.65,
    maxWidth: '48%'
  },

  titleContainer: {
    flex: 1,
    paddingRight: moderateScale(2)
  },
  title: {
    fontSize: scale(14),
    color: primaryText,
    fontFamily: latoHeavy,
  },
  description: {
    color: primaryText,
    fontSize: scale(8),
    width: "100%",
    flexGrow:1,
    fontFamily: latoRegular,
  },
  iconContainer: {
    width: moderateScale(45),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  icon: {
    height: moderateScale(47),
    width: moderateScale(47),
  },
});
