import { StyleSheet } from 'react-native'

import { THEME } from '../../shared/theme'

import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'


const { jameelNooriNastaleeq, latoSemiBold, latoBold, latoMedium } = THEME.fonts
const { colorBlack } = THEME.colors
export const getStyles = (language) => StyleSheet.create({
    container: {
        paddingHorizontal: moderateScale(24),
        marginVertical: language == "urdu" ? moderateVerticalScale(18) : moderateVerticalScale(18)

    },
    buttonContainer: {
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
        marginTop: language == "urdu" ? moderateVerticalScale(38) : moderateVerticalScale(40),
        alignItems: "center"
    },
    vehicleDetails: {
    },
    headingView: {
        marginBottom: moderateVerticalScale(24)
    },
    valueText: {
        fontSize: language == "urdu" ? scale(16) : scale(14),
        width: moderateScale(144),
        textAlign: language == "urdu" ? "left" : "right",

    },
    vehicleLabel: {
        fontSize: language == "urdu" ? scale(18) : scale(14),
        fontFamily: language == "urdu" ? jameelNooriNastaleeq : latoMedium
    },
    vehicleDetailsHeading: {
        fontSize: language == "urdu" ? scale(32) : scale(18),
        textAlign: "center",
        fontFamily: language == "urdu" ? jameelNooriNastaleeq : latoBold,
        color: colorBlack
    },
    detailSubView: {
        flexDirection: language === 'urdu' ? 'row-reverse' : 'row',
        justifyContent: "space-between",
        marginVertical: moderateVerticalScale(6)
    }
})