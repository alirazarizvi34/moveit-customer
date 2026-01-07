import React, {useState, useContext} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import SubPagesHeader from '../components/SubPagesHeader';
import toastService from '../services/toast-service';
import CountDown from 'react-native-countdown-fixed';
import {useTranslation} from 'react-i18next';
import ButtonComponent from '../components/buttonComp';
import {getStyles} from './VerificationStyles';
import {GlobalContext} from '../../context/GlobalState';
import {THEME} from '../shared/theme';

import OtpInputs from '../components/OtpContainer/OtpContainer';
import useAuth from '../hooks/useAuth';

const {color4D226D} = THEME.colors;

export default Verification = ({navigation, route}) => {
  const number = route?.params?.number;
  const FcmToken = route?.params?.token;
  const hash = route?.params?.hash;
  const {otpTimer, setOtpTimer , fcmToken} = useContext(GlobalContext);
  const {
    sendOtp,
    authenticateUser,
    btnPress,
    error,
    resendCode,
    setBtnPress,
    setError,
    setResendCode,
  } = useAuth();
  const {t, i18n} = useTranslation();
  const styles = getStyles(i18n.language);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const VerificationFunc = async otp => {
    setBtnPress(true);
    if (otp.length !== 4) {
      setBtnPress(false);
      toastService.shortToast('Enter 4 digit code.');
      return;
    }
    let data = {
      phone: number,
      otp: otp,
      fcm_token: fcmToken,
      device_type: Platform.OS,
    };
    authenticateUser(data);
  };

  const ResendOTPFunc = () => {
    let data = {
      phone: number,
      hash: hash,
    };
    sendOtp(data);
  };

  const showSendCodeAgainBtn = () => {
    setResendCode(true);
  };
  const getOtp = otpp => {
    const lengthArray = otpp?.split('');
    setError(false);
    setOtp(otpp);
    if (Array.isArray(lengthArray) && lengthArray.length > 3) {
      if (!loading) {
        VerificationFunc(otpp);
        setLoading(!loading);
      }
    }
  };

  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.cotainer}>
          <SubPagesHeader
            navigation={navigation}
            title={t('verification')}
            clearAuthOnGoBack={true}
          />
          <Text style={styles.numberText}>{number}</Text>
          <Text style={styles.otpNumber}>{t('otp_code')}</Text>

          <View style={styles.otpContainer}>
            <OtpInputs getOtp={otp => getOtp(otp)} />
          </View>
          <View style={styles.buttonContainer}>
            {error ? (
              <Text style={styles.invalidOtp}>{t('invalid_otp_code')}</Text>
            ) : (
              <ButtonComponent
                disabled={otp.length !== 4 ? true : false}
                pressStatus={btnPress}
                text={t('verify')}
                btnStyle={styles.btnVerifyStyle}
                textStyle={styles.otpBtn}
                onPress={() => {
                  VerificationFunc(otp);
                }}
              />
            )}

            {resendCode ? (
              <ButtonComponent
                disabled={btnPress}
                text={t('send_code_again')}
                textStyle={styles.btnResendTextStyle}
                btnStyle={styles.btnResendStyle}
                onPress={() => {
                  ResendOTPFunc();
                }}
              />
            ) : (
              <CountDown
                until={otpTimer}
                size={18}
                onChange={e => setOtpTimer(e)}
                onFinish={() => showSendCodeAgainBtn()}
                digitStyle={null}
                digitTxtStyle={{color: color4D226D}}
                separatorStyle={{color: color4D226D, margin: -10}}
                timeToShow={['M', 'S']}
                timeLabels={{m: null, s: null}}
                showSeparator
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

// 337
