import React, {useContext, useEffect, useState, useCallback} from 'react';
import moment from 'moment';
import appService from '../services/app-service';
import {GlobalContext} from '../../context/GlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppConstants} from '../components/constants/AppConstants';
import {version} from '../../package.json';

const UseBootMeUp = () => {
  const {setBootMeUpData, bootMeUpData} = useContext(GlobalContext);
  const currentTime = moment();
  const [apiSuccess, setApiSuccess] = useState(false);
  const [splashScreenShow, setsplashScreenShow] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('setBootMeUpData').then(value => {
      if (!value) {
        bootMeUp();
      } else {
        const result = JSON.parse(value);
        setBootMeUpData(result);
        setsplashScreenShow(false);
        // SplashScreen.hide();
      }
    });
  }, []);

  useEffect(() => {
    checkAppUpdateStatus();
  }, []);
  useEffect(() => {
    if (bootMeUpData) {
      const endTime = moment(parseInt(bootMeUpData?.BootMeUpExpiry));
      let diferenceInMilsec = endTime.diff(currentTime);
      diferenceInMilsec = diferenceInMilsec > 0 ? diferenceInMilsec : 0;
      if (diferenceInMilsec <= 0) {
        bootMeUp();
      }
    }
  }, [bootMeUpData]);

  const expiryTime = moment
    .utc(moment(), 'HHmmss')
    .add(AppConstants.bootMeUpExpiryTimeDuration, 'minutes');

  const checkAppUpdateStatus = () => {
    if (version !== bootMeUpData?.app_version) {
      bootMeUp();
    }
  };
  const bootMeUp = async () => {
    const config = {
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
    };
    await appService
      .bootMeUp(config)
      .then(({data}) => {
        setsplashScreenShow(false);
        let response = data?.data;
        response.BootMeUpExpiry = `${expiryTime}`;
        // AsyncStorage.setItem('appVersion', version);left for further testing
        dataAppend({AsyncStorage: true, response});
        setApiSuccess(true);
      })
      .catch(error => {
        // toastService.shortToast(error?.response?.data?.message);
      });
  };

  const dataAppend = data => {
    setBootMeUpData(data.response);
    if (data.AsyncStorage) {
      AsyncStorage.setItem('setBootMeUpData', JSON.stringify(data.response));
    }
  };
  return {apiSuccess, splashScreenShow};
};

export default UseBootMeUp;
