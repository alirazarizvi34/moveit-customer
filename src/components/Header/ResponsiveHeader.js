import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Block, Text } from 'galio-framework';
import { AppStyle } from '../../styles/AppStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import { THEME } from '../../shared/theme';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';

const { latoBlack, jameelNooriNastaleeq } = THEME.fonts;
const { colorFFBE50, colorWhite, color4E008A, colorBlack, colorF6F6F6, validateColor, colorF0F0F0, colorBorder } = THEME.colors;


const ResponsiveHeader = ({
    title,
    titleStyle = {},
    ...props
}) => {

    const goBack = () => {
        props.navigation.goBack();
    }
    return (
        <View style={styles.mainContainer} >

            {props?.navigation &&
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => { goBack() }}>
                        <View style={styles.iconView}>
                            <Icon name="keyboard-arrow-left" size={40} color={color4E008A} />
                        </View>
                    </TouchableOpacity>

                </View>
            }


            <View style={styles.titleContainer}>
                <Text style={{ ...styles.titleStyle, ...titleStyle }}> {title} </Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        paddingHorizontal: moderateScale(12),
        backgroundColor: colorWhite,
        height: moderateScale(78),
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1.25,
        shadowRadius: 3.84,
        elevation: 15,
    },
    iconContainer: {
        justifyContent: "center"
    },
    iconView: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorFFBE50,
        width: scale(54),
        height: scale(50),
        borderRadius: moderateScale(10),
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    titleContainer: {
        flex: 1.3,
        alignItems: "center",
        justifyContent: "center"

    },
    titleStyle: {
        // fontSize: scale(20),
        // fontSize: i18n.language === 'urdu' ? scale(24) : scale(20),
        fontFamily: latoBlack,
        // fontFamily: i18n.language === 'urdu' ? jameelNooriNastaleeq : latoBlack, 
        color: colorBlack,
    }

});

export default ResponsiveHeader;