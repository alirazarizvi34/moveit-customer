import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { THEME } from '../../../../shared/theme';
import { colorTheme } from '../../../../constants/ColorConstants';

const {defaultText,darkGrayText,darkGrayBorder,defaultBorder,errorText,secondaryBorder,defaultBackground} = colorTheme;
const {
  latoSemiBold,
  latoBold,
  jameelNooriNastaleeq,
  latoMedium,
  latoRegular
} = THEME.fonts;
export const getStyles = ({language}) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    containerView: {
      flex: 1,
    },
    headerStyles: {
      fontSize: language === 'urdu' ? scale(35) : scale(20),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoSemiBold,
      paddingTop:
        Platform.OS === 'ios'
          ? moderateVerticalScale(5)
          : moderateVerticalScale(0),
    },
    view: {
      flex: 1,
      marginHorizontal: moderateScale(11),
    },
    address: {
      fontSize: scale(12),
      fontFamily: latoBold,
      color: defaultText,
    },
    inpuTextView: {
      marginTop: moderateVerticalScale(10),
    },
    errorText: {
      fontSize: scale(12),
      color: errorText,
      paddingTop: moderateScale(6),
      fontFamily: latoRegular,
  },
    TextInput: {
      height: moderateScale(90),
      textAlignVertical: 'top',
      borderWidth: 1,
      borderRadius: 8,
      borderColor: darkGrayBorder,
      paddingBottom: moderateVerticalScale(0),
      paddingHorizontal: moderateScale(11),
      color: defaultText
    },
    propertyTypeView: {
      flex: 1,
      marginHorizontal: moderateScale(22),
    },
    propertyTypesView: {
      flex: 1,
      paddingTop: moderateVerticalScale(22),
      paddingHorizontal:moderateScale(11),
    },
    propertyTypes: {
      fontSize: scale(12),
      fontFamily: latoBold,
      color: defaultText,
    },
    propertyTypesSubTitle: {
      fontSize: scale(10),
      fontFamily: latoMedium,
      marginTop: moderateVerticalScale(4),
      color: darkGrayText,
    },
    horizontalLineView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: moderateVerticalScale(20),
      marginHorizontal: moderateScale(19),
    },
    horizontalLine: {
      flex: 1,
      height: moderateScale(1),
      backgroundColor: defaultBorder,
    },
    btnTextStyle: {
      fontSize: scale(20),
      fontFamily: latoSemiBold,
      textAlign: 'center',
    },
    segmentTabView: {
      marginHorizontal: moderateScale(30),
      marginTop: moderateVerticalScale(25),
      marginBottom: moderateVerticalScale(32),
    },
    flatListContainer: {
      marginTop: moderateVerticalScale(8),
      alignItems:'center',
    },
    butonContainer: {
      marginVertical: moderateVerticalScale(10),
      paddingHorizontal: moderateVerticalScale(22),
    },
    addressListContainer: {
      paddingHorizontal:moderateScale(11),
      paddingVertical:moderateVerticalScale(7),
    },
    toolTipAddressListContainer: {
      width: '100%',
      borderRadius: 8,
      borderWidth: 2,
      borderColor: secondaryBorder,
      // paddingVertical:moderateVerticalScale(10),
      backgroundColor: defaultBackground,
    },
  });
