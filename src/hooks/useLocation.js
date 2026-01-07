import React, {useContext, useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import toastService from '../services/toast-service';
import {GlobalContext} from '../../context/GlobalState';
import {reverseGeocode} from '../helperFunction/helperfunction';
import {AppConstants} from '../constants/AppConstants';

const useLocation = () => {

  const {auth, markers, setCurrentCoords,setLocationPermission} =
    useContext(GlobalContext);

  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    permissionAndgetMyCurrentLocation();
  }, []);

  const permissionAndgetMyCurrentLocation = async () => {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      if (auth === 'granted') {
        setLocationPermission(true);
      }
      return;
    }
    let granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted) {
      setLocationPermission(true);
    } else {
      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Accessing Permission',
          message: 'App needs access to your location',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setLocationPermission(true);
      } else {
        toastService.shortToast(
          AppConstants.toastMessages.location.locationPermissionDenied,
        );
      }
    }
  };

  const setCurrentLocationAddress = () => {
    Geolocation.getCurrentPosition(
      position => {
        let latitude = position?.coords?.latitude;
        let longitude = position?.coords?.longitude;
        if (latitude && longitude) {
          if (
            (latitude < 0 && latitude > -1) ||
            (longitude < 0 && longitude > -1)
          ) {
            toastService.shortToast(
              AppConstants.toastMessages.location.faultyCordinates,
            );
            return;
          }
        }
        setCurrentCoords({lat: latitude, lon: longitude});
        setCurrentLocation({
          lat: latitude,
          lon: longitude,
          animateToRegion: true,
        });
      },
      error => {},
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const markersSortHandler = () => {
    var sortedMarkers = {pickup: '', droppOff: []};

    if (Array.isArray(markers)) {
      for (let index = 0; index < markers.length; index++) {
        const marker = markers[index];
        if (marker.type == 'p') {
          sortedMarkers.pickup = marker;
        } else {
          sortedMarkers.droppOff.push(marker);
        }
      }
    }

    return sortedMarkers;
  };
  

  return {
    setCurrentLocationAddress,
    markersSortHandler,
    currentLocation
  };
};

export default useLocation;
