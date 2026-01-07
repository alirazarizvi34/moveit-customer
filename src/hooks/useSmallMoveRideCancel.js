import React, {useContext, useState} from 'react';
import {GlobalContext} from '../../context/GlobalState';
import relocationService from '../services/relocation-service';
import toastService from '../services/toast-service';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import analytics from '@react-native-firebase/analytics';
import {baseURL} from '../config/config';

export default useSmallMoveRideCancel = () => {
  const navigation = useNavigation();
  const {
    auth,
    setDriverBiddingList,
    setHasBid,
    setIsBidding,
    setBiddingAmount,
    setMyCurrentRideStatus,
    setMarkers,
    RideRequestId,
    setInitialCoordinates,
    setGlobalCoordinates,
    setGlobalVehicle,
    setGlobalLabours,
    setAttachPicture,
    myCurrentRideStatus,
    setRideRequestId,
    getGlobalRideId,
    setGlobalRideId
  } = useContext(GlobalContext);

  const [loadingState, setLoadingState] = useState(false);

  const cancelRideRequest = (screenName,reason=null) => {
    setLoadingState(true);
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.accessToken}`,
        Accept: 'application/json',
      },
    };

    let data = {
      ride_id: getGlobalRideId,
      cancellation_reason: reason
    };
    axios
      .post(baseURL + '/ride/cancel', data, config)
      .then(async function (response) {
        await analytics().logEvent('ridesearchCancel', {
          page: screenName,
        });
        toastService.shortToast(response?.data?.message);
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
        setDriverBiddingList([]);
        setMarkers([]);
        setLoadingState(false);
        navigation.navigate('Home');
      })
      .catch(function (error) {
        setLoadingState(false);
        toastService.shortToast(error?.response?.data?.message);
      });
  };

  return {cancelRideRequest, loadingState};
};
