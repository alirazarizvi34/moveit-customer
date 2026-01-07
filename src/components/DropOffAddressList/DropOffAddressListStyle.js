import { StyleSheet } from "react-native";
import {scale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { THEME } from "../../shared/theme";

const {jameelNooriNastaleeq,latoSemiBold} = THEME.fonts;

export const getStyles = (language) => StyleSheet.create({
    container: {
        flex: 1,
       },
       addressListView: {
        marginTop:moderateVerticalScale(25)
       },
       bottomButtonView: {
        justifyContent: 'flex-end',
        alignSelf: 'center',
        width: '100%',
        paddingHorizontal: moderateScale(27),
        marginBottom:moderateVerticalScale(10)
       },
       btnText: {
      fontSize: language === 'urdu' ? scale(16) : scale(20),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoSemiBold,
      },
})