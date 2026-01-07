import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { colorTheme } from '../../constants/ColorConstants';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome5';
const {
    primaryBackground,
    whiteBorder,
    defaultBackground,
    darkBlackBorder,
    secondaryBackground
  } = colorTheme;
export default function CustomCheckBox({isChecked,onPress}) {
    return (
        <TouchableOpacity style={styles.checkboxContainer} onPress={onPress} disabled={onPress ? false : true}>
          <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
            {isChecked && 
            <Icon name={'check'} size={10} color={primaryBackground} />
             }
          </View>
        </TouchableOpacity>
      );
}

const styles = StyleSheet.create({
      checkboxContainer: {
        marginRight: moderateScale(20),
      },
      checkbox: {
        width: moderateScale(20),
        height: moderateScale(20),
        borderWidth: 0.5,
        borderColor: darkBlackBorder,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: defaultBackground, // Add background color to make the checkbox visible
      },
      checkboxChecked: {
        backgroundColor: secondaryBackground,
        borderColor: secondaryBackground,
      },
  });