import React, { useState, useContext, useEffect } from 'react';
import { View, SafeAreaView, Modal, ActivityIndicator, Text, BackHandler, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { THEME } from '../../shared/theme';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

const { colorFFBE50, colorWhite, color4E008A, colorBlack, color575757, colorF6F6F6, color646464, validateColor, colorF0F0F0, color0F0F0F, colorB0B0C3, colorRed } = THEME.colors;
const { latoBlack, jameelNooriNastaleeq, latoRegular, latoMedium } = THEME.fonts;

const TextModal = ({
    closeButton,
    isModalVisible,
    message,
    title,
    modalContainerStyle,
    modalViewStyle,
    modalHeaderViewStyle,
    modalHeaderTextViewStyle,
    modalHeaderTextStyle,
    modalHeaderButtonViewStyle,
    modalHorizontalLineViewStyle,
    modalHorizontalLineStyle,
    modalMessageViewStyle,
    modalMessageStyle,
    onPress = () => { },
}) => {
    return (

        <Modal
            transparent={true}
            visible={isModalVisible}
        >
            <View style={{ ...styles.modalContainerStyle, ...modalContainerStyle }}>
                <View style={{ ...styles.modalViewStyle, ...modalViewStyle }}>

                    <View style={{ ...styles.modalHeaderViewStyle, ...modalHeaderViewStyle }}>
                        <View style={{ ...styles.modalHeaderTextViewStyle, ...modalHeaderTextViewStyle }}>
                            <Text
                                style={{ ...styles.modalHeaderTextStyle, ...modalHeaderTextStyle }}>
                                {title}
                            </Text>
                        </View>

                        {closeButton &&
                            <TouchableOpacity onPress={onPress}>
                                <View style={{ ...styles.modalHeaderButtonViewStyle, ...modalHeaderButtonViewStyle }}>
                                    <IconMaterial name={'close'} size={scale(18)} color={color575757} />
                                </View>
                            </TouchableOpacity>
                        }

                    </View>

                    <View style={{ ...styles.modalHorizontalLineViewStyle, ...modalHorizontalLineViewStyle }}>
                        <View style={{ ...styles.modalHorizontalLineStyle, ...modalHorizontalLineStyle }} />
                    </View>

                    <View style={{ ...styles.modalMessageViewStyle, ...modalMessageViewStyle }}>
                        <Text
                            style={{ ...styles.modalMessageStyle, ...modalMessageStyle }}>
                            {message}
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>

    )
}

const styles = StyleSheet.create({
    modalContainerStyle: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    modalViewStyle: {
        marginTop: moderateScale(49),
        paddingTop: moderateScale(12),
        marginHorizontal: moderateScale(16),
        backgroundColor: colorWhite,
        borderRadius: moderateScale(20),
        paddingHorizontal: moderateScale(10),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },
    modalHeaderViewStyle: {
        flexDirection: 'row',
        alignItems: "center"
    },
    modalHeaderTextViewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalHeaderTextStyle: {
        fontSize: scale(16),
        color: color0F0F0F,
        fontFamily: latoRegular
    },
    modalHeaderButtonViewStyle: {
        width: moderateScale(20),
        height: moderateScale(20),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(2),
        borderWidth: 0.5,
    },
    modalHorizontalLineViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: moderateVerticalScale(10)
    },
    modalHorizontalLineStyle: {
        flex: 1,
        height: moderateScale(1.5),
        backgroundColor: colorF6F6F6
    },
    modalMessageViewStyle: {
        marginBottom: moderateVerticalScale(24)
    },
    modalMessageStyle: {
        fontSize: scale(12),
        color: color646464,
        fontFamily: latoRegular
    }


})

export default TextModal