import {View, Text} from 'react-native';
import React, {useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import AuthServices from '../services/auth-service';
import toastService from '../services/toast-service';
import {GlobalContext} from '../../context/GlobalState';
import {AppConstants} from '../constants/AppConstants';

const useAuth = () => {
  const [btnPress, setBtnPress] = useState(false);
  const [error, setError] = useState(false);
  const [resendCode, setResendCode] = useState(false);
  const {auth,setAuth, setOtpTimer} = useContext(GlobalContext);

  const navigation = useNavigation();
  const sendOtp = async otpData => {
    await AuthServices.sendOtp(otpData)
      .then(response => {
        setBtnPress(true);
        if (response?.data?.status) {
          setOtpTimer(AppConstants.otpTimer);
          setBtnPress(false);
          setError(false);
          setResendCode(false);
          toastService.shortToast(response?.data?.message);
        } else {
          setError(false);
          setBtnPress(false);
          setResendCode(false);
          toastService.shortToast(response?.data?.message);
        }
      })
      .catch(error => {
        setError(false);
        setBtnPress(false);
        toastService.shortToast(error?.response?.data?.message);
      });
  };


  const socialSurveyRequest = async title => {
    const data ={
      survey_response: title
    }
    setBtnPress(true);
    await AuthServices.socialSurvey(data)
      .then(response => {
       auth.is_survey_submited = 1;
       setAuth({...auth});
       setBtnPress(false);
      })
      .catch(error => {
        setBtnPress(false);
      });
  };

  const authenticateUser = async userData => {
    await AuthServices.authenticateUser(userData)
      .then(async(response) => {
        setBtnPress(false);
        setError(false);
        let getData;
        let getPhone;
        let phone;
        let has_fcm = false;
        setOtpTimer(0);
        if(response?.data?.data?.has_fcm){
          has_fcm = response?.data?.data?.has_fcm;
          AsyncStorage.setItem('fcmToken', userData?.fcm_token);
        }
        if (response?.data?.data?.is_profile_completed == 1) {
          getData = response?.data?.data;
          getPhone = response?.data?.data?.phone;
          phone = getPhone.substring(2);
          phone = '0' + phone;
          setAuth({...getData, phone , has_fcm});
          AsyncStorage.setItem('auth', JSON.stringify({...getData, phone , has_fcm}));
          toastService.shortToast(response?.data?.message);
          navigation.navigate('Home');
        } else {
          getData = response?.data?.data;
          getPhone = response?.data?.data?.phone;
          phone = getPhone.substring(2);
          phone = '0' + phone;
          if (response?.data?.message) {
            toastService.shortToast(response?.data?.message);
          }
          setAuth({...getData, phone, has_fcm});
          AsyncStorage.setItem('auth', JSON.stringify({...getData, phone, has_fcm}));
          navigation.navigate('PersonalInformation');
        }
      })
      .catch(error => {
        setBtnPress(false);
        setError(true);
        if (error?.response?.data?.message) {
          toastService.shortToast(error?.response?.data?.message);
        }
      });
  };

  return {
    sendOtp,
    authenticateUser,
    setBtnPress,
    setResendCode,
    socialSurveyRequest,
    setError,
    btnPress,
    error,
    resendCode,
  };
};

export default useAuth;
