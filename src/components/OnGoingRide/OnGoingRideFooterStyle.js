import {StyleSheet} from 'react-native';
import {THEME} from '../../shared/theme';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

const {latoRegular, latoSemiBold, latoBold} = THEME.fonts;
const {grayTxtColor, colorBlack, sectionBgColor, BorderColor, color0359FF} =
  THEME.colors;

export const getStyles = language =>
  StyleSheet.create({
    bottomContainer: {
      paddingHorizontal: moderateScale(34),
      paddingTop: moderateVerticalScale(16),
      paddingBottom: moderateScale(26),
      backgroundColor: sectionBgColor,
    },
    profileMainContainer: {
      flexDirection: 'row',
    },
    profileImage: {
      height: moderateScale(60),
      width: moderateScale(60),
      borderRadius: moderateScale(50),
      borderWidth: 3,
      borderColor: BorderColor,
    },
    profileContainer: {
      flex: 1,
      marginTop: moderateScale(0),
      marginLeft: moderateScale(9),
      justifyContent: 'center',
    },
    profileView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    profileName: {
      fontSize: scale(14),
      color: colorBlack,
      fontFamily: latoBold,
    },
    ratingView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rating: {
      fontSize: scale(14),
      fontFamily: latoRegular,
      color: grayTxtColor,
      marginLeft: moderateScale(2),
    },
    reviewsCount: {
      fontSize: scale(10),
      fontFamily: latoRegular,
      color: grayTxtColor,
      marginLeft: moderateScale(4),
      alignSelf: 'flex-end',
    },
    contactInfoView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: moderateVerticalScale(2),
    },
    phoneImage: {
      height: moderateScale(14),
      width: moderateScale(14),
    },
    phoneNo: {
      marginHorizontal: 8,
      textDecorationLine: 'underline',
      color: color0359FF,
    },
    vehicleInfoContainer: {
      flexDirection: 'row',
    },
    vehicleInfoView: {
      flex: 1,
      flexDirection: 'row',
      paddingLeft: moderateScale(15),
      alignItems: 'center',
    },
    vehicleType: {
      fontSize: scale(12),
      fontFamily: latoSemiBold,
      color: grayTxtColor,
    },
    verticleLine: {
      height: moderateScale(15),
      width: moderateScale(1),
      backgroundColor: grayTxtColor,
      marginHorizontal: moderateScale(30),
    },
    vehicleNo: {
      fontSize: scale(12),
      fontFamily: latoSemiBold,
      color: grayTxtColor,
    },
    vehicleImageView: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    vehicleImage: {
      height: moderateScale(56),
      width: moderateScale(106),
    },
  });
