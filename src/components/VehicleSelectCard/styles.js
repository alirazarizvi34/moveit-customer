import { StyleSheet } from 'react-native'
import {
    moderateScale,
    moderateVerticalScale,
    scale,
} from 'react-native-size-matters';

import { THEME } from '../../shared/theme';

const {
    color0F0F0F,
    colorGray,
    colorCCC,
    color4E008A,
    colorF6F6F6,
    colorFFBE40
} = THEME.colors;

const { latoRegular } = THEME.fonts;
export const getStyles = (getIndexChecked, vehicle) => StyleSheet.create({
    container: {
        flex: 1,
        // borderWidth: moderateScale(1.5),
        marginRight: moderateScale(5),
        backgroundColor: getIndexChecked?.indexChecked ===
            vehicle?.item?.id
            ? colorFFBE40 : colorF6F6F6,
        borderRadius: moderateScale(8),
        height: moderateScale(110),
        width: moderateScale(150)
    },
    checkImage: {
        zIndex: 9999999,
        position: 'absolute',
        right: moderateScale(4),
        top: moderateScale(4),
        width: moderateScale(21),
        tintColor: getIndexChecked?.indexChecked ===
            vehicle?.item?.id
            ? color4E008A : colorCCC,
        height: moderateScale(21),
    },
    truckImage: {
        // borderRadius: moderateScale(14),
        // width: moderateScale(93),
        // aspectRatio:"auto",
        height: moderateScale(53),
        flexShrink: 0,
        width: "100%",
    },
    truckHeading: {
        fontWeight: '400',
        alignSelf: 'center',
        fontSize: scale(14),
        // paddingBottom: moderateScale(1.5),
        paddingVertical: moderateScale(9),
        fontFamily: latoRegular,
        color:
            getIndexChecked?.indexChecked ===
                vehicle?.item?.id
                ? color4E008A
                : colorCCC,
    }
})