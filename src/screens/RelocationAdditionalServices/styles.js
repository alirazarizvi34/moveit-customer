import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import {colorTheme} from '../../constants/ColorConstants';

const {
  primaryText,
  darkGrayText,
  disableBackground,
  drawerPinkBackground,
  darkGrayBorder,
  defaultText,
  primaryBackground,
  lightPurpleBackground,
  stepsBackground,
  secondaryBorder,
  defaultBackground,
  defaultBorder,
  whiteText
} = colorTheme;
const {latoSemiBold, latoRegular, latoBold, latoHeavy} = THEME.fonts;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingTop: moderateScale(25),
    marginHorizontal: moderateScale(31),
  },
  headingContainer: {
    paddingHorizontal: moderateScale(10),
    paddingTop: moderateScale(12),
  },
  heading: {
    fontSize: scale(16),
    color: primaryText,
    fontFamily: latoBold,
  },
  description: {
    fontSize: scale(10),
    fontFamily: latoSemiBold,
    color: darkGrayText,
  },
  packingTypeContainer: {
    paddingTop:12
    // paddingHorizontal: moderateScale(22),
  },

  loadingUnloadingContainer: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(15),
    flexDirection: 'row',

    justifyContent: 'space-between',
    flex: 1,
  },
  loadingUnloadingHeadingsContainer: {
    flex: 4,
  },
  loadingHeading: {
    fontSize: scale(16),
    color: primaryText,
    fontFamily: latoBold,
  },
  loadingDescription: {
    color: darkGrayText,
    fontSize: scale(10),
    fontFamily: latoRegular,
  },
  loadingUnloadingSwitchContainer: {
    flex: 2,
    // backgroundColor:"red",
    alignItems: 'flex-end',
  },
  assemblingContainer: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  toggleAssemblingSwitch: {},
  installationContainer: {
    flexDirection: 'row',
    paddingLeft: moderateScale(10),
    flex: 1,
    paddingVertical: moderateScale(10),
  },
  assemblingDescription: {
    color: darkGrayText,
    fontSize: scale(10),
    fontFamily: latoRegular,
  },
  installationHeadingContainer: {
    flex: 2,
  },
  acCounterContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  acHeading: {
    fontSize: scale(16),
    color: primaryText,
    fontFamily: latoBold,
  },
  acDescription: {
    fontSize: scale(10),
    fontFamily: latoRegular,
    color: darkGrayText,
  },
  buttonContainer: {
    paddingHorizontal: moderateScale(22),
    paddingVertical: moderateScale(10),
  },
  disabledBtn: {
    backgroundColor: disableBackground,
  },
  btnText: {
    fontSize: scale(20),
    fontFamily: latoSemiBold,
  },
  progressBarContainer: {
    paddingVertical: moderateVerticalScale(15),
    backgroundColor: stepsBackground,
    borderBottomRightRadius: moderateScale(8),
    borderBottomLeftRadius: moderateScale(8),
    // iOS shadow properties
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 12,
        shadowColor: '#000000',
      },
    }),
  },
  shadowWrapper: {
    overflow: 'hidden',
    paddingBottom: 5, // Add padding to show the bottom shadow
    borderBottomRightRadius: moderateScale(8),
    borderBottomLeftRadius: moderateScale(8),
  },
  additionalDetailsContainer: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
  },
  additionalHeading: {
    fontFamily: latoBold,
    color: primaryText,
    fontSize: scale(16),
  },
  inputContainer: {
    marginTop: moderateScale(12),
  },
  headingIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoIcon: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  infoBtn:{
    height:moderateScale(35),
    width:moderateScale(35),
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center"
  },
  toolTipContainer: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: secondaryBorder,
    backgroundColor: defaultBackground,
    // padding: 10,
    // backgroundColor:'red',
  },


  slectedCargoBtnStyle: {
    backgroundColor: primaryBackground,
    width: moderateScale(64),
    height: moderateScale(27),
    borderRadius: moderateScale(17),
  },

  cargoBtnStyle: {
    backgroundColor: lightPurpleBackground,
    width: moderateScale(64),
    height: moderateScale(27),
    borderRadius: moderateScale(17),
  },
  selectedCargoBtnText: {
    fontSize: scale(12),
    fontFamily: latoHeavy,
    textAlign: 'center',
    color: whiteText,
  },
  cargoBtnText: {
    fontSize: scale(12),
    fontFamily: latoBold,
    textAlign: 'center',
    color: primaryText,
  },
  additionalDetailContainer: {
    marginHorizontal: moderateScale(1),
    marginVertical: moderateVerticalScale(25),
  },
  additionalDetailTextView: {
    position: 'absolute',
    zIndex: 1,
    marginStart: 20,
    alignSelf: 'flex-start',
    top: -9,
    backgroundColor: defaultBackground,
  },
  additionalDetailText: {
    fontSize: scale(13),
    fontFamily: latoSemiBold,
    color: defaultText,
    textAlign: 'center',
    marginHorizontal:10
  },
  otherTextInput: {
    fontSize: scale(11),
    height: moderateScale(92),
    textAlignVertical: 'top',
    borderRadius: 5,
    paddingBottom: moderateVerticalScale(0),
    paddingTop: moderateVerticalScale(15),
    paddingHorizontal: moderateScale(19),
    borderWidth: 1,
    borderColor: darkGrayBorder,
  },
});

export default styles;
