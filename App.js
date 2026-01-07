import React, { useEffect } from 'react';
import {Platform, StatusBar} from 'react-native';
import AppNavigation from './navigation/AppNavigation';
import {GlobalProvider} from './context/GlobalState';
import { AppEventsLogger,Settings } from 'react-native-fbsdk-next';

export default App = () => {

  return (
    <>
      <StatusBar
        backgroundColor="#fff"
        barStyle="dark-content" // Here is where you change the font-color
      />
      <GlobalProvider>
        <AppNavigation />
      </GlobalProvider>
    </>
  );
};



