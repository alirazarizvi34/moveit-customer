import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';


import { THEME } from '../shared/theme';
const { colorWhite, colorEAA524, colorCircle } = THEME.colors;
const { jameelNooriNastaleeq, latoRegular, latoBold } = THEME.fonts;


export const getStyles = (language) => StyleSheet.create({
    container: {
        backgroundColor: colorWhite,
        flex: 1,
        paddingHorizontal:moderateScale(20),
        paddingTop: 20,
    },
    mainContainer: {
        marginVertical: moderateVerticalScale(20),
        marginHorizontal: moderateScale(16),
    },
    mainView: {
        backgroundColor: '#fff',
        paddingHorizontal: moderateScale(20),
        borderRadius: moderateScale(10),
    },
    rideDateView: {
        paddingHorizontal: moderateScale(20),
        paddingTop: moderateScale(10)
    },
    rideDateTitle: {
        fontWeight: 'bold',
        color: colorEAA524,
        textTransform: 'uppercase',
    },
    rideDateShow: {
        fontWeight: 'bold',
        fontSize: scale(14),
        color: colorCircle
    },
    trip: {
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        marginHorizontal: 15,
        borderRadius: 12,
        height: 300,
        shadowColor: '#000',
        shadowOpacity: 0.56,
        shadowOffset: { height: 5, width: 6 },
        elevation: 7,
        shadowRadius: 5,
    },
})