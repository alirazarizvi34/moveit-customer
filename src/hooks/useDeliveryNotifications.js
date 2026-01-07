import {View, Text} from 'react-native';
import React, {useContext, useEffect} from 'react';
import UseFcmNotification from './UseFcmNotification';
import {GlobalContext} from '../../context/GlobalState';
import {useNavigation} from '@react-navigation/native';
import { AppConstants } from '../constants/AppConstants';

const useDeliveryNotifications = () => {
  const {fcmData} = UseFcmNotification();
  const navigation = useNavigation();
  const {
    relocationRequest,
    setSelectedRelocationItems,
    setSelectedPropertyType,
    setPropertyType,
    deliveryRequest,
    setPickupPproTypeindex,
    setDropoffPproTypeindex,
    setEnableSegmentTab,
    setRelocationRequest,
    setMarkers,
    setDeliveryRequest,
    setRelocationSpaces,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (fcmData) {
      if (fcmData?.id == 'quotation_update' && fcmData?.moving_type == 'delivery') {
        const invoice = JSON.parse(fcmData.invoice);
        const deliveryRequestData = {...deliveryRequest};
        deliveryRequestData.invoice = invoice;
        deliveryRequestData.is_negotiated = 1;
        deliveryRequestData.status = fcmData.status;
        setDeliveryRequest(deliveryRequestData);
        const packingType = fcmData?.packaging_type;
        navigation.popToTop(); //popToTop remove all screen in the existing stack except the first one
        if (packingType == 'premium') {
          navigation.navigate('RelocationRevisedQuote');
        } else {
          navigation.navigate('DeliveryNonPremiumRevisedQuote');
        }
      } else if (fcmData?.id == 'survey_canceled' && fcmData?.moving_type == 'delivery') {
        navigation.navigate('Home');
        // setMarkers([]);
        setDeliveryRequest(null);
        setSelectedPropertyType(null);
        setSelectedRelocationItems([]);
        setPropertyType(null);
      }
    }
  }, [fcmData]);

  return {};
};

export default useDeliveryNotifications;
