import React from 'react';
import {ImageBackground, Text, StyleSheet} from 'react-native';
import {AppImages} from '../../constants/AppImages';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import {colorTheme} from '../../constants/ColorConstants';
const {latoSemiBold} = THEME.fonts;
const {whiteText} = colorTheme;
export default GoogleMapPinWithInput = ({title}) => {
  return (
    <ImageBackground
      source={AppImages.currentlocationtext}
      style={styles.currentMarkerInputArea}>
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        style={styles.currentMarkerInputText}>
        {title ? title : 'Searching....'}
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  currentMarkerInputArea: {
    width: moderateScale(35),
    height: moderateScale(65),
    marginBottom:3
  },
  currentMarkerInputText: {
    fontSize: scale(8),
    fontFamily: latoSemiBold,
    color: whiteText,
  },
});
