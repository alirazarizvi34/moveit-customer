import { Platform, StyleSheet } from "react-native";
import { THEME } from '../../shared/theme';
import {scale, moderateScale} from 'react-native-size-matters';
import { colorTheme } from "../../constants/ColorConstants";

const {colorWhite,colorBlack} = THEME.colors;
const {latoMedium} = THEME.fonts;
const {primaryText, errorText,infoText} = colorTheme;

export const getStyles = (bgColor,hasBorder,borderRadius,borderShadow,borderColor) => StyleSheet.create({
    mainInputStyle: {
        flexDirection: 'row',
        backgroundColor: bgColor ? bgColor : colorWhite,
        borderRadius: borderRadius ? borderRadius : 12,
        alignSelf: 'center',
        alignItems: 'center',
        borderColor: borderColor ? borderColor : '#D2B9E0',
        borderWidth: hasBorder ? 1 : 0,
        paddingHorizontal:moderateScale(10),

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: borderShadow ? 0.27 : 0,
      shadowRadius: borderShadow ? 4.65 : 0,
      elevation: borderShadow ? 5 : 0,
        
      },
      textInputStyle: {
        height:moderateScale(49),
        flex:1,
        color: colorBlack,
        marginHorizontal:Platform.OS === 'ios' ? moderateScale(5) : moderateScale(0),
        fontSize: scale(14),
        // backgroundColor:'red'
      },
      textRight: {
        fontSize: scale(12),
        fontFamily: latoMedium,
        color: infoText
      },
      imageIcon: {
        width: moderateScale(21),
        height: moderateScale(21),
        
        // resizeMode:'center',
        // backgroundColor:'red'
      },
      imageIconView: {
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
      },
      textRightView:{
        justifyContent:'center',
        alignItems:'center',
        height: moderateScale(30),
      }
      
})