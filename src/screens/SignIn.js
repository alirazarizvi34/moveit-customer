import React, {useState, useContext, useEffect} from 'react';
import {
  BackHandler,
  View,
  Image,
  Text,
  SafeAreaView,
  Platform,
} from 'react-native';
import {GlobalContext} from '../../context/GlobalState';
import {useTranslation} from 'react-i18next';
import {baseURL} from '../config/config';

import {THEME} from '../shared/theme';
import TextViewComponent from '../components/textViewComp';
import SelectLanguage from './SelectLanguage';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import axios from 'axios';
import InputText from '../components/InputText';
import ButtonComponent from '../components/buttonComp/ButtonComponent';
import toastService from '../services/toast-service';
import {version} from './../../package.json';
import ForceUpdateModal from '../components/Modal/ForceUpdateModal';
import {getHash} from 'react-native-otp-verify';
import {AppConstants} from '../constants/AppConstants';
import useMergn from '../hooks/useMergn';

const {colorWhite, validateColor, colorBorder, colorF0F0F0, color4E008A} =
  THEME.colors;
const {latoBlack, jameelNooriNastaleeq} = THEME.fonts;

export default SignIn = ({navigation}) => {
  const {t, i18n} = useTranslation();

  const {
    myLanguage,
    appVersion,
    bootMeUpData,
    otpTimer,
    userNumber,
    setUserNumber,
    setOtpTimer,
  } = useContext(GlobalContext);
  const {eventHandler, attributeHandler, uniqueIdentifierHandler} = useMergn();
  const [number, setNumber] = useState('');
  const [btnPress, setBtnPress] = useState(false);
  const [showSigninBox, _setShowSigninBox] = useState(true);
  const [validate, setValidate] = useState(false);
  const [getFcmToken, setFcmToken] = useState(null);
  const [userHash, setUserHash] = useState('');

  useEffect(() => {
    try {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackBtn,
      );

      return () => backHandler.remove();
    } catch (err) {}
  }, []);

  useEffect(() => {
    try {
      if (Platform.OS == 'android') {
        getHash()
          .then(hash => {
            if (Array.isArray(hash)) {
              setUserHash(hash[0]);
            }
            // use this hash in the message.
          })
          .catch(err => {});
      }
    } catch (err) {}
  }, []);

  const handleBackBtn = () => {
    if (showSigninBoxRef.current) {
      BackHandler.exitApp();
      return true;
    } else {
      setShowSigninBox(true);
      return true;
    }
  };

  const showSigninBoxRef = React.useRef(showSigninBox);
  const setShowSigninBox = data => {
    showSigninBoxRef.current = data;
    _setShowSigninBox(data);
  };

  const SignUpFunc = async () => {
    try {
      setValidate(false);
      setBtnPress(true);
      let numRegexPattern = /^[0-9]*$/;

      let num = number;

      if (number == '') {
        setValidate(true);
        toastService.shortToast('Please enter phone number');
        return;
      } else if (numRegexPattern.test(num)) {
        if (number?.length != 11) {
          setValidate(true);
          toastService.shortToast(
            "Please enter valid phone number format like '03xxxxxxxxx'",
          );
          setBtnPress(false);
          return;
        }
        if (numRegexPattern.test(num)) {
          let pattern = num?.charAt(0) + '' + num?.charAt(1);
          num = num.substring(1);
          num = '92' + num;
          if (pattern != '03') {
            setValidate(true);
            toastService.shortToast('Phone Number should start with 03');
            setBtnPress(false);
            return;
          }
        } else {
          setValidate(true);
          setBtnPress(false);
          toastService.shortToast('Phone number should contain only numbers');
          return;
        }
      }

      let data = {
        phone: num,
        hash: userHash,
      };

      setUserNumber(number);
      axios
        .post(baseURL + '/send/otp', data)
        .then(async response => {
          setBtnPress(true);
          if (response?.data?.status) {
            setBtnPress(false);
            toastService.shortToast(response?.data?.message);
            setOtpTimer(AppConstants.otpTimer);
            navigation.navigate('Verification', {
              number: num,
              token: getFcmToken,
              hash: userHash,
            });
            if(Platform.OS == 'android'){
              const eventMessage = await eventHandler('App Signup 1','mobile-number',num);
              const attributeMessage = await attributeHandler('Mobile', num);
              const uniqueIdentifiermessage = await uniqueIdentifierHandler(num);
            }
          } else {
            setBtnPress(false);
            toastService.shortToast(response?.data?.message);
          }
        })
        .catch(function (error) {
          toastService.shortToast(error?.response?.data?.message);
          setBtnPress(false);
        });
    } catch (err) {}
  };

  const navigateUser = () => {
    let numRegexPattern = /^[0-9]*$/;

    let num = number;

    if (number == '') {
      setValidate(true);
      toastService.shortToast('Please enter phone number');
      return;
    } else if (numRegexPattern.test(num)) {
      if (number?.length != 11) {
        setValidate(true);
        toastService.shortToast(
          "Please enter valid phone number format like '03xxxxxxxxx'",
        );
        setBtnPress(false);
        return;
      }
      if (numRegexPattern.test(num)) {
        let pattern = num?.charAt(0) + '' + num?.charAt(1);
        num = num.substring(1);
        num = '92' + num;
        if (pattern != '03') {
          setValidate(true);
          toastService.shortToast('Phone Number should start with 03');
          setBtnPress(false);
          return;
        }
      } else {
        setValidate(true);
        setBtnPress(false);
        toastService.shortToast('Phone number should contain only numbers');
        return;
      }
    }
    navigation.navigate('Verification', {
      number: num,
      token: getFcmToken,
      hash: userHash,
    });
  };
  const userSignUpPressHandler = async () => {
    if (number == userNumber) {
      if (otpTimer < AppConstants.otpTimer && otpTimer > 1) {
        navigateUser();
      } else {
        SignUpFunc();
      }
    } else {
      SignUpFunc();
    }
  };
  return (
    <>
      {!myLanguage && <SelectLanguage visible={false} />}
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, marginHorizontal: moderateScale(16)}}>
          <Image
            source={require('../../assets/icons/moveit_logo.jpg')}
            style={{
              marginTop: moderateVerticalScale(70),
              alignSelf: 'center',
            }}
          />
          <View
            style={{
              marginTop: moderateVerticalScale(20),
              alignItems: i18n.language === 'urdu' ? 'flex-end' : 'flex-start',
            }}>
            <TextViewComponent
              text={t('enter_number')}
              style={{
                fontSize: i18n.language === 'urdu' ? scale(22) : scale(15),
                marginVertical: moderateVerticalScale(15),
                fontFamily:
                  i18n.language === 'urdu' ? jameelNooriNastaleeq : latoBlack,
              }}
            />

            <InputText
              placeholder={'03XXXXXXXXX'}
              maxLength={11}
              keyboardType={'numeric'}
              returnKeyType="done"
              inLineStyle={{
                backgroundColor: colorWhite,
                borderColor: colorBorder,
              }}
              onChangeText={text => {
                setValidate(false);
                setNumber(text);
              }}
              value={number}
            />

            {validate ? (
              <View style={{marginTop: moderateScale(8)}}>
                <Text
                  style={{
                    color: validateColor,
                    fontFamily:
                      i18n.language === 'urdu'
                        ? jameelNooriNastaleeq
                        : latoBlack,
                    fontSize: scale(16),
                  }}>
                  {t('validation_number')}
                </Text>
              </View>
            ) : null}

            <ButtonComponent
              disabled={number?.length == 11 ? false : true}
              pressStatus={btnPress}
              icon={{
                name: 'check',
                color: colorWhite,
                size: scale(26),
              }}
              btnStyle={{
                marginTop: moderateVerticalScale(20),
                backgroundColor:
                  number?.length == 11 ? color4E008A : colorF0F0F0,
              }}
              textStyle={{fontSize: scale(19)}}
              onPress={userSignUpPressHandler}
            />
          </View>
        </View>
        {bootMeUpData &&
          bootMeUpData?.app_version != version &&
          !bootMeUpData?.in_review && (
            <ForceUpdateModal
              updatedVersion={bootMeUpData?.app_version}
              currentVersion={version}
              show={true}
            />
          )}
      </SafeAreaView>
    </>
  );
};
