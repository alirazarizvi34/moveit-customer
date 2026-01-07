import React, {useState, memo, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
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
import * as Animatable from 'react-native-animatable';

const {
  primaryText,
  defaultBackground,
  defaultText,
  secondaryBorder,
  defaultBorder,
  disableText,
  disableBackground,
  primaryBorder,
  magnoliaBackground
} = colorTheme;
const {jameelNooriNastaleeq, latoRegular, latoBold,latoHeavy, latoMedium, latoSemiBold,gilroyRegular} =
  THEME.fonts;

const HomeCard = ({title, image, subTitle, disabled, onPress, loading,setTriggerBlink, triggerBlink}) => {
  const [buttonPressed, setButtonPressed] = useState(false);
  const {i18n, t} = useTranslation();
  const styles = getStyles(i18n.language, disabled);
  const [isBlinking, setIsBlinking] = useState(triggerBlink);

  useEffect(() => {
    setIsBlinking(triggerBlink);
  }, [triggerBlink]);

  return (
    <View style={styles.container}>
      <View style={styles.containerView}>
        {!loading ? (
          <>
            <TouchableOpacity
              disabled={disabled}
              activeOpacity={AppConstants.buttonActiveOpacity}
              onPress={() => onPress(title)}>
              <Animatable.View animation={triggerBlink ? "bounceIn" : undefined}  iterationCount={2} onAnimationEnd={() => setTriggerBlink(false)}>
              <View style={styles.titleContainer}>
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
                      width:
                        title == 'book_truck_now'
                          ? moderateScale(269)
                          : moderateScale(157),
                      height:
                        title == 'book_truck_now'
                          ? moderateScale(96)
                          : moderateScale(134),
                      position: 'absolute',
                      bottom: 0,
                      right: 5,
                    }}
                  />
                </View>
              </View>
              </Animatable.View>
            </TouchableOpacity>
          </>
        ) : (
          <SkeletonPlaceholder borderRadius={4}>
            <View style={{flexDirection: 'row', alignItems: 'center',marginTop: moderateVerticalScale(10)}}>
              <View style={{flex: 1, height: moderateScale(141), borderRadius: 10}} />
            </View>
          </SkeletonPlaceholder>
        )}
      </View>
    </View>
  );
};

const getStyles = (language, disabled) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: moderateVerticalScale(15),
    },
    containerView: {
      marginHorizontal: moderateScale(22),
      // position: 'relative',
    },
    titleContainerView: {
      flex:1,
      alignItems: language=="urdu" ? 'flex-end' :'flex-start'
    },
    image: {
      width: moderateScale(309),
      height: moderateScale(100), // Adjust the height as needed
    },
    titleView: {
      marginLeft: language=="urdu" ? undefined : moderateScale(18),
      marginRight: language=="urdu" ? moderateScale(18) : undefined,
      paddingTop: moderateVerticalScale(16),
    },
    titleText: {
      fontSize: language=="urdu" ? scale(20) : scale(14),
      fontFamily: language=="urdu" ? jameelNooriNastaleeq: latoHeavy,
      color: disabled ? disableText : primaryText,
    },
    titleContainer: {
      height: moderateScale(140),
      borderRadius: 10,
      borderWidth: 2,
      borderColor: disabled ? defaultBorder : primaryBorder,
      marginTop: moderateVerticalScale(10),
      flexDirection: language=="urdu" ? 'row-reverse' : 'row',
      overflow: 'hidden',
      backgroundColor: magnoliaBackground
    },
    subTitleView: {
      marginRight: language=="urdu" ? moderateScale(18) : moderateScale(30),
      marginLeft: language=="urdu" ? moderateScale(18) : moderateScale(18),
      paddingTop: moderateVerticalScale(4),
    },
    subTitleText: {
      fontSize: language == 'urdu' ? scale(12) : scale(9),
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoRegular,
      color: disabled ? disableText : defaultText,
      lineHeight: language == 'urdu' ? Platform.OS === 'android' ? 16 : 20 : 13,
      textAlign: language == 'urdu' ? 'right' : 'left'
    },
    imageView: {
      flex: 1,
      justifyContent: 'flex-end',
    },
  });

export default memo(HomeCard);
