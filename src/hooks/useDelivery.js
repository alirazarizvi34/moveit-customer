import React, {useState, useContext, useEffect, useRef} from 'react';
import {GlobalContext} from '../../context/GlobalState';
import relocationService from '../services/relocation-service';
import toastService from '../services/toast-service';
import analytics from '@react-native-firebase/analytics';
import {useNavigation} from '@react-navigation/native';
import { AppConstants } from '../constants/AppConstants';

export default useDelivery = () => {
  const {
    getSurveyId,
    setRelocationRequest,
    setSurveyId,
    relocationRequest,
    setRelocationSpaces,
    relocationSpaces,
  } = useContext(GlobalContext);
  const navigation = useNavigation();
  const [getLoader, setLoader] = useState(false);
  const [apiCall, setApiCall] = useState(false);


  const getPwaLink = async (id) => {
    setLoader(true);
    const pwa_link = new Promise((resolve, reject) => {
      relocationService
        .pwaLink(id)
        .then(({data}) => {
          setLoader(false);
          if (data?.data?.is_advance_paid) {
            resolve(true);
          } else {
            if (data?.data?.pwa_link) {
              navigation.navigate(
                'WebView',
                (data = {pwa: data?.data?.pwa_link, request:'delivery'}),
              );
            } else {
              toastService.shortToast('Can`t proceed to payment');
            }
          }
        })
        .catch(error => {
          setLoader(false);
          toastService.shortToast(error?.response?.data?.message);
        });
    });
    return pwa_link;
  };

  return {
    getPwaLink,
    getLoader,
    setApiCall,
    apiCall,
  };
};
