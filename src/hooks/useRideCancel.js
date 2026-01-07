import React, {useContext, useEffect} from 'react';
import {GlobalContext} from '../../context/GlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import toastService from '../services/toast-service';
import { useNavigation } from '@react-navigation/native';

export default useRideCancel = () => {
  
  const navigation = useNavigation();
  const {
    setBiddingAmount,
    setHasBid,
    setIsBidding,
    setDriverBiddingList,
    setMarkers,
    setGlobalRideId,
    setInitialCoordinates,
    setGlobalCoordinates,
    setGlobalVehicle,
    setGlobalLabours,
    setAttachPicture,
    myCurrentRideStatus,
    setRideRequestId,
    setAuth,
    markers,
  } = useContext(GlobalContext);

  const rideCancelled = (message) => {
    setDriverBiddingList([]);
    setInitialCoordinates(null);
    setGlobalCoordinates(null);
    setGlobalVehicle(null);
    setGlobalLabours(0);
    setAttachPicture([]);
    myCurrentRideStatus(false);
    setRideRequestId(null);
    setGlobalRideId(null);
    setIsBidding(0);
    setHasBid(0);
    setBiddingAmount(null);
    setMarkers([]);
    toastService.shortToast(message);
    // toastService.shortToast(result?.notification?.body);
    navigation.navigate('Home');
  };

  return {
    rideCancelled,
  };
};
