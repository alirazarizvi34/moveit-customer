import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default useClearAuth = () => {
    const {setMarkers,setGlobalRideId, setInitialCoordinates, setGlobalCoordinates, setGlobalVehicle, setGlobalLabours, setAttachPicture, myCurrentRideStatus, setRideRequestId, setAuth, markers } = useContext(GlobalContext);
    const clearAuthData = () => {
        setInitialCoordinates(null),
        setGlobalCoordinates(null),
        setGlobalVehicle(null),
        setGlobalLabours(0),
        setAttachPicture([]),
        myCurrentRideStatus(false),
        setRideRequestId(null),
        setGlobalRideId(null),
        setMarkers([]),
        AsyncStorage.removeItem('auth'),
        setAuth('');
    }

    return {
        clearAuthData,
    }
};

