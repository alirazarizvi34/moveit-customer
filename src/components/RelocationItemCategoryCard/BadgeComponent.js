import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {THEME} from '../../shared/theme';
import {moderateScale, scale} from 'react-native-size-matters';
import { colorTheme } from '../../constants/ColorConstants';

const BadgeComponent = ({count}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{count > 99 ? '99+' : count}</Text>
    </View>
  );
};

export default BadgeComponent;


const {primaryText,secondaryBackground,defaultBackground} = colorTheme
const {latoHeavy} = THEME.fonts;
const styles = StyleSheet.create({
  text: {
    color: primaryText,
    fontSize: scale(13),
    fontFamily: latoHeavy,
  },
  container: {
    // shadowColor: 'rgba(0,0,0,0.8)',  
    elevation: 4, 
    // shadowOffset: { width: 0, height: 0 },

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // elevation: 5,

    height: moderateScale(36),
    width: moderateScale(36),
    backgroundColor: defaultBackground,
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -3,
    top: -10,
    zIndex: 9999,
  },
});
