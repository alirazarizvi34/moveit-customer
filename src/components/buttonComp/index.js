import React from 'react';
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import IconComponent from '../iconComp';
import { THEME } from '../../shared/theme';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import { AppConstants } from '../../constants/AppConstants';
const { colorWhite, color4E008A, colorF0F0F0, colorC1C1C1 } = THEME.colors
const { jameelNooriNastaleeq, latoBlack } = THEME.fonts
const ButtonComponent = ({
    text,
    disabled = true,
    icon,
    pressStatus,
    disabledIconColor = colorC1C1C1,
    btnStyle,
    textStyle,
    onPress = () => { },
}) => {
    const { t, i18n } = useTranslation();
    return (
        <TouchableOpacity
            disabled={disabled || pressStatus}
            onPress={onPress}
            style={{...styles.btnStyle, ...btnStyle}}
            activeOpacity={AppConstants.buttonActiveOpacity}
        >
            {icon &&
                <>
                    {pressStatus ? (
                        <ActivityIndicator size="large" color="#FFF" style={{ padding: 3 }} />
                    ) : (
                        <IconComponent
                            name={icon?.name}
                            size={icon?.size}
                            color={disabled ? disabledIconColor : icon.color} />
                    )}
                </>
            }
            {text &&
                <>
                    {pressStatus ? (
                        <ActivityIndicator size="large" color="#FFF" style={{ padding: 3 }} />
                    ) : (
                        <Text style={{...styles.textStyle, ...textStyle}}>
                            {text}
                        </Text>
                    )}
                </>
            }
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    btnStyle: {
        height: moderateScale(140),
        backgroundColor: color4E008A,
        alignItems: "center",
        justifyContent: "center",
    },
    textStyle: {
        fontFamily: latoBlack,
        color: colorWhite,
    },
    disableBtnStyle: {
        backgroundColor: color4E008A,
        borderRadius: 12,
        padding: 15,
    },
})
export default ButtonComponent