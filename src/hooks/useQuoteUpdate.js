import {View, Text} from 'react-native';
import React, {useContext, useEffect} from 'react';
import UseFcmNotification from './UseFcmNotification';
import {GlobalContext} from '../../context/GlobalState';
import {useNavigation} from '@react-navigation/native';
import { AppConstants } from '../constants/AppConstants';

const useQuoteUpdate = () => {
  const {fcmData} = UseFcmNotification();
  const navigation = useNavigation();
  const {
    relocationRequest,
    setSelectedRelocationItems,
    setSelectedPropertyType,
    setPropertyType,
    setPickupPproTypeindex,
    setDropoffPproTypeindex,
    setEnableSegmentTab,
    setRelocationRequest,
    setMarkers,
    setRelocationSpaces,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (fcmData) {
      if (fcmData?.id == 'quotation_update' && fcmData?.moving_type == 'relocation') {
        const invoice = JSON.parse(fcmData.invoice);
        const relocationData = {...relocationRequest};
        relocationData.invoice = invoice;
        relocationData.is_negotiated = 1;
        relocationData.status = fcmData.status;
        setRelocationRequest(relocationData);
        const packingType = fcmData?.packaging_type;
        navigation.popToTop(); //popToTop remove all screen in the existing stack except the first one
        if (packingType == 'premium') {
          navigation.navigate('RelocationRevisedQuote');
        } else {
          navigation.navigate('RelocationNonPremiumRevisedQuote');
        }
        // navigation.reset({
        //   index: 1,
        //   routes: [{name: 'Home'}, {name: 'RelocationRevisedQuote'}],
        // });
      } else if (fcmData?.id == 'survey_canceled' && fcmData?.moving_type == 'relocation') {
        navigation.navigate('Home');
        // setMarkers([]);
        setRelocationRequest(null);
        setRelocationSpaces(AppConstants?.relocationSpaces);
        setSelectedRelocationItems([]);
        setSelectedPropertyType(null);
        setPropertyType(null);
        setPickupPproTypeindex(null);
        setDropoffPproTypeindex(null);
        setEnableSegmentTab(false);
      }
    }
  }, [fcmData]);

  return {};
};

export default useQuoteUpdate;
