import React, {useContext, useEffect, useState} from 'react';
import UseFcmNotification from './UseFcmNotification';
import {GlobalContext} from '../../context/GlobalState';
import { AppConstants } from '../constants/AppConstants';

const useRelocationFoucsHandler = ({navigation}) => {

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
  } = useContext(GlobalContext);
  const [relocationData,setRelocationData] = useState(null);

  useEffect(() => {
    if (fcmData) {
      fcmNavigationHandler();
    }
  }, [fcmData]);

  const fcmNavigationHandler = () => {
    if (fcmData?.relocation_id && fcmData?.moving_type == 'relocation') {
      if (fcmData?.id == 'quotation_update') {
        setRelocationData(fcmData);
      }

      if(fcmData.id == "relocation_date_update") {
        setRelocationData(fcmData);
      }

      if (fcmData?.status != 'cancelled') {
        setSurveyId(fcmData?.relocation_id);
        setRelocationRequest(pre => ({
          ...pre,
          status: fcmData?.status,
          invoice: fcmData.invoice ? JSON.parse(fcmData.invoice) : pre.invoice,
        }));

        if (fcmData?.status == 'completed')
          clearRelocationRequestData();
        if (fcmData?.status == 'pending') {
          navigation.navigate('RelocationQuoteBreakDown', {response: fcmData});
        }
        
        if (fcmData?.status == 'completed') {
          fcmData.navigateBackTo = 'Home';
          navigation.navigate('RelocationBookingDetails', {response: fcmData});
        } else if (fcmData?.status == 'in_progress' || fcmData?.status == 'moving_in_progress') {
          navigation.navigate('RelocationProgress', {response: fcmData});
        }
      } else {
        clearRelocationRequestData();
        navigation.navigate('Home');
      } 
    }
  };

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

  return {relocationData,setFcmData,fcmNavigationHandler};
};

export default useRelocationFoucsHandler;
