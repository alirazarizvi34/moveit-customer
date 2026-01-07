import React, {useContext} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import HeaderBack from '../components/Header/HeaderBack';
import TopTabNavigator from '../../navigation/TopTabNavigator';
import {GlobalContext} from '../../context/GlobalState';
import {useTranslation} from 'react-i18next';
import NewHeader from '../components/Header/NewHeader';

const MyTripsScreen = ({navigation,route}) => {
  const {t, i18n} = useTranslation();

  const {auth, setAuth} = useContext(GlobalContext);
  const activeTab = route?.params?.params?.activeTab
  return (
    <>
    <SafeAreaView style={{ flex: 1 }}>
      <NewHeader title={t('my_trips')} navigation={navigation} />
      <TopTabNavigator activeTab={activeTab}/>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default MyTripsScreen;
