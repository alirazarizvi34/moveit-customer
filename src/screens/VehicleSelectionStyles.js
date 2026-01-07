import {StyleSheet, Platform} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../shared/theme';

const {
  colorWhite,
  color4E008A,
  colorGray,
  grayTxtColor,
  color222222,
  color0359FF,
  colorE00303,
  colorDFDDDD,
} = THEME.colors;

const {
  jameelNooriNastaleeq,
  latoRegular,
  latoMedium,
  latoSemiBold,
  latoLight,
  latoBold,
} = THEME.fonts;
export const getStyles = language =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    selectVehicleView: {
      marginTop: moderateScale(25),
    },
    selectVehicleHeadingContainer: {
      marginBottom: moderateScale(10),
      alignItems: language === 'urdu' ? 'flex-end' : 'flex-start',
    },
    selectVehicleContainer: {
      marginVertical: moderateVerticalScale(10),
    },
    selectVehicleHeadingText: {
      color: color222222,
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoRegular,
      fontSize: scale(14),
    },
    selectVehicleHeading: {
      flex: 1,
      marginHorizontal: moderateScale(16),
    },
    heading: {
      color: color4E008A,
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoBold,
      fontSize: language == 'urdu' ? scale(24) : scale(18),
      lineHeight:
        language == 'urdu'
          ? moderateVerticalScale(32)
          : moderateVerticalScale(22),
      textAlign: language == 'urdu' ? 'right' : 'left',
      // textAlign: 'center',
    },
    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginHorizontal: moderateScale(14),
      // backgroundColor:"red",
      bottom:30 
      // marginBottom: moderateVerticalScale(10),
    },
    termsAndConditionTitle: {
      lineHeight:
        language === 'urdu'
          ? moderateVerticalScale(34)
          : moderateVerticalScale(22),
      fontSize: language === 'urdu' ? scale(24) : scale(18),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoSemiBold,
    },
    headingDescriptionContainer: {
      marginVertical: moderateVerticalScale(8),
    },
    headingDescriptionText: {
      fontSize: language == 'urdu' ? moderateScale(16) : moderateScale(14),
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoRegular,
      color: colorGray,
      textAlign: language == 'urdu' ? 'right' : 'left',
      lineHeight:
        language == 'urdu'
          ? moderateVerticalScale(20)
          : moderateVerticalScale(15),
    },
    termsAndConditionTitleText: {
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoBold,
      fontSize: language === 'urdu' ? scale(28) : scale(20),
      color: '#444444',
      lineHeight:
        language === 'urdu'
          ? moderateVerticalScale(35)
          : moderateVerticalScale(24),
      marginHorizontal: moderateScale(21),
    },
    termsAndConditionPrice: {
      lineHeight:
        language === 'urdu'
          ? moderateVerticalScale(34)
          : moderateVerticalScale(22),
      fontSize: language === 'urdu' ? scale(24) : scale(18),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoRegular,
    },
    termsAndConditionParagraph: {
      lineHeight:
        language === 'urdu'
          ? moderateVerticalScale(35)
          : moderateVerticalScale(19),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoRegular,
      fontSize: language === 'urdu' ? scale(18) : scale(16),
    },
    buttonIcon: {
      name: 'arrow-right',
      color: colorWhite,
      size: scale(30),
    },
    btnStyle: {
      backgroundColor: color4E008A,
    },
    btnText: {
      fontSize: language === 'urdu' ? scale(16) : scale(20),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoSemiBold,
    },
    switchText: {
      lineHeight:
        language === 'urdu'
          ? moderateVerticalScale(34)
          : moderateVerticalScale(18),
      fontSize: language === 'urdu' ? scale(20) : scale(14),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoRegular,
      textAlign: 'center',
      marginHorizontal: Platform.OS == 'ios' ? moderateScale(10) : 0,
    },
    switchContainer: {
      // flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: language === 'urdu' ? 'row-reverse' : 'row',
      marginVertical: moderateVerticalScale(10),
    },
    attachPictureTextContainer: {
      marginBottom: moderateScale(8),
      alignItems: language === 'urdu' ? 'flex-end' : 'flex-start',
    },
    attachPictureText: {
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoRegular,
      fontSize: language == 'urdu' ? scale(16) : scale(14),
      lineHeight:
        language == 'urdu'
          ? moderateVerticalScale(22)
          : moderateVerticalScale(15),
      color: color222222,
    },
    additionalImageContainer: {
      justifyContent: 'center',
      borderStyle: 'dashed',
      borderWidth: 1,
      // height: moderateScale(110),
      borderColor: 'rgba(78, 0, 138, 0.30)',
      borderRadius: moderateScale(8),
      alignItems: 'center',
    },
    additionalImageParentContainer: {
      borderStyle: 'dashed',
      borderWidth: 1,
      // height: moderateScale(110),
      borderColor: 'rgba(78, 0, 138, 0.30)',
      borderRadius: moderateScale(8),
    },
    emptyPicturesContainer: {
      // backgroundColor: "red",
      justifyContent: 'center',
      alignContent: 'center',
      // backgroundColor:"red",
      alignItems: 'center',
    },
    imageListParent: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: moderateVerticalScale(9),
    },
    uploadMessageContainer: {
      marginBottom: moderateVerticalScale(9),
    },
    attachTextButton: {
      flexDirection: 'row',
      marginVertical: moderateVerticalScale(9),
    },
    attachMediaText: {
      fontSize: scale(10),
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoMedium,
      textDecorationLine: 'underline',
      color: color0359FF,
    },
    noImageContainer: {
      height: moderateScale(70),
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      width: '100%',
      // backgroundColor:"red"
    },
    attachIcon: {
      height: scale(14),
      width: scale(14),
      tintColor: color0359FF,
    },
    starText: {
      color: colorE00303,
    },
    uploadMessage: {
      fontSize: scale(8),
      color: grayTxtColor,
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoMedium,
      textAlign: 'center',
    },
    attachButtonContainer: {
      // paddingRight: moderateScale(5)
      // backgroundColor:"red"
    },
    plusIcon: {
      width: moderateScale(25),
      height: moderateScale(25),
    },
    attachButton: {
      // backgroundColor: colorWhite,
      backgroundColor: colorDFDDDD,
      width: moderateScale(50),
      marginHorizontal: moderateScale(10),
      height: moderateScale(50),
      borderRadius: moderateScale(8),
      // borderWidth: moderateScale(1),
      // borderColor: color4E008A,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageListContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingVertical: moderateScale(5),
      alignContent: 'center',
      // alignItems: 'flex-start',
    },
    additonalMediaContainer: {
      marginVertical: moderateVerticalScale(10),
    },
    addtionalMessageTextContainer: {},
    additionalDetailText: {
      fontSize:language=="urdu"?scale(20): scale(14),
      lineHeight:language=="urdu"?moderateVerticalScale(28):moderateVerticalScale(15),
      color: color222222,
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoRegular,
      textAlign: language == 'urdu' ? 'right' : 'left',
    },
    addtionalDetailInputContainer: {
      marginTop: moderateVerticalScale(9),
      marginBottom:moderateVerticalScale(30)

    },
    uploadMessageError:{
      color:"red",
      marginVertical:moderateVerticalScale(5),
      fontSize:language=="urdu"?scale(18): scale(12),
      lineHeight:language=="urdu"?moderateVerticalScale(28):moderateVerticalScale(15),
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoSemiBold,
      textAlign: language == 'urdu' ? 'right' : 'left',
    }
  });
