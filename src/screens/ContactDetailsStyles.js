import { StyleSheet } from 'react-native'
import {
    moderateScale,
    moderateVerticalScale,
    scale,
} from 'react-native-size-matters';


import { THEME } from '../shared/theme';
import { colorTheme } from '../constants/ColorConstants';

const {
    colorFFBE50,
    colorWhite,
    color4E008A,
    validateColor,
    colorF0F0F0,
    color0F0F0F,
    colorBorder,
    colorBlack,
    color222222,
    color444444,
    color646464,
    colorGray,
    colorFDFAFF
} = THEME.colors;
const {primaryText,darkGrayText} = colorTheme;
const { jameelNooriNastaleeq,latoHeavy, latoRegular, latoSemiBold, latoMedium,latoBold } = THEME.fonts;

export const getStyles = (language, error, touched) => StyleSheet.create({
    safeAreaContainer: {
        flex: 1
    },
    heading: {
        color: colorBlack,
        fontFamily: language == "urdu" ? jameelNooriNastaleeq : latoBold,
        fontSize: language == "urdu" ? scale(20) : scale(16),
        textAlign: language == "urdu" ? "right" : "left",
    },
    subHeadingContainer: {
        flexDirection: language == "urdu" ? "row-reverse" : "row",
        fontSize: language == "urdu" ? scale(13) : scale(14),
        color: color222222,
        fontFamily: language == "urdu" ? jameelNooriNastaleeq : latoBold
    },
    label: {
        color: darkGrayText,
        fontSize: language == "urdu" ? scale(20) : scale(16),
        fontFamily: language == "urdu" ? jameelNooriNastaleeq : latoMedium

    },
    subHeading: {
        color: color222222,
        fontSize: scale(14),
        fontFamily: language == "urdu" ? jameelNooriNastaleeq : latoRegular
    },
    subHeadingValue: {
        marginLeft: moderateScale(10),
        fontFamily: latoHeavy,
        fontSize:scale(14),
        color: primaryText
    },
    subContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    innerContainer: {
        flex: 1,
        marginHorizontal: moderateScale(12),
    },
    vehicleHeadingContainer: {
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection: language === 'urdu' ? 'row-reverse' :'row',
        marginTop: moderateVerticalScale(10),
    },
    scrollContainer: {
        flex: 1,
        marginVertical: moderateVerticalScale(19),
    },
    inputView: {
        // flex:1,
        // marginVertical: moderateVerticalScale(20),
        // backgroundColor: "green"
    },
    errorText: {
        fontSize: scale(12),
        color: validateColor,
        paddingTop: moderateScale(6),
        fontFamily: language === 'urdu'
            ? jameelNooriNastaleeq
            : latoRegular,
        alignSelf:
            language === 'urdu' ? 'flex-end' : null,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: moderateVerticalScale(5),
        marginBottom: moderateVerticalScale(28),
    },
    detailsContainer: {
        marginBottom:
            error?.senderName && touched?.senderName
                ? moderateScale(25)
                : moderateScale(10),
    },
    senderContainer: {
        flexDirection: language === 'urdu' ? 'row-reverse' :'row',
        marginBottom: moderateScale(11),
        marginTop:moderateVerticalScale(9),
        alignItems:'center'
        // alignItems: language === 'urdu'
        //     ? 'flex-end'
        //     : 'flex-start',
    },
    receiverContainer: {
        flexDirection: language === 'urdu' ? 'row-reverse' :'row',
        // marginBottom: moderateScale(11),
        marginTop:moderateVerticalScale(9),
        alignItems:'center'
        // alignItems: language === 'urdu'
        //     ? 'flex-end'
        //     : 'flex-start',
    },
    inputStyles: {
        backgroundColor: colorWhite,

    },
    senderNameInputStyles: {
        backgroundColor: colorWhite,
        borderColor: error?.senderName && touched?.senderName
            ? validateColor
            : colorBorder,
    },
    senderContactInputStyles: {
        backgroundColor: colorWhite,
        borderColor: error?.senderContactNo && touched?.senderContactNo
            ? validateColor
            : colorBorder,
    },
    recieverDetailsText: {
        color: darkGrayText,
        fontFamily: language === 'urdu'
            ? jameelNooriNastaleeq
            : latoSemiBold,
        fontSize: language == "urdu" ? scale(20) : scale(16),
        alignSelf: language === 'urdu'
            ? 'flex-end'
            : 'flex-start',
    },
    nameInputStyles: {
        backgroundColor: colorWhite,
        borderColor: error?.name && touched?.name
            ? validateColor
            : colorBorder,
    },
    contactNoinputStyles: {
        backgroundColor: colorWhite,
        borderColor: error?.contactNo && touched?.contactNo
            ? validateColor
            : colorBorder,
    },
    btnStyle: {
        backgroundColor: color4E008A,
        // borderWidth: moderateScale(1.5),
        // borderColor: color4E008A,
    },
    btnTextStyles: {
        fontSize: scale(20),
        fontFamily: language === 'urdu'
            ? jameelNooriNastaleeq
            : latoBold,
        textAlign: 'center',
        color: colorWhite,
    },
    biddingTextStyle: {
        fontFamily: language === 'urdu'
            ? jameelNooriNastaleeq
            : latoSemiBold,
        fontSize: language === 'urdu' ? scale(24) : scale(18),
        color: '#444444',
        lineHeight: language === 'urdu'
            ? moderateVerticalScale(34)
            : moderateVerticalScale(22),
    },
    nameInputContainer: {
        marginVertical: moderateVerticalScale(10)
    },
    reciverContainer: {
        // marginTop: moderateScale(20)
    },
    detailsHeadingContainer: {
        marginVertical: moderateVerticalScale(10),
    },
    detailsHeading: {
        fontSize: language == "urdu" ? scale(20) : scale(16),
        fontFamily: language == "urdu" ? jameelNooriNastaleeq : latoBold,
        textAlign:language=="urdu"?"right":"left"
    },
    addressDetailContainer: {
        marginVertical: moderateVerticalScale(5),
        height: moderateVerticalScale(147),
        borderWidth: 1,
        backgroundColor:colorFDFAFF,
        borderRadius: moderateScale(8),
        borderColor: color4E008A,
        paddingHorizontal: moderateScale(17)
    },
    addressDetailsSubContainer: {
        flexDirection: language == "urdu" ? "row-reverse" : "row",
        textAlign: language == "urdu" ? "right" : "left",
        justifyContent: "space-between",
        marginVertical: moderateVerticalScale(10),
    },
    addressLabelView: {
        flex:1
    },
    addressLabel: {
        color: color646464,
        textAlign: language == "urdu" ? "right" : "left",
        fontSize: scale(12),
        fontFamily: language == "urdu" ? jameelNooriNastaleeq : latoRegular,
    },
    addressValue: {
        flex:2.5,
        color: color0F0F0F,
        fontFamily: language == "urdu" ? jameelNooriNastaleeq : latoRegular,
        fontSize: language == "urdu" ? scale(10) : scale(12),
    },
    estimatedFareContainer: {
        paddingVertical: moderateVerticalScale(10),
        flexDirection: language == "urdu" ? "row-reverse" : "row",
        justifyContent: "space-between",
        paddingHorizontal: moderateScale(15),
        borderTopColor:colorGray,
        borderTopWidth:1,
        alignItems:"center",
        
    },
    estimatedLabel:{
        fontSize:language=="urdu"?scale(20):scale(16),
        color:color444444,
        fontFamily:language=="urdu"?jameelNooriNastaleeq:latoRegular,
        lineHeight:language=="urdu"? moderateVerticalScale(28):moderateVerticalScale(18)

    },
    estimatedValue:{
        fontFamily:latoBold,
        color:color4E008A,
        fontSize:language=="urdu"?scale(20):scale(18),
    },
    estimatedInnerValue: {
        fontSize:scale(10),
        fontFamily:latoMedium,
        color:colorBlack,
        textDecorationLine:'line-through',
        marginTop:moderateVerticalScale(6)

    }
})