import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Keyboard,
  Platform,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import ButtonComponent from '../components/buttonComp/ButtonComponent';
import InputText from '../components/InputText';
import SubPagesHeader from '../components/SubPagesHeader';
import {THEME} from '../shared/theme';
import {useTranslation} from 'react-i18next';
import {useFormik} from 'formik';
import toastService from '../services/toast-service';
import validationSchema from '.././validationSchema/validationSchema';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import {baseURL} from '../config/config';
import {GlobalContext} from '../../context/GlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from '@react-native-firebase/analytics';
import {APICONSTANTS} from '../constants/ApiConstants';
import useMergn from '../hooks/useMergn';

const {
  colorWhite,
  color4E008A,
  colorBlack,
  validateColor,
  colorF0F0F0,
  colorBorder,
} = THEME.colors;
const {latoBlack, jameelNooriNastaleeq, latoRegular} = THEME.fonts;
export const PersonalInformation = ({navigation}) => {
  const {auth, setAuth} = useContext(GlobalContext);
  const {eventHandler, attributeHandler} = useMergn();
  const {t, i18n} = useTranslation();
  const [keyBoardHeight, setKeyBoardHeight] = useState(false);
  const [btnPress, setBtnPress] = useState(false);
  const [apiError, setApiError] = useState();

  useEffect(() => {
    const keyboardDidShowlistner = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        setKeyBoardHeight(true);
      },
    );

    const keyboardDidHidelistner = Keyboard.addListener(
      'keyboardDidHide',
      event => {
        setKeyBoardHeight(false);
      },
    );
    return () => {
      keyboardDidShowlistner.remove();
      keyboardDidHidelistner.remove();
    };
  }, [keyBoardHeight]);

  const initialValues = {
    fullName: '',
    email: '',
    referralCode: '',
  };

  const onSubmit = async values => {
    setBtnPress(true);
    let numRegexPattern = /^[0-9]*$/;
    let num = values?.referralCode;
    if (num != '') {
      if (numRegexPattern?.test(num)) {
        if (values?.referralCode?.length != 11) {
          // setValidate(true);
          setBtnPress(false);
          toastService.shortToast(
            "Please enter valid phone number format like '03xxxxxxxxx'",
          );
          return;
        }
        if (numRegexPattern.test(num)) {
          let pattern = num?.charAt(0) + '' + num?.charAt(1);
          num = num.substring(1);
          num = '92' + num;
          if (pattern != '03') {
            // setValidate(true);
            setBtnPress(false);
            toastService.shortToast('Phone Number should start with 03');
            return;
          }
        } else {
          // setValidate(true);
          setBtnPress(false);
          toastService.shortToast('Phone number should contain only numbers');
          return;
        }
      }
    }

    let data = {
      referral_code: num,
      email: values?.email,
      name: values?.fullName,
      user_id: auth?.user_id,
    };

    const config = {
      headers: {Authorization: `Bearer ${auth?.accessToken}`},
    };

    const resp = await axios
      .post(baseURL + APICONSTANTS.updateProfile, data, config)
      .then(async function (response) {
        setBtnPress(true);
        if (response?.data?.success) {
          auth.is_profile_completed =
            response?.data?.data?.is_profile_completed;
          auth.name = response?.data?.data?.name;

          setAuth({...auth});
          
          AsyncStorage.setItem('auth', JSON.stringify(auth));
          setBtnPress(false);
          await analytics().logEvent('signUp', {
            name: values?.fullName,
            email: values?.email,
            referral_code: num,
            number: auth?.phone,
          });
          navigation.navigate('Home');
          if(Platform.OS == 'android'){
          const eventMessage = await eventHandler('App Signup 2', 'full-name', values?.fullName);
          const eventMessage2 = await eventHandler('App Signup 2', 'email-address', values?.email);
          const attributeMessage1 = await attributeHandler('First-Name', values?.fullName);
          const attributeMessage2 = await attributeHandler('Email', values?.email);
        }
        } else {
          setError(true);
          setBtnPress(false);
          toastService.shortToast(response?.data?.message);
        }
      })
      .catch(function (error) {
        // setError(true);
        setBtnPress(false);
        // toastService.shortToast(error.response.data.data);
        for (let [key, value] of Object.entries(error?.response?.data.data)) {
          setApiError(error?.response?.data.data);
        }
      });
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

  const removeError = () => {
    if (apiError) {
      setApiError(null);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <SubPagesHeader
          navigation={navigation}
          title={t('personal_information')}
        />

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flex: keyBoardHeight ? 0 : 1}}
          scrollEnabled={true}>
          <View style={styles.inputView}>
            <InputText
              placeholder="Full name"
              inLineStyle={{
                backgroundColor: colorWhite,
                borderColor:
                  errors?.fullName && touched?.fullName
                    ? validateColor
                    : colorBorder,
              }}
              keyboardType="default"
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              value={values?.fullName}
            />
            {errors.fullName && touched.fullName && (
              <Text
                style={[
                  styles.errorText,
                  {
                    fontFamily:
                      i18n?.language === 'urdu'
                        ? jameelNooriNastaleeq
                        : latoRegular,
                    alignSelf: i18n?.language === 'urdu' ? 'flex-end' : null,
                  },
                ]}>
                {t(errors?.fullName)}
              </Text>
            )}
            {/* {apiError && apiError.name ? <Text style={[styles.errorText, { fontFamily: i18n.language === 'urdu' ? jameelNooriNastaleeq : latoRegular, alignSelf: i18n.language === 'urdu' ? "flex-end" : null }]}>{apiError.name}</Text> : null} */}
          </View>

          <View
              style={{
                paddingHorizontal: moderateScale(30),
                marginBottom:
                  (errors?.email && touched?.email) || apiError
                    ? moderateScale(35)
                    : moderateScale(26),
              }}>
              <InputText
                placeholder="Email address"
                inLineStyle={{
                  backgroundColor: colorWhite,
                  borderColor:
                    (errors?.email && touched?.email) || apiError
                      ? validateColor
                      : colorBorder,
                }}
                // inputStyle={{color: apiError ? validateColor : colorBlack}}
                keyboardType="email-address"
                onChangeText={e => {
                  handleChange('email')(e);
                  removeError();
                }}
                onBlur={handleBlur('email')}
                value={values?.email}
                errorMessage={errors?.email}
              />
              {errors?.email && touched?.email && (
                <Text
                  style={[
                    styles.errorText,
                    {
                      fontFamily:
                        i18n?.language === 'urdu'
                          ? jameelNooriNastaleeq
                          : latoRegular,
                      alignSelf: i18n?.language === 'urdu' ? 'flex-end' : null,
                    },
                  ]}>
                  {t(errors?.email)}
                </Text>
              )}
              {errors?.email && touched?.email ? null : (
                <>
                  {apiError && apiError?.email && (
                    <Text
                      style={[
                        styles.errorText,
                        {
                          fontFamily:
                            i18n?.language === 'urdu'
                              ? jameelNooriNastaleeq
                              : latoRegular,
                          alignSelf:
                            i18n?.language === 'urdu' ? 'flex-end' : null,
                        },
                      ]}>
                      {apiError?.email}
                    </Text>
                  )}
                </>
              )}
            </View>

          <View style={styles.optionalInfoContainer}>
            <View
              style={{flex: 1, height: scale(1), backgroundColor: '#CCCCCC'}}
            />
            <View style={{paddingHorizontal: moderateScale(12)}}>
              <Text
                style={{
                  fontSize: i18n.language === 'urdu' ? scale(22) : scale(16),
                  width: '100%',
                  textAlign: 'center',
                  color: '#4E008A',
                  fontFamily:
                    i18n?.language === 'urdu'
                      ? jameelNooriNastaleeq
                      : latoRegular,
                  fontStyle: 'normal',
                  // fontWeight: "400"
                }}>
                {t('optional_information')}
              </Text>
            </View>
            <View style={{flex: 1, height: 1, backgroundColor: '#CCCCCC'}} />
          </View>

          <View style={styles.inputView}>
            {/* <View
              style={{
                marginBottom:
                  (errors?.email && touched?.email) || apiError
                    ? moderateScale(35)
                    : moderateScale(26),
              }}>
              <InputText
                placeholder="Email address"
                inLineStyle={{
                  backgroundColor: colorWhite,
                  borderColor:
                    (errors?.email && touched?.email) || apiError
                      ? validateColor
                      : colorBorder,
                }}
                // inputStyle={{color: apiError ? validateColor : colorBlack}}
                keyboardType="email-address"
                onChangeText={e => {
                  handleChange('email')(e);
                  removeError();
                }}
                onBlur={handleBlur('email')}
                value={values?.email}
                errorMessage={errors?.email}
              />
              {errors?.email && touched?.email && (
                <Text
                  style={[
                    styles.errorText,
                    {
                      fontFamily:
                        i18n?.language === 'urdu'
                          ? jameelNooriNastaleeq
                          : latoRegular,
                      alignSelf: i18n?.language === 'urdu' ? 'flex-end' : null,
                    },
                  ]}>
                  {t(errors?.email)}
                </Text>
              )}
              {errors?.email && touched?.email ? null : (
                <>
                  {apiError && apiError?.email && (
                    <Text
                      style={[
                        styles.errorText,
                        {
                          fontFamily:
                            i18n?.language === 'urdu'
                              ? jameelNooriNastaleeq
                              : latoRegular,
                          alignSelf:
                            i18n?.language === 'urdu' ? 'flex-end' : null,
                        },
                      ]}>
                      {apiError?.email}
                    </Text>
                  )}
                </>
              )}
            </View> */}

            <View
              style={{
                marginBottom:
                  errors?.referralCode && touched?.referralCode
                    ? moderateScale(35)
                    : moderateScale(26),
              }}>
              <InputText
                placeholder="Referral code"
                inLineStyle={{
                  backgroundColor: colorWhite,
                  borderColor:
                    errors?.referralCode && touched?.referralCode
                      ? validateColor
                      : colorBorder,
                }}
                // inputStyle={{color: errors.referralCode && touched.referralCode ? validateColor : colorBlack}}
                keyboardType="numeric"
                onChangeText={handleChange('referralCode')}
                onBlur={handleBlur('referralCode')}
                value={values?.referralCode}
                maxLength={11}
              />
              {errors?.referralCode && touched?.referralCode && (
                <Text
                  style={[
                    styles.errorText,
                    {
                      fontFamily:
                        i18n?.language === 'urdu'
                          ? jameelNooriNastaleeq
                          : latoRegular,
                      alignSelf: i18n?.language === 'urdu' ? 'flex-end' : null,
                    },
                  ]}>
                  {t(errors?.referralCode)}
                </Text>
              )}
              {/* {apiError && apiError.referral_code && <Text style={[styles.errorText, { fontFamily: i18n.language === 'urdu' ? jameelNooriNastaleeq : latoRegular, alignSelf: i18n.language === 'urdu' ? "flex-end" : null }]}>{apiError.referral_code}</Text>} */}
            </View>

            {i18n.language === 'urdu' ? (
              <View
                style={[
                  styles.termAndConditionUrduView,
                  {
                    justifyContent:
                      i18n?.language === 'urdu' ? 'flex-end' : 'space-around',
                  },
                ]}>
                <Text
                  style={[
                    styles.termAndConditionUrduText,
                    {alignSelf: i18n?.language === 'urdu' ? 'flex-end' : null},
                  ]}>
                  کے ساتھ سائن اپ کرکے آپ ہماری
                  <Text
                    style={{
                      color: color4E008A,
                      textDecorationLine: 'underline',
                    }}>
                    {' '}
                    شرائط و ضوابط
                  </Text>{' '}
                  سے اتفاق کرتے ہیں۔
                </Text>
                <Text style={styles.termAndConditionUrduSubText}>MoveIt</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.termAndConditionEnglishText}>
                  By signing up with MoveIt you agree to our
                </Text>
                <Text style={styles.termAndConditionEnglishSubText}>
                  Terms and Conditions
                </Text>
              </View>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <ButtonComponent
              disabled={!isValid || values?.fullName === '' ? true : false}
              pressStatus={btnPress}
              icon={{
                name: 'check',
                color: colorWhite,
                size: scale(30),
              }}
              btnStyle={{
                marginBottom: moderateScale(52),
                // backgroundColor:color4E008A
                backgroundColor:
                  !isValid || values?.fullName === ''
                    ? colorF0F0F0
                    : color4E008A,
              }}
              textStyle={{fontSize: scale(19)}}
              onPress={handleSubmit}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  inputView: {
    paddingHorizontal: moderateScale(30),
    marginVertical: moderateVerticalScale(26),
  },
  optionalInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(30),
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: moderateScale(30),
  },
  errorText: {
    fontSize: scale(16),
    fontFamily: latoRegular,
    color: validateColor,
    paddingTop: moderateScale(6),
  },
  termAndConditionUrduView: {
    flexDirection: 'row',
    // justifyContent: "space-around",
    alignItems: 'center',
  },
  termAndConditionUrduText: {
    fontSize: scale(12),
    color: colorBlack,
    fontFamily: jameelNooriNastaleeq,
    textAlign: 'center',
  },
  termAndConditionUrduSubText: {
    fontSize: scale(13),
    textAlign: 'center',
    fontFamily: latoRegular,
  },
  termAndConditionEnglishText: {
    fontSize: scale(12),
    color: colorBlack,
    fontFamily: latoRegular,
  },
  termAndConditionEnglishSubText: {
    fontSize: scale(13),
    color: color4E008A,
    textDecorationLine: 'underline',
    fontFamily: latoRegular,
  },
});
