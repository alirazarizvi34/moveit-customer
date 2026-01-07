import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {memo, useContext} from 'react';
import {moderateScale, scale} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import {AppConstants} from '../../constants/AppConstants';
import BadgeComponent from './BadgeComponent';
import {colorTheme} from '../../constants/ColorConstants';
import {moderateVerticalScale} from 'react-native-size-matters';
import ItemCounter from '../ItemCounter/ItemCounter';
import {GlobalContext} from '../../../context/GlobalState';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppImages} from '../../constants/AppImages';

const {
  lightGrayBackground,
  lightPurpleBackground,
  primaryBackground,
  secondaryBackground,
  primaryBorder,
  primaryText,
} = colorTheme;
const {latoRegular, latoSemiBold, latoHeavy} = THEME.fonts;

const spaceCardList = ({
  spacesData,
  onPress,
  onPressInfo,
  isTouchDisable = false,
  decrement,
  increment,
}) => {
  const {relocationRequest} = useContext(GlobalContext);
  const {image, name, count} = spacesData;
  const packingField = `${name}_packing`;
  const styles = getStyles(count);

  const capitalizeFirstLetter = string => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getNameWithRoom = name => {
    // Check if the name is "drawing" or "dining"
    if (name === 'drawing' || name === 'dining') {
      return capitalizeFirstLetter(name) + ' Room'; // Append "Room"
    }
    return capitalizeFirstLetter(name); // Otherwise, just capitalize
  };

  return (
    <TouchableOpacity
      disabled={isTouchDisable}
      activeOpacity={AppConstants.buttonActiveOpacity}
      onPress={onPress}
      style={styles.container}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.iconContainer}>
          <Image resizeMode="contain" source={image} style={styles.icon} />
        </View>
        <View style={styles.titleContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text numberOfLines={2} style={styles.title}>
              {getNameWithRoom(name)}
            </Text>

            <TouchableOpacity
              style={styles.infoIconView}
              activeOpacity={AppConstants.activeOpacity}
              onPress={onPressInfo}>
              <Image
                resizeMode="contain"
                source={AppImages.infoIcon}
                style={styles.infoIcon}
              />
            </TouchableOpacity>
          </View>
          {spacesData[`${name}_packing`] === 1 && (
            <View style={styles.packingView}>
              <Image
                resizeMode="contain"
                source={AppImages.selectSpace}
                style={styles.check}
              />
              <Text style={styles.packingText}>Packing/Unpacking</Text>
            </View>
          )}
        </View>
      </View>

      <View
        style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        {name === 'bedroom' ? (
          <>
            {count > 0 && (
              <ItemCounter
                btnShape={'circle'}
                count={count}
                onDecreaseCount={decrement}
                onIncreaseCount={increment}
              />
            )}
          </>
        ) : (
          <>
            {count > 0 && (
              <View style={styles.circleCheckView}>
                <Image
                  resizeMode="contain"
                  source={AppImages.checkVector}
                  style={styles.circleCheck}
                />
              </View>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(spaceCardList);

const getStyles = count =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: count >= 1 ? lightPurpleBackground : lightGrayBackground,
      paddingHorizontal: moderateScale(15),
      marginHorizontal: moderateScale(2),
      marginTop: moderateVerticalScale(13),
      marginBottom: moderateVerticalScale(2),
      borderRadius: moderateScale(6),
      zIndex: 99999,
      height: moderateScale(79),
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    titleContainer: {
      marginLeft: moderateScale(15),
    },

    title: {
      fontSize: scale(18),
      color: primaryText,
      fontFamily: latoHeavy,
      // paddingBottom:10
      // marginBottom:10
    },
    packingView: {
      flexDirection: 'row',
      gap: 4,
      alignItems: 'center',
      height: moderateScale(15),
    },
    packingText: {
      fontSize: 8,
      color: primaryText,
      fontFamily: latoRegular,
      // paddingVertical:10,
      // backgroundColor:'red'
    },
    icon: {
      height: moderateScale(35),
      width: moderateScale(35),
    },
    infoIconView: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: moderateVerticalScale(5),
      marginLeft: moderateScale(3),
      width: moderateScale(20),
      height: moderateScale(20),
    },
    infoIcon: {
      height: moderateScale(20),
      width: moderateScale(20),
    },
    check: {
      width: 10,
      height: 10,
    },
    circleCheck: {
      width: moderateScale(10),
      height: moderateScale(8),
      marginTop: moderateVerticalScale(2),
      tintColor: primaryBackground,
    },
    circleCheckView: {
      backgroundColor: secondaryBackground,
      height: moderateScale(25),
      width: moderateScale(25),
      marginRight: 4,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      borderRadius: moderateScale(50),
      elevation: 4,
      shadowColor: 'rgba(0,0,0,0.75)',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    iconContainer: {
      // alignItems: 'flex-end',
      // paddingBottom: moderateScale(5),
      // justifyContent: 'flex-end',
      // width:""
      // flex: 1,
    },
  });
