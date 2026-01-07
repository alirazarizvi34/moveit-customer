import { StyleSheet } from "react-native";
import { THEME } from '../../shared/theme';

import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';

const {latoMedium, latoRegular } = THEME.fonts;
const {color797979} = THEME.colors;

export const getStyles = (language) => StyleSheet.create({
    itemImageView:{
        alignItems:'center',
        marginTop:moderateVerticalScale(2)
      },
      itemImage:{
        width:moderateScale(24),
        height:moderateScale(24),
        resizeMode:'contain'
      },
      itemDetailView:{
        paddingLeft:moderateScale(9)
      },
      itemContainer: {
        paddingVertical: 6,
        marginVertical: moderateVerticalScale(8),
        marginHorizontal: moderateScale(26),
        flexDirection:'row'
      },
      title: {
        fontSize: scale(16),
        fontFamily:latoMedium,
      },
      description: {
        fontSize:scale(12),
        fontFamily:latoRegular,
        marginTop:moderateVerticalScale(4),
        color:color797979,
        paddingRight:moderateScale(6),
      }
})