import { StyleSheet } from 'react-native'
import { moderateVerticalScale, scale } from 'react-native-size-matters'

import { THEME } from '../../shared/theme'

const { colorGray } = THEME.colors
const { latoSemiBold } = THEME.fonts
export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        alignContent: "center"
    },
    noTrip: {
        height: 224,
    },
    messageText: {
        fontFamily: latoSemiBold,
        color: colorGray,
        fontSize: scale(16),
        marginTop: moderateVerticalScale(55)
    }

})