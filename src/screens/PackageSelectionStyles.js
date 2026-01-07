import { StyleSheet } from "react-native"
import { THEME } from '../shared/theme';
const {
    colorFFBE50,
    colorWhite,
    color4E008A,
    colorBorder,
    color0F0F0F,
    colorB0B0C3,
} = THEME.colors;
const { jameelNooriNastaleeq, latoRegular, latoMedium, latoBold } = THEME.fonts;
import {
    moderateScale,
    moderateVerticalScale,
    scale,
} from 'react-native-size-matters';
export const getStyles = (language) => StyleSheet.create({
    safeAreaContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    scrollSubContainerView:{flex:1},
    heading: {
        color: color0F0F0F,
        fontFamily: latoRegular,
        fontSize: scale(30),
        textAlign: 'center',
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginHorizontal: moderateScale(14),
        marginTop: moderateScale(20),
        marginBottom: moderateScale(13),
    },
})