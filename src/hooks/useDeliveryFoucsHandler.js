import React, {useContext, useEffect, useState} from 'react';
import UseFcmNotification from './UseFcmNotification';
import {GlobalContext} from '../../context/GlobalState';
import { AppConstants } from '../constants/AppConstants';

const useDeliveryFoucsHandler = ({navigation}) => {

  const {fcmData,setFcmData} = UseFcmNotification();
  const {
    setEnableSegmentTab,
    setDropoffPproTypeindex,
    setPickupPproTypeindex,
    setPropertyType,
    setSurveyId,
    setMarkers,
    setRelocationRequest,
    setSelectedRelocationItems,
    setSelectedPropertyType,
    setRelocationSpaces,
    setDeliveryRequest
  } = useContext(GlobalContext);
  const [relocationData,setRelocationData] = useState(null);

  useEffect(() => {
    if (fcmData) {
      fcmNavigationHandler();
    }
  }, [fcmData]);

  const fcmNavigationHandler = () => {
    if (fcmData?.relocation_id && fcmData?.moving_type == 'delivery') {
      if (fcmData?.id == 'quotation_update') {
        setRelocationData(fcmData);
      }

      if(fcmData.id == "relocation_date_update") {
        setRelocationData(fcmData);
      }

      if (fcmData?.status != 'cancelled') {
        setSurveyId(fcmData?.relocation_id);
        setDeliveryRequest(pre => ({
          ...pre,
          status: fcmData?.status,
          invoice: fcmData.invoice ? JSON.parse(fcmData.invoice) : pre.invoice,
        }));

        if (fcmData?.status == 'completed')
            clearDeliveryRequestData();
        if (fcmData?.status == 'pending') {
          navigation.navigate('RelocationQuoteBreakDown', {response: fcmData});
        }
        
        if (fcmData?.status == 'completed') {
          fcmData.navigateBackTo = 'Home';
          navigation.navigate('RelocationBookingDetails', {response: fcmData});
        } else if (fcmData?.status == 'in_progress' || fcmData?.status == 'moving_in_progress') {
          navigation.navigate('DeliveryProgress', {response: fcmData});
        }
      } else {
        clearDeliveryRequestData();
        navigation.navigate('Home');
      } 
    }
  };


  const clearDeliveryRequestData = () => {
    setSurveyId(null);
    // setMarkers([]);
    setDeliveryRequest(null);
    setSelectedRelocationItems([]);
    setSelectedPropertyType(null);
    setPropertyType(null);
  }

  return {relocationData,setFcmData,fcmNavigationHandler};
};

export default useDeliveryFoucsHandler;
