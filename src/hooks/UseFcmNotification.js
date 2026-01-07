import React, {useContext, useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {useRoute} from '@react-navigation/native';
import {GlobalContext} from '../../context/GlobalState';
import toastService from '../services/toast-service';
import relocationService from '../services/relocation-service';
import { AppConstants } from '../constants/AppConstants';

const UseFcmNotification = (
  setRelocationNotification = () => {},
  relocationNotification = null,
) => {
  const {
    auth,
    setEnableSegmentTab,
    setDropoffPproTypeindex,
    setPickupPproTypeindex,
    setPropertyType,
    setSelectedPropertyType,
    setSelectedRelocationItems,
    setSurveyId,
    setMarkers,
    setRelocationRequest,
    setRelocationSpaces,
    setDeliveryRequest
  } = useContext(GlobalContext);
  const [fcmData, setFcmData] = useState(null);
  const RouteName = useRoute();

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  useEffect(() => {
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then(fcmToken => {});
    }
    // } else console.log('Not Authorization status:', authStatus);

    const onNotificationOpenedApp = messaging().onNotificationOpenedApp(
      async remoteMessage => {
        if (remoteMessage) {
          const result = await remoteMessage;

          if (result) {
            setFcmData({...result?.data, message: result?.notification?.body});
          }
        }
      },
    );
    const unSubscribeBackground = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        const result = await remoteMessage;
        if (result) {
          setFcmData({...result?.data, message: result?.notification?.body});
          if (
            result?.data?.id == 'status_changed_to_draft' ||
            result?.data?.id == 'survey_canceled' ||
            result?.data?.id == 'status_changed_to_in_progress' || 
            result?.data.status == 'pending' ||
            result?.data?.id == 'manual_relocation_query'
          ) {
            getCurrentRelocation();
          }
        }
      },
    );

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const result = await remoteMessage;
      if (result && RouteName.name !== 'Home') {
        setFcmData({...result?.data, message: result?.notification?.body});
      }
      if (RouteName.name == 'Home') {
        if (
          result?.data?.status == 'cancelled' ||
          result?.data?.status == 'completed'
        ) {
          if(result?.data?.moving_type == 'relocation'){
            clearRelocationRequestData();
            return;
          }else{
            clearDeliveryRequestData();
            return;
          }
        }
        setRelocationRequest(pre => ({
          ...pre,
          id: result?.data?.relocation_id,
          status: result?.data?.status,
          invoice: result?.data.invoice
            ? JSON.parse(result?.data?.invoice)
            : pre?.invoice,
        }));
        if (
          result?.data?.id == 'relocation_date_update' &&
          result?.data?.relocation_id
        ) {
          setFcmData({...result?.data, message: result?.notification?.body});
        }
        if (
          result?.data?.id == 'status_changed_to_draft' ||
          result?.data?.id == 'survey_canceled' ||
          result?.data?.id == 'manual_relocation_query'
        ) {
          setFcmData({...result?.data, message: result?.notification?.body});
        }
      }
      if (result?.notification?.body) {
        toastService.shortToast(result?.notification?.body);
        result.notification.body = null;
      }
    });
  }, []);

  const clearRelocationRequestData = () => {    
    setSurveyId(null);
    // setMarkers([]);
    setRelocationRequest(null);
    setRelocationSpaces(AppConstants?.relocationSpaces);
    setSelectedRelocationItems([]);
    setSelectedPropertyType(null);
    setPropertyType(null);
    setPickupPproTypeindex(null);
    setDropoffPproTypeindex(null);
    setEnableSegmentTab(false);
  };

  const clearDeliveryRequestData = () => {
    setSurveyId(null);
    // setMarkers([]);
    setDeliveryRequest(null);
    setSelectedRelocationItems([]);
    setSelectedPropertyType(null);
    setPropertyType(null);
  }

  const getCurrentRelocation = async () => {
    if (auth) {
      let headers = {
        Authorization: `Bearer ${auth?.accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      relocationService
        .currentRelocation(headers)
        .then(({data}) => {
          let response = data?.data;
          if (relocationNotification) {
            setSurveyId(response?.id);
          } else {
            if (Object.keys(response?.delivery).length > 0) {
              setDeliveryRequest(response?.delivery);
              // setMarkers(pre => [
              //   {...response?.delivery?.pickup_location},
              //   {...response?.delivery?.dropoff_location},
              // ]);
            }else{
              setDeliveryRequest(null);
            }
            if (response?.id) {
            setRelocationRequest(response);
            setMarkers(pre => [
              {...response?.pickup_location},
              {...response?.dropoff_location},
            ]);
          }
          }
        })
        .catch(error => {
          setRelocationNotification(false);
          clearRelocationRequestData();
        });
    }
  };

  return {fcmData, setFcmData};
};

export default UseFcmNotification;
