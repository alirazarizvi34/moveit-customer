import { StyleSheet } from "react-native";
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';


export const getStyles = (language) => StyleSheet.create({
    container: {
        flex: 1,
      },
      inputView: {
        marginTop: moderateVerticalScale(26),
        marginLeft:moderateScale(25),
        marginRight:moderateScale(10)
      },
})