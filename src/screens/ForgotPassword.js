import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import {Block} from 'galio-framework';
import {GlobalStyles} from '../styles/GlobalStyles';
import AppButton from '../components/Button/AppButton';
import toastService from '../services/toast-service';
import {baseURL} from '../config/config';

function ForgotPassword({navigation}) {
  let [marginMinus, setMarginMinus] = useState(-120);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const {LatoBold} = GlobalStyles;

  const reset_pw = async() =>{
    if(email == ""){
      toastService.shortToast("Please enter your email");
      return;
  } 
  if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
  {
    toastService.shortToast('Please Enter The Correct Email');
    return;
  }
  setLoading(true);  
    try {
      let resp = await fetch(baseURL + 'user/reset_password', {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id: email}),
      });
      let data = await resp.json();
      if (data.success) {
        setLoading(false);
        toastService.shortToast(data?.message);
        navigation.navigate("SignIn");
      } 
      else {
        toastService.shortToast(data?.message);
        setLoading(false);
      }
    } catch (error) {
      toastService.shortToast("Error: ", error);
      setLoading(false);
    }
  };
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setMarginMinus(-300);
    setKeyboardStatus(true);
  };

  const _keyboardDidHide = () => {
    setMarginMinus(-130);
    setKeyboardStatus(false);
  };

  return (
    <>
      <Block flexDirection={'column'}>
        <Image
          source={require('../../assets/img/loginBg.jpg')}
          style={{resizeMode: 'cover', width: '100%', marginTop: -40}}
        />
      </Block>

      <Block
        flex={1}
        style={{
          backgroundColor: '#4C1F6B',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          marginTop: marginMinus,
          paddingHorizontal: 10,
          paddingTop: 30,
        }}>
        <Text
          style={[
            LatoBold,
            {color: 'white', fontSize: 30, fontWeight: '600', padding: 10},
          ]}>
          Password Reset
        </Text>

        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.emailText}>Enter Email</Text>
            <TextInput
              style={{
                padding: 15,
                backgroundColor: 'white',
                fontSize: 16,
                borderRadius: 10,
                width: '100%',
              }}
              placeholder={'Enter Email Address'}
              placeholderTextColor={'darkgray'}
              onChangeText={text => {
                setEmail(text);
              }}
            />
          </View>

          <View style={styles.btnContainer}>
          {loading  ? (
        <ActivityIndicator color={"#fff"} size={'small'} />
    ) : (
            <AppButton
              style={styles.sendBtn}
              title="Send"
              onPress={() => {
                reset_pw();
              }}
            />
            )}
          </View>
          {!keyboardStatus && (
          <View style={styles.loginContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignIn');
              }}>
              <Text style={styles.loginText}>Log in</Text>
            </TouchableOpacity>
          </View>
          )}
        </View>
      </Block>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4C1F6B',
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
    marginHorizontal: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  emailText: {
    fontSize: 16,
    marginVertical: 10,
    color: '#fff',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  btnContainer: {
    marginHorizontal: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  sendBtn: {
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
    paddingVertical: 5,
    color: '#4C1F6B',
    fontSize: 20,
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
  },
  loginText: {
    color: 'orange',
    fontSize: 22,
  },
});

export default ForgotPassword;