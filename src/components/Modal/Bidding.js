import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Modal,
  Dimensions,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import {GlobalContext} from '../../../context/GlobalState';
import TextInputWithBottomBorder from '../InputBottomBorder';
import ButtonComponent from '../buttonComp/ButtonComponent';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFormik} from 'formik';
import BiddingValidation from '../../validationSchema/biddingValidationSchema';
import BiddingService from '../../services/BiddingService';
import {AppImages} from '../../constants/AppImages';

const deviceHeight = Dimensions.get('window').height;
const {
  color4E008A,
  priTxtColor,
  priBorderColor,
  colorWhite,
  color646464,
  color444444,
  colorCC0000,
  colorBBBBBB,
  colorBlack,
} = THEME.colors;
const {jameelNooriNastaleeq, latoRegular, latoBold, latoSemiBold, latoMedium} =
  THEME.fonts;
export default Bidding = ({
  showModal,
  title,
  titleTextStyle,
  showValidationStyle,
  onModalClose = () => {},
  onPress = () => {},
  ...props
}) => {
  const {
    setBiddingAmount,
    customerThreshold,
    estimatedFare,
    setIsBidding,
    globalLabours,
    bootMeUpData,
    Globalvehicle,
  } = useContext(GlobalContext);

  const {t, i18n} = useTranslation();
  const styles = getStyles(i18n.language, errors, touched, Globalvehicle?.discount_availability);
  const minimumEstimatedFare = BiddingService.minimumEstimatedFare(
    bootMeUpData?.lower_bid_threshold,
    Globalvehicle?.final_est_fare,
  );
  const biddingValidation = new BiddingValidation(minimumEstimatedFare);
  const validationSchema = biddingValidation.validationSchema;
  const initialValues = {
    biddingAmount: props?.data?.estimatedFare,
  };

  const onSubmit = values => {
    if (minimumEstimatedFare > parseFloat(values?.biddingAmount)) {
      formik.setErrors({
        biddingAmount: `Please enter minimum amount of PKR ${minimumEstimatedFare}`,
      });
      return;
    }
    setIsBidding(1);
    setBiddingAmount(Number.parseFloat(values?.biddingAmount));
    onPress();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    isSubmitting,
    isValid,
    handleSubmit,
  } = formik;
  return (
    <Modal
      avoidKeyboard
      statusBarTranslucent={false}
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={onModalClose}
      style={styles.modalStyle}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'android' ? undefined : 'padding'}>
        <View style={[styles.modalContainer]}>
            <View style={styles.modalViewContainer}>
              {Globalvehicle?.discount_availability && 
                <View style={styles.discountContainer}>
                <Image
                  style={styles.discountIcon}
                  source={AppImages.discountIcon}
                />
                <Text
                  style={styles.discountText}>
                  {Globalvehicle?.discount} {t('discountTxt')}
                </Text>
              </View>
              }
            <View style={styles.modalView}>
              <Text style={{...styles.titleTextStyle, ...titleTextStyle}}>
                {title}
              </Text>

              {/* <ScrollView> */}
              <TextInputWithBottomBorder
                returnKeyType="done"
                maxLength={10}
                numericvalue
                leftText={t('PKR')}
                keyboardType="number-pad"
                inlineStyle={styles.textInputInlineStyles}
                onChangeText={handleChange('biddingAmount')}
                onBlur={handleBlur('biddingAmount')}
                value={values?.biddingAmount}
              />

              <View style={styles.textInputFooterContainer}>
                <View
                  style={{
                    ...styles.showValidationStyle,
                    ...showValidationStyle,
                  }}>
                  <IconMaterial
                    name={
                      errors?.biddingAmount && touched?.biddingAmount
                        ? 'alert-circle'
                        : 'check-circle'
                    }
                    size={scale(20)}
                    color={
                      errors?.biddingAmount && touched?.biddingAmount
                        ? colorCC0000
                        : '#82D69A'
                    }
                  />

                  <Text style={styles.iconText}>
                    {errors?.biddingAmount && touched?.biddingAmount
                      ? t(errors?.biddingAmount)
                      : t('perfect')}
                  </Text>
                </View>
                {globalLabours == 1 && (
                  <View style={{marginHorizontal: 25}}>
                    <Text style={styles.additionalText}>
                      +PKR {Globalvehicle?.vehicle?.labour_cost}
                    </Text>
                  </View>
                )}
              </View>

              <View
                style={[
                  styles.extimateFareView,
                  {
                    flexDirection:
                      i18n.language === 'urdu' ? 'row-reverse' : 'row',
                    justifyContent: 'space-between',
                    padding: moderateScale(10),
                    alignItems: 'center',
                  },
                ]}>
                <Text style={styles.estimatedText}>{t('estimated_fare')}</Text>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 5,
                  }}>
                  <Text style={styles.extimateFare}>
                    PKR {props?.data?.estimatedFare}
                  </Text>

                  {Globalvehicle?.discount_availability &&
                  <Text style={styles.estimatedInnerValue}>
                    {Globalvehicle?.est_fare}
                  </Text>
                  }
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <ButtonComponent
                  disabled={isValid ? false : true}
                  pressStatus={false}
                  text={t('send_offer')}
                  btnStyle={{
                    backgroundColor: isValid ? color4E008A : colorBBBBBB,
                  }}
                  textStyle={styles.buttonTextStyle}
                  onPress={handleSubmit}
                />
              </View>
              {/* </ScrollView> */}
            </View>
          
             </View>
          
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const getStyles = (language, errors, touched, discountAvailability) =>
  StyleSheet.create({
    modalStyle: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: '#000000AA',
      justifyContent: 'flex-end',
    },
    modalViewContainer: {
      backgroundColor: discountAvailability ? '#00C100' : undefined,
      // maxHeight: discountAvailability ? language == 'urdu' ? deviceHeight * 0.55 : deviceHeight * 0.6 : undefined,
      justifyContent: discountAvailability ? 'flex-end' : undefined,
      borderTopRightRadius: discountAvailability ? moderateScale(15) : undefined,
      borderTopLeftRadius: discountAvailability ? moderateScale(15) : undefined,
    },
    modalView: {
      backgroundColor: colorWhite,
      width: '100%',
      maxHeight: deviceHeight * 0.5,
      borderTopRightRadius: moderateScale(15),
      borderTopLeftRadius: moderateScale(15),
    },
    buttonContainer: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      // marginTop: moderateVerticalScale(15),
      marginBottom: moderateVerticalScale(26),
      marginHorizontal: moderateScale(16),
      // flex:1,
    },
    titleTextStyle: {
      textAlign: 'center',
      marginTop: moderateVerticalScale(18),
      fontFamily: latoSemiBold,
      fontSize: scale(18),
      color: color444444,
    },
    showValidationStyle: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginHorizontal: moderateScale(31),
      marginTop: moderateVerticalScale(10),
      flexDirection: language === 'urdu' ? 'row-reverse' : 'row',
    },
    extimateFareView: {
      borderColor: priBorderColor,
      borderWidth: 2,
      marginVertical: moderateVerticalScale(30),
      marginHorizontal: moderateScale(16),
      borderRadius: moderateScale(10),
    },
    extimateFare: {
      fontFamily: latoBold,
      fontSize: scale(16),
      color: priTxtColor,
    },
    textInputFooterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textInputInlineStyles: {
      fontSize: scale(32),
      fontFamily: latoBold,
    },
    iconText: {
      lineHeight:
        language === 'urdu'
          ? moderateVerticalScale(34)
          : moderateVerticalScale(12),
      marginHorizontal: moderateScale(5),
      color:
        errors?.biddingAmount && touched?.biddingAmount
          ? colorCC0000
          : color646464,
      fontSize: language === 'urdu' ? scale(16) : scale(10),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoRegular,
    },
    estimatedText: {
      lineHeight:
        language === 'urdu'
          ? moderateVerticalScale(28)
          : moderateVerticalScale(22),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoSemiBold,
      fontSize: language === 'urdu' ? scale(20) : scale(16),
      color: color444444,
    },
    buttonTextStyle: {
      alignSelf: 'stretch',
      fontSize: scale(20),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoBold,
      textAlign: 'center',
      lineHeight:
        language === 'urdu'
          ? moderateVerticalScale(50)
          : moderateVerticalScale(24),
    },
    additionalText: {
      fontSize: scale(14),
      fontFamily: latoBold,
      color: color4E008A,
    },
    estimatedInnerValue: {
      fontSize: scale(10),
      fontFamily: latoMedium,
      color: colorBlack,
      textDecorationLine: 'line-through',
    },
    discountContainer: {
      flexDirection: language == 'urdu' ? 'row-reverse' : 'row',
      alignItems: 'center',
      gap: 10,
      marginHorizontal: moderateScale(22),
      marginVertical:moderateVerticalScale(8)
    },
    discountIcon: {
      width: moderateScale(18),
      height: moderateScale(18),
    },
    discountText: {
      fontSize: language == 'urdu' ? scale(16) : scale(14),
      color: colorWhite,
      fontFamily: language == 'urdu' ? jameelNooriNastaleeq : latoRegular,
    }
  });
