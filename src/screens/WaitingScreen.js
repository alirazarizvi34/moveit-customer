import React, {useContext, useState, useEffect} from 'react';
import {Text, TouchableOpacity, ImageBackground} from 'react-native';
import {Block} from 'galio-framework';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/AntDesign';
import SubPagesHeader from '../components/SubPagesHeader';
import {GlobalContext} from '../../context/GlobalState';
import toastService from '../services/toast-service';
import {baseURL} from '../config/config';

export default WaitingScreen = props => {
  const {auth, setAuth} = useContext(GlobalContext);

  const revalidate = async () => {
    try {
      let resp = await fetch(baseURL + 'token/revalidate', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      });
      let data = await resp.json();
      if (data.success) {
        if (data.data.auth.driver.verified) {
          toastService.shortToast('You are verified.');
          setAuth(data.data.auth);
        } else {
          toastService.shortToast('You are not yet verfied.');
        }
      } else {
        toastService.shortToast(data.message);
      }
    } catch (error) {
      toastService.shortToast('Error: ', error);
    }
  };
  useEffect(() => {
    revalidate();
  }, []);

  const {bgImage, waitingCard, clockIcon} = styles;
  return (
    <>
      <SubPagesHeader showLogout={true} />
      <Block flex={1} justifyContent={'center'} alignItems={'center'}>
        <ImageBackground
          source={require('../../assets/map.jpg')}
          style={[bgImage, {alignItems: 'center', justifyContent: 'center'}]}
          blurRadius={2}>
          <Block
            center
            justifyContent={'center'}
            alignItems={'center'}
            style={[waitingCard]}>
            <Icon name="clockcircleo" color={'orange'} style={clockIcon} />
            <Block style={{marginTop: 30}}></Block>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#4C1F6B'}}>
              Waiting for account to be approved...
            </Text>
            <TouchableOpacity
              onPress={() => {
                revalidate();
              }}
              style={{
                marginTop: 20,
                padding: 10,
                backgroundColor: 'orange',
                borderRadius: 10,
                paddingHorizontal: 30,
              }}>
              <Text
                style={{fontSize: 14, fontWeight: 'bold', color: '#4C1F6B'}}>
                Retry
              </Text>
            </TouchableOpacity>
          </Block>
        </ImageBackground>
      </Block>
    </>
  );
};

const styles = EStyleSheet.create({
  textStyle: {
    color: '#fff',
    fontSize: 20,
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  waitingCard: {
    backgroundColor: 'white',
    width: '90%',
    paddingVertical: '3.5rem',
    borderRadius: '1rem',
  },
  clockIcon: {
    marginTop: '1.5rem',
    fontSize: '11rem',
    color: '#FFBE50',
  },
});
