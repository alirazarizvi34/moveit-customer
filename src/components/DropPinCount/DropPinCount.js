import { View, Text, StyleSheet,ImageBackground } from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import { THEME } from '../../shared/theme'
import { AppImages } from '../../constants/AppImages'
const { latoBold } = THEME.fonts
const { colorFFBE50 } = THEME.colors
const DropPinCount = ({ number,style, textStyle }) => {
    return (
        <ImageBackground style={style??styles.dropIcon} resizeMode="contain" source={AppImages.dropoffSimple} >
            <Text style={textStyle??styles.dropText}>{number}</Text>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    dropIcon: {
        height: moderateVerticalScale(17),
        width: moderateScale(17),
        alignContent: "center",
        // backgroundColor: "red",
        alignItems: "center"
    },
    dropText: {
        fontSize: scale(6),
        zIndex: 99,
        fontFamily: latoBold,
        color: colorFFBE50,
    }
})
export default DropPinCount


