import React, { useState, useContext, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Modal, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import { THEME } from '../../shared/theme';
import { GlobalContext } from '../../../context/GlobalState';
import ButtonComponent from '../buttonComp/ButtonComponent';
import BottomModal from './BottomModal';
import SmallButton from '../Button/SmallButton';
// import Modal from 'react-native-modal';

const deviceHeight = Dimensions.get("window").height;
const { color4E008A, color636363, colorE93434, colorBlack } = THEME.colors;
const { jameelNooriNastaleeq, latoRegular, latoBold, latoSemiBold, latoMedium } = THEME.fonts;
export default TermConditionBottomModal = ({
    showModal,
    onClose = () => { },
    title,
    heading,
    price,
    onModalClose,
    paragraph,
    titleTextStyle,
    headingTextStyle,
    priceStyle,
    paragraphStyle,
    ...props

}) => {


    const { t, i18n } = useTranslation();

    const styles = getStyles(i18n.language)
    return (
       <BottomModal onClose={onModalClose} draggable={true} visible={showModal}>

            <Text style={styles.titleTextStyle}>
                {title}
            </Text>

            <View style={styles.headingContainer}>
                <Text style={styles.headingTextStyle}>
                    {heading}
                </Text>

                <Text style={styles.priceStyle}>
                    Rs {price}
                </Text>
            </View>


            <Text style={styles.paragraphStyle}>
                {paragraph}
            </Text>

            <View style={styles.buttonContainer}>
                <SmallButton
                    title={t("confirm_term")}
                    onPress={onClose}
                />
            </View>

        </BottomModal>

    );
};

const getStyles = (language) => StyleSheet.create({

    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalView: {
        flex: 1,
        backgroundColor: '#000000AA',
        justifyContent: 'flex-end',
    },
    modalSubView: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        maxHeight: deviceHeight * 0.4,
        borderTopRightRadius: moderateScale(15),
        borderTopLeftRadius: moderateScale(15)
    },
    buttonContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: moderateVerticalScale(10),
        marginHorizontal: moderateScale(16),
        marginBottom:moderateVerticalScale(30),
    },
    titleTextStyle: {
        marginTop: moderateVerticalScale(30),
        fontFamily: language == "urdu" ? jameelNooriNastaleeq : latoBold,
        fontSize: language == "urdu" ? scale(32) : scale(18),
        color: colorBlack,
        textAlign: "center"
    },
    headingContainer: {
        marginTop: moderateVerticalScale(16),
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(32),
        flexDirection: language === 'urdu' ? 'row-reverse' : 'row'
    },
    headingTextStyle: {
        textAlign: 'center',
        fontFamily: language == "urdu" ? jameelNooriNastaleeq : latoMedium,
        fontSize: language == "urdu" ? scale(20) : scale(14),
        color: '#444444',

    },
    textAlignUrdu: {
        textAlign: 'right',
    },
    priceStyle: {
        fontSize: language == "urdu" ? scale(18) : scale(14),
        textAlign: 'center',
        fontFamily: latoRegular,
        color: color4E008A
    },
    paragraphStyle: {
        fontSize: language == "urdu" ? scale(20) : scale(12),
        fontFamily: language == "urdu" ? jameelNooriNastaleeq : latoRegular,
        color: colorE93434,
        marginVertical:language=="urdu" ? moderateVerticalScale(23): moderateVerticalScale(23),
        paddingHorizontal: moderateScale(32),
        textAlign: language === 'urdu' ? 'right' : 'left'
    },

});