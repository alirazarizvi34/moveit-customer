import React, {useContext, useState} from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Block, Text, Toast} from 'galio-framework';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GlobalContext} from '../../context/GlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

export default Footer = (props) => {
  const {setAuth, activeRide} = useContext(GlobalContext);

  const {footerLogo, footerLogoWrapper, footerBody, footerText} = styles;
  const {notificationLabel, notificationText} = styles;
  const [count, setCount] = useState(0);
  const {navigation} = props;
  const {t, i18n} = useTranslation();

  const logOut = async () => {
    await AsyncStorage.removeItem('auth');
    setAuth('');
    navigation.replace('SignIn');
  };

  return (
    <Block
      flexDirection={'row'}
      space={'between'}
      style={[footerBody, {width: '100%', backgroundColor: 'white', paddingHorizontal: 20}]}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        <Block center flexDirection={'column'}>
          <Icon name={'user'} color={'#4c1f6b'} size={25} />

          <Text style={{fontSize: 10}}>{t('Profile')}</Text>
        </Block>
      </TouchableOpacity>

      <TouchableOpacity
        // onPress={() => {
        //   if (activeRide) {
        //     navigation.navigate('OngoingRide');
        //   } else {
        //     navigation.navigate('MapScreen');
        //   }
        // }}
        style={[footerLogoWrapper]}>
        <Image
          source={require('../../assets/icons/footermap.png')}
          style={[footerLogo]}
        />

        <Text style={[footerText]}> {t('Continue')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation?.navigate('Notification');
        }}>
        <Block center flexDirection={'column'}>
          <Icon name={'bell-o'} color={'#4c1f6b'} size={25} />
          <Block style={[notificationLabel]}>
            <Text style={[notificationText]} center>
              {count}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    </Block>
  );
};

const styles = StyleSheet.create({
  footerIcons: {
    fontSize: 14,
  },
  spaceAround: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  footerLogo: {
    zIndex: 2,
    borderRadius: 50,
    width: 70,
    height: 70,
  },
  footerLogoWrapper: {
    marginTop: -40,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  footerBody: {
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    alignItems: 'center'
  },
  footerText: {
    color: '#4d226e',
    fontWeight: 'bold',
    fontSize: 14,
    paddingBottom: 12,
  },
  notificationLabel: {
    borderRadius: 50,
    backgroundColor: '#4d226e',
    padding: 5,
    paddingHorizontal: 5,
    top: -15,
    position: 'absolute',
    right: 10,
  },
  notificationText: {
    color: 'white',
    fontSize: 10,
  },
});

