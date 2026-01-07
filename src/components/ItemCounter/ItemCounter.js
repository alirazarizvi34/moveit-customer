import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {memo} from 'react';
import {AppImages} from '../../constants/AppImages';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import {AppConstants} from '../../constants/AppConstants';
import {colorTheme} from '../../constants/ColorConstants';

const ItemCounter = ({
  count,
  onDecreaseCount,
  onIncreaseCount,
  isTouchDisable = false,
  btnShape = 'rectangle',
}) => {
  const styles = getStyles(count);

  return (
    <View style={styles.container}>
      {btnShape === 'circle' ? (
        <>
          <TouchableOpacity
            onPress={onDecreaseCount}
            disabled={isTouchDisable ?? count == 0 ? true : false}
            activeOpacity={AppConstants.buttonActiveOpacity}
            style={styles.circleButtonContainer}>
            <View style={styles.circleMinusBtn}>
              <Image
                source={AppImages.minusGray}
                resizeMode="contain"
                style={styles.circleMinusIcon}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.CountContainer}>
            <Text style={styles.circleCountText}>{count}</Text>
          </View>
          <TouchableOpacity
            disabled={isTouchDisable}
            onPress={onIncreaseCount}
            activeOpacity={AppConstants.buttonActiveOpacity}
            style={styles.circleButtonContainer}>
            <View style={styles.circlePlusBtn}>
              <Image
                resizeMode="contain"
                source={AppImages.plusGray}
                style={styles.circlePlusIcon}
              />
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {(count > 0 || count === "G") && (
            <>
              <TouchableOpacity
                onPress={onDecreaseCount}
                disabled={isTouchDisable ?? (count <= 0 && count !== "G")}
                activeOpacity={AppConstants.buttonActiveOpacity}
                style={styles.buttonContainer}>
                <View style={styles.minusBtn}>
                  <Image
                    source={AppImages.minusGray}
                    resizeMode="contain"
                    style={styles.minusIcon}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.CountContainer}>
                <Text style={styles.countText}>{count}</Text>
              </View>
            </>
          )}
          <TouchableOpacity
            disabled={isTouchDisable}
            onPress={onIncreaseCount}
            activeOpacity={AppConstants.buttonActiveOpacity}
            style={styles.buttonContainer}>
            <View style={styles.plusBtn}>
              <Image
                resizeMode="contain"
                source={AppImages.plusGray}
                style={styles.plusIcon}
              />
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default memo(ItemCounter);

const {
  lightGrayBackground,
  defaultText,
  defaultBackground,
  secondaryBackground,
  lightPurpleBackground,
  primaryBackground,
  primaryText,
  darkBlackBorder,
} = colorTheme;
const {latoHeavy, latoBold} = THEME.fonts;
const getStyles = count =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: moderateScale(140),
      justifyContent: 'flex-end',
    },
    buttonContainer: {
      padding: 4,
    },
    circleButtonContainer: {
      padding: 4,
    },
    CountContainer: {
      width: moderateScale(40),
      justifyContent: 'center',
    },
    minusBtn: {
      backgroundColor: lightPurpleBackground,
      marginLeft: moderateScale(8),
      height: moderateScale(22),
      width: moderateScale(22),
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      borderRadius: moderateScale(2),
    },
    circleMinusBtn: {
      backgroundColor: defaultBackground,
      marginLeft: moderateScale(8),
      height: moderateScale(25),
      width: moderateScale(25),
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
    countText: {
      fontSize: scale(14),
      color: primaryText,
      fontFamily: latoHeavy,
      textAlign: 'center',
    },
    circleCountText: {
      fontSize: scale(16),
      color: defaultText,
      fontFamily: latoHeavy,
      textAlign: 'center',
    },
    plusBtn: {
      backgroundColor: count ? lightPurpleBackground : secondaryBackground,
      height: moderateScale(22),
      marginRight: moderateScale(4),
      marginLeftt: count > 0 ? 0 : 8,
      width: moderateScale(22),
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      borderRadius: moderateScale(2),
    },
    circlePlusBtn: {
      backgroundColor: secondaryBackground,
      height: moderateScale(25),
      width: moderateScale(25),
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
    minusIcon: {
      height: moderateScale(5),
      width: moderateScale(9),
      tintColor: primaryBackground,
      marginTop: moderateVerticalScale(2),
      marginRight: moderateScale(1),
      // backgroundColor:'red'
    },
    circleMinusIcon: {
      height: moderateScale(5),
      width: moderateScale(9),
      tintColor: darkBlackBorder,
      marginTop: moderateVerticalScale(2),
      marginRight: moderateScale(1),
    },
    plusIcon: {
      width: moderateScale(8),
      height: moderateScale(10),
      tintColor: primaryBackground,
    },
    circlePlusIcon: {
      width: moderateScale(8),
      height: moderateScale(10),
      tintColor: primaryBackground,
    }
  });
