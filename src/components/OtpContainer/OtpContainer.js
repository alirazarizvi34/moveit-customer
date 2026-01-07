import React, {useEffect, useRef, useState, useCallback} from 'react';
import {Platform, StyleSheet, TextInput, View} from 'react-native';
import {
  getHash,
  removeListener,
  startOtpListener,
  useOtpVerify,
} from 'react-native-otp-verify';
import toastService from '../../services/toast-service';
const OtpInputs = ({getOtp}) => {
  const [otp, setOtp] = useState(Array(4).fill(''));
  const [text, setText] = useState([]);
  const otpTextInput = useRef(['', '', '', '']);
  const {
    hash,

    message,
    timeoutError,
    stopListener,
    startListener,
  } = useOtpVerify({numberOfDigits: 4});

  useEffect(() => {
    if (otpTextInput.current[0]) {
      otpTextInput.current[0].focus();
    }
  }, []);

  //All the implmentation with text state is a temporary solution need to fix it in a refactor
  useEffect(() => {
    if (Platform.OS == 'ios') {
      if (text.length == 4) {
        setOtp(text);
        getOtp(text.join(''));
        // otpTextInput.current[4]?.focus();
        if (otpTextInput.current[3]) {
          otpTextInput.current[3].focus();
        }
      }
    }
  }, [text, otpTextInput]);

  useEffect(() => {
    if (Platform.OS == 'android') {
      try {
        startOtpListener(message => {
          try {
            // extract the otp using regex e.g. the below regex extracts 4 digit otp from message

            if (message) {
              const otppp = /(\d{4})/g.exec(message)[1];
              if (otppp) {
                const otpp = otppp.split('');
                if (Array.isArray(otpp)) {
                  setOtp(otpp);
                  otpTextInput.current[otp.length - 1].blur();
                  otpTextInput.current[0].blur();
                  getOtp(otppp);
                }

              }
            }
          } catch (err) {
            toastService.shortToast(err);
          }
        });
      } catch (err) {

      }
      return () => removeListener();
    }
  }, []);

  const focusPrevious = useCallback((key, index, value) => {
    if (key === 'Backspace' && index !== 0 && !value) {
      otpTextInput.current[index - 1].focus();
    } else if (value) {
      otpTextInput.current[index].focus();
      if (Platform.OS == 'ios') {
        text.splice(index, 1);
        setText([...text]);
      }
    }
  }, []);

  const focusNext = useCallback(
    (index, value) => {
      if (index < otpTextInput.current.length - 1 && value) {
        otpTextInput.current[index + 1].focus();
      }
      if (index === otpTextInput.current.length - 1 && value) {
        otpTextInput.current[index].blur();
      }
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      getOtp(newOtp.join(''));
    },
    [getOtp],
  );

  const onKeyPressHandler = (e, index, value) => {
    try {
      if (containsOnlyNumbers(e.nativeEvent.key)) {
        if (value !== e.nativeEvent.key) {
          focusNext(index, e.nativeEvent.key);
          if (Platform.OS == 'ios') {
            if (text.length < 4) {

              text.push(e.nativeEvent.key);
              setText([...text]);
            } else {
              setText([]);
            }
          }
        } else {
          focusPrevious(e.nativeEvent.key, index, value);
        }
      } else {
        focusPrevious(e.nativeEvent.key, index, value);
      }
    } catch (err) {

    }
  };
  const renderInputs = () => {
    return otp.map((value, index) => (
      <TextInput
        key={index}
        maxLength={1}
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        style={[
          styles.inputRadius,
          {borderBottomColor: value == '' ? '#929292' : '#FFBE50'},
        ]}
        keyboardType="decimal-pad"
        onChangeText={v => {
          focusNext(index, v);
        }}
        onKeyPress={e => onKeyPressHandler(e, index, value)}
        ref={ref => (otpTextInput.current[index] = ref)}
        value={value}
      />
    ));
  };
  function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
  }

  return <View style={styles.txtMargin}>{renderInputs()}</View>;
};

const styles = StyleSheet.create({
  //   gridPad: {padding: 30},
  txtMargin: {
    margin: 3,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inputRadius: {
    textAlign: 'center',
    padding: 7,
    backgroundColor: '#ECECEC',
    marginHorizontal: 10,
    width: 40,
    fontSize: 20,
    borderBottomColor: '#4E008A',
    borderBottomWidth: 4,
  },
});

export default OtpInputs;
