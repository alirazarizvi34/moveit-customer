import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { THEME } from '../../shared/theme';
const { color0F0F0F } = THEME.colors
const { jameelNooriNastaleeq, latoRegular } = THEME.fonts

const TextViewComponent = ({
    text,
    color = color0F0F0F,
    fontSize = 18,
    style,
    fontFamily = latoRegular,
    onPress
}) => {
    const { t, i18n } = useTranslation();
    return (
        //i18n.language === 'urdu' ? 'row-reverse' : 'row'
        <Text
            onPress={onPress}
            style={[
                {
                    color: color,
                    fontSize: fontSize,
                    fontFamily: 
                    i18n.language === 'urdu' ?
                        jameelNooriNastaleeq : fontFamily
                }, style]}>
            {text}
        </Text>
    )
}

export default TextViewComponent
