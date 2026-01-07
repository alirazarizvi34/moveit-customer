import React, {useState, useContext} from 'react';
import {
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Block} from 'galio-framework';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SubPagesHeader from '../components/SubPagesHeader';
import {GlobalContext} from '../../context/GlobalState';
import toastService from '../services/toast-service';
import Button from '../components/Button';
import {useTranslation} from 'react-i18next';
import {baseURL} from '../config/config';

export default ReferCodeScreen = ({navigation, route}) => {
  const {auth, setAuth} = useContext(GlobalContext);
  const {t, i18n} = useTranslation();

  const [referCode, setReferCode] = useState('');

  const sendReferCode = async () => {
    try {
      let res = await fetch(baseURL + 'user/affiliate_by', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        },
        body: JSON.stringify({
          affiliate_by: referCode,
        }),
      });
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        return res.json().then(data => {
          if (data.success) {
            toastService.shortToast(data.message);
            navigation.navigate('UpdateProfile');
          } else {
            toastService.shortToast(data.message);
          }
        });
      } else {
        return res.text().then(text => {
          toastService.shortToast('Error');
        });
      }
    } catch (error) {
      toastService.shortToast(error.message);
    }
  };

  const skipPage = () => {
    navigation.navigate('UpdateProfile');
  };

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#4C1F6B'}} />
      <SafeAreaView style={{flex: 1}}>
        <SubPagesHeader
          showGoBack={auth && auth.basic_info ? true : false}
          navigation={navigation}
          title={t('Invitation Code')}
          showLogout={false}
        />
        <ScrollView>
          <Block style={{marginHorizontal: 20, marginTop: 30}}>
            <Block style={{marginTop: 30}}></Block>
            <Block
              flexDirection={'row'}
              alignItems={'center'}
              style={{
                borderColor: '#C4C4C4',
                borderWidth: 1,
                backgroundColor: 'white',
                borderRadius: 7,
              }}>
              <Icon
                style={{marginLeft: 10}}
                name="percentage"
                size={30}
                color="orange"
              />
              <TextInput
                style={[
                  {
                    padding: 15,
                    flex: 1,
                    backgroundColor: 'white',
                    fontSize: 16,
                    borderRadius: 10,
                  },
                ]}
                placeholder={t('Discount Code')}
                placeholderTextColor="#333"
                // keyboardType={'decimal-pad'}
                onChangeText={text => {
                  setReferCode(text);
                }}
                value={referCode}
              />
            </Block>
          </Block>
        </ScrollView>
        <Block style={{marginHorizontal: 30, marginBottom: 10}}>
          <Button
            title={t('Update')}
            pressFunc={sendReferCode}
            color={'#4C1F6B'}
          />
        </Block>
        <Block style={{marginHorizontal: 30, marginBottom: 10}}>
          <Button title={t('Skip')} pressFunc={skipPage} color={'#4C1F6B'} />
        </Block>
      </SafeAreaView>
    </>
  );
};

const styles = EStyleSheet.create({
  textStyle: {
    color: '#fff',
    fontSize: 20,
  },
});
