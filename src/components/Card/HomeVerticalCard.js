import React, {useState, memo} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {THEME} from '../../shared/theme';
import {AppConstants} from '../../constants/AppConstants';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {colorTheme} from '../../constants/ColorConstants';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {AppImages} from '../../constants/AppImages';

const {
  primaryText,
  defaultBackground,
  defaultText,
  secondaryBorder,
  defaultBorder,
  disableText,
  disableBackground,
  primaryBorder,
  magnoliaBackground,
} = colorTheme;
const {
  jameelNooriNastaleeq,
  latoRegular,
  latoBold,
  latoHeavy,
  latoMedium,
  latoSemiBold,
  gilroyRegular,
} = THEME.fonts;

const HomeVerticalCard = ({
  title,
  image,
  subTitle,
  disabled,
  onPress,
  loading,
}) => {
  const [buttonPressed, setButtonPressed] = useState(false);
  const {i18n, t} = useTranslation();
  const styles = getStyles(i18n.language, disabled);

  return (
    <View style={styles.container}>
      {!loading ? (
        <>
          <TouchableOpacity
            disabled={disabled}
            activeOpacity={AppConstants.buttonActiveOpacity}
            onPress={() => onPress(title)}>
            <View style={styles.titleContainer}>
              {title === 'deliveries' && 
              <View style={styles.evImageView}>
                <Image
                  source={AppImages.ev}
                  resizeMode="contain"
                  style={styles.evImage}
                />
                <Text style={styles.evText}>Powered</Text>
              </View>
              }
              <View style={styles.titleContainerView}>
                <View style={styles.titleView}>
                  <Text style={styles.titleText}>{t(title)}</Text>
                </View>
                <View style={styles.subTitleView}>
                  <Text style={styles.subTitleText}>{t(subTitle)}</Text>
                </View>
              </View>
              <View style={styles.imageView}>
                <Image
                  source={image}
                  resizeMode="contain"
                  style={{
                    width: moderateScale(146),
                    height: moderateScale(107),
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <SkeletonPlaceholder borderRadius={4}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: moderateVerticalScale(10),
            }}>
            <View
              style={{flex: 1, height: moderateScale(211), borderRadius: 10}}
            />
          </View>
        </SkeletonPlaceholder>
      )}
    </View>
  );
};

const getStyles = (language, disabled) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: moderateVerticalScale(6),
    },
    image: {
      width: moderateScale(309),
      height: moderateScale(100), // Adjust the height as needed
    },
    titleView: {
      marginLeft: language == 'urdu' ? undefined : moderateScale(18),
      marginRight: language == 'urdu' ? moderateScale(18) : undefined,
      paddingTop: moderateVerticalScale(24),
      alignItems: language == 'urdu' ? 'flex-end' : 'flex-start',
    },
    titleContainerView: {
      flex: 1,
    },
    titleText: {
      fontSize: language == 'urdu' ? scale(20) : scale(14),
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoHeavy,
      color: disabled ? disableText : primaryText,
      lineHeight:
        language == 'urdu' ? (Platform.OS === 'android' ? 28 : 30) : 20,
    },
    titleContainer: {
      height: moderateScale(211),
      borderRadius: 10,
      borderWidth: 2,
      borderColor: disabled ? defaultBorder : primaryBorder,
      marginTop: moderateVerticalScale(10),
      overflow: 'hidden',
      backgroundColor: magnoliaBackground,
    },
    subTitleView: {
      marginRight: language == 'urdu' ? moderateScale(18) : moderateScale(22),
      marginLeft: language == 'urdu' ? moderateScale(18) : moderateScale(18),
      paddingTop: moderateVerticalScale(4),
    },
    subTitleText: {
      fontSize: language == 'urdu' ? scale(12) : scale(9),
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoRegular,
      color: disabled ? disableText : defaultText,
      // lineHeight: language == 'urdu' ? Platform.OS === 'android' ? 15 : 20 : 12,
      lineHeight:
        language == 'urdu' ? (Platform.OS === 'android' ? 16 : 20) : 13,
      textAlign: language == 'urdu' ? 'right' : 'left',
      // backgroundColor:'orange'
    },
    imageView: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginBottom: moderateVerticalScale(3),
    },
    evImageView: {
      position: 'absolute',
      right: language == 'urdu' ? undefined : 0,
      left: language == 'urdu' ? 0 : undefined,
      marginHorizontal:moderateScale(7),
      marginTop: 4,
      // alignItems: 'center',
    },
    evImage: {
      width: moderateScale(30),
      height: moderateScale(34),
    },
    evText: {
      fontSize: scale(6),
      fontFamily: latoRegular,
      textAlign:'center'
    },
  });

export default memo(HomeVerticalCard);
