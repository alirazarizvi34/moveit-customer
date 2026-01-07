import {Platform, StyleSheet} from 'react-native';
import {THEME} from '../../shared/theme';

import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {colorTheme} from '../../constants/ColorConstants';

const {jameelNooriNastaleeq, latoRegular, latoBold, latoSemiBold, latoHeavy} =
  THEME.fonts;
const {
  PriButtonBgColor,
  color4E008A,
  sectionBgColor,
  colorFFBE50,
  colorWhite,
  color979797,
} = THEME.colors;
const {defaultBackground,whiteText,secondaryBorder,stepsBackground, disableBackground} = colorTheme;

export const getStyles = language =>
  StyleSheet.create({
    safeAreaView: {
      flex: 1,
    },
    conainer: {
      flex: 1,
    },
    headerContainer: {
      display: 'flex',
      width: '100%',
      position: 'absolute',
      borderRadius: moderateScale(10),
      justifyContent: 'center',
    },
    inputContainer: {
      marginTop:moderateVerticalScale(15),
      // marginHorizontal: moderateScale(22),
      marginHorizontal: moderateScale(16),
    },
    currentMarkerView: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    currentMarkerInputArea: {
      width: moderateScale(100),
      height: moderateScale(40),
    },
    currentMarkerInputText: {
      fontSize: scale(12),
      fontFamily:latoSemiBold,
      color: whiteText,
      textAlign: 'center',
      paddingTop: moderateVerticalScale(6),
      paddingHorizontal:5
    },
    gpsButtonView: {
      display: 'flex',
      width: moderateScale(42),
      height: moderateScale(42),
      position: 'absolute',
      backgroundColor: defaultBackground,
      borderRadius: moderateScale(10),
      bottom: moderateScale(100),
      justifyContent: 'center',
      right: moderateScale(0),
      marginHorizontal: moderateScale(22),
      shadowColor: 'rgba(0,0,0,0.90)',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.28,
      shadowRadius: 4,
      elevation: 4,
    },
    gpsButton: {
      alignSelf: 'center',
    },
    locationPin: {
      width: moderateScale(30),
      height: moderateScale(30),
    },
    markerImage: {
      width: moderateScale(36),
      height: moderateScale(36),
    },
    inputView: {
      position: 'absolute',
      display: 'flex',
      bottom: moderateScale(100),
      justifyContent: 'center',
      alignSelf: 'center',
      paddingHorizontal: moderateScale(17),
      width: '100%',
    },
    buttonView: {
      position: 'absolute',
      display: 'flex',
      bottom: moderateScale(30),
      justifyContent: 'center',
      alignSelf: 'center',
      width: '100%',
      paddingHorizontal: moderateScale(22),
    },
    headerView: {
      width: moderateScale(42),
      height: moderateScale(42),
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputBgColor: {
      backgroundColor: sectionBgColor,
    },
    googleMarkersView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    dropOffPin: {
      width: 24,
      height: 40,
    },
    moverView: {
      left: '50%',
      marginLeft: -35,
      marginTop: -62,
      position: 'absolute',
      top: '50%',
      alignItems:'center',
    },
    dropPinCountTxt: {
      top: moderateVerticalScale(4),
      position: 'absolute',
      fontSize: scale(10),
      color: colorFFBE50,
      alignItems: 'center',
      fontFamily: latoHeavy,
    },
    dropPinCountView: {
      width: 24,
      height: 40,
      alignContent: 'center',
      alignItems: 'center',
    },
    btnTextStyles: {
      fontSize: language === 'urdu' ? scale(16) : scale(20),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoSemiBold,
      textAlign: 'center',
      color: colorWhite,
    },
    disableBtnTextStyles: {
      fontSize: language === 'urdu' ? scale(16) : scale(20),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoSemiBold,
      textAlign: 'center',
      color: color979797,
    },
    ProgressContainer:{
      paddingVertical:moderateVerticalScale(15),
      backgroundColor:stepsBackground,
      borderBottomRightRadius:moderateScale(8),
      borderBottomLeftRadius:moderateScale(8),
       // iOS shadow properties
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.18,
        shadowRadius: 4,
      },
      android: {
        elevation: 12,
        shadowColor: '#000000',
      },
    }),
    },
  });
