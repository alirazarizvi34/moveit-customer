import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import AppButton from '../components/Button/AppButton';
import HeaderBack from '../components/Header/HeaderBack';
import IconFA from 'react-native-vector-icons/FontAwesome5';
import {GlobalContext} from '../../context/GlobalState';
import toastService from '../services/toast-service';
import {baseURL} from '../config/config';
import {useTranslation} from 'react-i18next';

function AddCreditScreen({navigation}) {
  const [walletAmount, setWalletAmount] = useState('');
  const [payCreditModal, setpayCreditModal] = useState(false);
  const {auth, setAuth, corporate} = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const {t, i18n} = useTranslation();

  const getPayment = async () => {
    if (walletAmount === '') {
      toastService.shortToast('Please Enter the Ammount First');
      return;
    }

    setLoading(true);

    const apiURL =
      auth?.role === 5
        ? baseURL + '/topup/request'
        : baseURL + '/topup/request';

    try {
      let resp = await fetch(apiURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth?.token,
        },
        body: JSON.stringify({
          amount: walletAmount,
          method: 'baf',
        }),
      });


      const contentType = resp.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        return resp.json().then(data => {
          setLoading(false);
          if (data.success) {
            setpayCreditModal(false);
            navigation.navigate('WebView', {id: data?.data?.topup_request?.id});
          } else {
          }
        });
      } else {
        return resp.text().then(text => {
          setLoading(false);
          toastService.shortToast('Error');
        });
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
      style={[{flex: 1}]}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#4C1F6B'}} />
      <SafeAreaView style={{flex: 1}}>
        <HeaderBack heading={t('Add Credit')} navigation={navigation} />
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.pkrtext}>{t('PKR')}</Text>
            <TextInput
              style={[
                styles.amountInput,
                i18n.language === 'urdu' && {textAlign: 'right'},
              ]}
              placeholder={t('Amount')}
              placeholderTextColor={'lightgrey'}
              value={walletAmount}
              onChangeText={value => setWalletAmount(value)}
              keyboardType={'numeric'}
              maxLength={8}
            />
          </View>

          <View style={styles.btnContainer}>
            <AppButton
              style={styles.submitBtn}
              title="Continue"
              onPress={() => {
                setWalletAmount(walletAmount);
                setpayCreditModal(true);
              }}
            />
          </View>
        </View>

        <Modal
          style={{height: 300, width: 300}}
          transparent={true}
          animationType={'slide'}
          visible={payCreditModal}>
          <View style={{flex: 1, justifyContent: 'flex-end', width: '100%'}}>
            <View style={styles.modalContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 15,
                  backgroundColor: '#4C1F6B',
                }}>
                <View style={{}}>
                  <Text
                    style={{fontSize: 26, fontWeight: 'bold', color: '#fff'}}>
                  {t('Add Credit')}
                  </Text>
                </View>

                <View style={{}}>
                  <TouchableOpacity
                    onPress={() => {
                      setpayCreditModal(false);
                    }}>
                    <IconFA name="times" color="#fff" size={25} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{marginTop: 40}} />

              <View style={{padding: 20}}>
                <View
                  style={{
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    width: '100%',
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    shadowColor: 'black',
                    shadowOpacity: 0.29,
                    shadowOffset: {width: 0, height: 3},
                    shadowRadius: 10,
                    borderRadius: 10,
                    elevation: 6,
                  }}>
                  <TouchableOpacity
                    style={{width: '100%'}}
                    onPress={() => {
                      getPayment();
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 10,
                        }}>
                        <IconFA name="credit-card" color="#4C1F6B" size={22} />
                        <Text
                          style={{
                            color: '#4C1F6B',
                            marginHorizontal: 10,
                            fontWeight: 'bold',
                          }}>
                          Add via Debit/Credit card
                        </Text>
                      </View>
                      <View>
                        {loading ? (
                          <ActivityIndicator size={'small'} color={'#4C1F6B'} />
                        ) : (
                          <IconFA
                            name="plus-square"
                            color="#4C1F6B"
                            size={22}
                          />
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 20}} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>
                    Credit
                  </Text>
                  <Text
                    style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>
                    PKR : {walletAmount}
                  </Text>
                </View>
              </View>

            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pkrtext: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#725287',
  },
  amountInput: {
    paddingVertical: 20,
    fontSize: 40,
    color: '#4C1F6B',
    fontWeight: 'bold',
  },
  btnContainer: {
    marginTop: 40,
    width: '80%',
    paddingHorizontal: 20,
  },
  submitBtn: {
    paddingVertical: 8,
    fontSize: 22,
    // color : '#633C7D',
  },
  modalContainer: {
    backgroundColor: '#4C1F6B',
    padding: 10,
    borderRadius: 20,
    width: '100%',
  },
});

export default AddCreditScreen;
