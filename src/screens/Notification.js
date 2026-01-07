import React, { useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { GlobalContext } from '../../context/GlobalState';
import HeaderBack from '../components/Header/HeaderBack';
import {useTranslation} from 'react-i18next';


const Notification = ({navigation}) => {
  const {notification} = useContext(GlobalContext);

  const {t, i18n} = useTranslation();


const renderNotification = (item) => {
   return (
    <View
    style={{
      margin: 15,
      borderRadius: 12,
      padding: 14,
      backgroundColor : '#4C1F6B',
      justifyContent : 'center',
    }}>
    <Text style={{fontWeight: 'bold', color: '#fff', fontSize : 16,}}>{item?.data?.title}</Text>
    <View
      style={{
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      }}>
     
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 9, color: '#fff', fontWeight: 'bold'}}>{new Date(item?.created_at).toDateString()}</Text>
      </View>
    </View>
  </View>
   );
};
  
  return (
    <>
    <SafeAreaView style={{flex: 0, backgroundColor: '#4C1F6B'}}/>
    <SafeAreaView>
      <HeaderBack heading={t('Notifications')} navigation={navigation} />
      <ScrollView contentContainerStyle={{marginVertical: 20, marginBottom: 50}}>
      {notification?.length > 0 ? (
          notification?.map((val, ind) => renderNotification(val))
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>{t('No Recent Notification')}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

export default Notification;
