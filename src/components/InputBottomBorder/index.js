
import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import { THEME } from '../../shared/theme';

const { color505050, color949494, color898A8D, color4E008A, colorBlack, colorF6F6F6, validateColor, colorF0F0F0, color0F0F0F, colorB0B0C3, colorRed, colorGray, colorBorder, priTxtColor, grayTxtColor, priBorderColor, sectionBgColor, touchBgColor, touchBorderColor, touchTxtolor } = THEME.colors;
const { latoBlack, jameelNooriNastaleeq, latoRegular, latoMedium, latoBold, latoSemiBold } = THEME.fonts;

const TextInputWithBottomBorder = ({
    label,
    placeHolder,
    onChangeText = () => { },
    inputStyle = {},
    rightIcon,
    onPressRight,
    leftText,
    inlineStyle,
    ...props
}) => {
    return (
        <View style={{ ...styles.inputStyle, ...inputStyle }}>
            <Text style={styles.labelTextStyle}>{label}</Text>
            <View style={styles.flexView}>
           
                <Text style={{fontSize:scale(24),color:colorBorder,fontFamily:latoBold}}>{leftText}</Text>
            
                <TextInput
                    placeholder={placeHolder}
                    style={{...styles.inlineStyle, ...inlineStyle}}
                    onChangeText={onChangeText}
                    {...props}
                />
                {!!rightIcon ? <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onPressRight}
                >
                    <Image style={{ tintColor: 'red' }} source={rightIcon} />
                </TouchableOpacity> : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputStyle: {
        borderBottomWidth: 2,
        borderBottomColor: '#82D69A',
        marginHorizontal:moderateScale(31),
    },
    inlineStyle: {
       
        marginLeft:moderateScale(50),
        paddingVertical: moderateVerticalScale(0),
        fontSize: scale(32),
        color: '#444444',
        flex:1,
        textAlign:'left',
    },
    labelTextStyle: {
        fontSize: scale(14),
    },
    flexView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default TextInputWithBottomBorder;
