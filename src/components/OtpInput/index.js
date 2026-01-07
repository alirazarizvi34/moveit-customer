import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

import IconComponent from '../iconComp';

import { THEME } from '../../shared/theme';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import { ProgressSteps } from 'react-native-progress-steps';
const { colorF6F6F6, colorBlack, colorB0B0C3, colorF0F0F0 } = THEME.colors
const {latoBlack} = THEME.fonts;

const OptInput = ({
    inLineStyle={},
    onChangeText= () =>{},
}) => {
    return (
     
        
        <TextInput
          ref={(ref) => (t4 = ref)}
          value={text4}
          onChangeText={(text) => {
            setText4(text.trim());
            changeFocusT4(text);
          }}
          style={styles.otpInputTextStyle}
          maxLength={1}
          keyboardType={'decimal-pad'}
        />
           
    )
}

const styles = StyleSheet.create({
    otpInputTextStyle: {
        padding: 7,
        backgroundColor: '#ECECEC',
        marginHorizontal: 10,
        width: 40,
        fontSize: 20,
        textAlign: 'center',
        borderBottomColor: '#4E008A',
        borderBottomWidth: 4,
      },
})

export default OptInput