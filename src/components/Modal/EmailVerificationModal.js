import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  TextInput,
  Modal,
  Text,
  View,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import ButtonComponent from '../buttonComp/ButtonComponent';
import {useTranslation} from 'react-i18next';
import {colorTheme} from '../../constants/ColorConstants';
import {useFormik} from 'formik';
import validationSchema from '../.././validationSchema/relocationEmailValidateSchema';
import {GlobalContext} from '../../../context/GlobalState';

const deviceHeight = Dimensions.get('window').height;
const {colorFBF7FF} = THEME.colors;
const {primaryText,placeholderText,defaultBackground, primaryBorder,errorText} = colorTheme;
const {latoRegular, latoBold} = THEME.fonts;

export default EmailVerificationModal = ({props,onPress,apiError,removeError,loader}) => {
  const {t, i18n} = useTranslation();
  const {
    auth
  } = useContext(GlobalContext);

  const initialValues = {
    email: auth?.email,
  };

  const onSubmit = (values) => {
    onPress(values?.email);
  }

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
      animationType="fade"
      transparent={true}
      visible={props?.show}
      style={styles.modalStyle}>
        <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'android' ? undefined : 'padding'}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <ScrollView contentContainerStyle={{marginHorizontal:moderateScale(35)}}>
            <View
              style={{
                marginVertical: moderateVerticalScale(16),
              }}>
              <Text
                style={styles.modalTitle}>
                {t('Verify email to proceed with payment')}
              </Text>
            </View>

              <TextInput
               style={styles.input}
               value={values?.email}
              onChangeText={e => {
                handleChange('email')(e);
                removeError();
              }}
              onBlur={handleBlur('email')}
               editable={true}
               placeholder={'Enter email'}
               placeholderTextColor={placeholderText}
               autoCapitalize="none"
              />

           {errors?.email && touched?.email && (
                <Text
                  style={[
                    styles.errorText,
                    {
                      fontFamily: latoRegular,
                    },
                  ]}>
                  {t(errors?.email)}
                </Text>
              )}
              {errors?.email && touched?.email ? null : (
                <>
                  {apiError && (
                    <Text
                      style={[
                        styles.errorText,
                        {
                          fontFamily: latoRegular,
                        },
                      ]}>
                      {apiError}
                    </Text>
                  )}
                </>
              )}

              <View style={styles.buttonContainer}>
        <ButtonComponent
          onPress={handleSubmit}
          textStyle={styles.btnText}
          disabled={isValid ? false : true}
          text={`Verify Email`}
          pressStatus={loader}
        />
      </View>
          </ScrollView>
        </View>
      </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalStyle: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000AA',
    justifyContent: 'flex-end',
  },
  modalTitle: {
    fontSize: scale(24),
    fontFamily: latoBold,
    color: primaryText,
  },
  modalView: {
    backgroundColor: colorFBF7FF,
    width: '100%',
    maxHeight: deviceHeight * 0.5,
    borderTopRightRadius: moderateScale(28),
    borderTopLeftRadius: moderateScale(28),
    paddingVertical:moderateVerticalScale(15),
  },
  modalText: {
    fontSize: scale(13),
    fontFamily: latoRegular,
    color: '#555',
    textAlign: 'center',
    marginBottom: moderateVerticalScale(10),
    marginHorizontal: moderateScale(20),
  },
  input: {
    height: moderateVerticalScale(50),
    backgroundColor: defaultBackground,
    width: '100%',
    borderWidth: 1,
    borderColor: primaryBorder,
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(20),
  },
  buttonContainer: {
    paddingBottom: moderateScale(10),
    marginTop:moderateVerticalScale(100),
  },
  btnText: {
    fontSize: scale(20),
  },
  errorText: {
    fontSize: scale(16),
    fontFamily: latoRegular,
    color: errorText,
    paddingTop: moderateScale(6),
  },
});
