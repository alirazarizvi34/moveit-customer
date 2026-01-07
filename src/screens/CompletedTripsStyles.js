import { StyleSheet } from "react-native";
import {THEME} from '../shared/theme'
import { moderateScale } from "react-native-size-matters";

const {colorWhite} = THEME.colors
export const getStyles = (language) => StyleSheet.create({
    container: {
        backgroundColor: colorWhite,
        flex: 1,
        paddingHorizontal:moderateScale(22),
        paddingTop: 20,
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