import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import {GlobalContext} from '../../../context/GlobalState';
import toastService from '../../services/toast-service';
import GoogleMap from '../../components/GoogleMap/GoogleMap';
import useLocation from '../../hooks/useLocation';
import {useNavigationState} from '@react-navigation/native';
import {AppConstants} from '../../constants/AppConstants';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import geoService from '../../services/geo-service';
import MergnModule from '../../../MergnModule';
import useMergn from '../../hooks/useMergn';
import { Platform } from 'react-native';

export default RelocationPickUp = ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  const {
    auth,
    myLanguage,
    markers,
    setMarkers,
    setLocationState,
    setCity,
    locationPermission,
    setCurrentCoords,
    setShouldCallRelocationRequest,
    setCallApi,
    toolTip,
    setTooltip,
  } = useContext(GlobalContext);
  const {eventHandler, attributeHandler, uniqueIdentifierHandler} = useMergn();
  const {setCurrentLocationAddress,currentLocation} = useLocation();
  const cancelTokenRef = useRef(null);
  const [data, setData] = useState(null);
  // const [hasTooltip, setTooltip] = useState(true);
  const state = useNavigationState(state => state);

  useEffect(() => {
    if (state?.index == 1) {
      if (markers.length == 1) {
        setMarkers([]);
      }
    }
  }, [state]);

  useEffect(() => {
    if (locationPermission && !route?.params?.coords) {
      setCurrentLocationAddress();
    }
  }, [locationPermission, route?.params?.coords]);

  useEffect(() => {
    if (locationPermission && currentLocation) {
      if (!data) {
        setData(currentLocation);
      } else {
        setData({
          ...data,
          lat: currentLocation.lat,
          lon: currentLocation.lon,
          animateToRegion: currentLocation.animateToRegion,
        });
      }
    }
  }, [currentLocation]);

  useEffect(() => {
    if (route?.params?.coords) {
      setData(route?.params?.coords);
    }
  }, [route?.params?.coords]);

  const locationAddress = async (latitude, longitude) => {
    // Create a new CancelToken source
    cancelTokenRef.current = axios.CancelToken.source();

    let params = {
      latitude: latitude,
      longitude: longitude,
      language: myLanguage,
      serviceType: 'relocation',
    };

    if ((latitude < 0 && latitude > -1) || (longitude < 0 && longitude > -1)) {
      toastService.shortToast(
        AppConstants.toastMessages.location.locationCoordsFaulty,
      );
      return;
    }

    geoService
      .reverseGeocode(params, cancelTokenRef.current.token)
      .then(({data}) => {
        data.lat = latitude;
        data.lon = longitude;
        data.type = 'p';
        setCurrentCoords(pre => ({
          ...pre,
          title: !pre?.title ? data?.title : pre?.title,
        }));
        setData(data);
        setLocationState(data?.state);
        setCity(data?.city);
      })
      .catch(error => {
        if (error?.response) {
          toastService.shortToast(error?.response?.data);
        }
      });
  };

  const moveMaker = useCallback(
    async region => {
      let latitude;
      let longitude;
      if (region?.latitude == 0 || region?.longitude == 0) {
        latitude = currentLocation && currentLocation?.lat;
        longitude = currentLocation && currentLocation?.lon;
      } else {
        latitude = region?.latitude;
        longitude = region?.longitude;
      }

      if(currentLocation?.lat && currentLocation?.lon){
        locationAddress(latitude, longitude);
      }
      if(route?.params?.coords){
        locationAddress(latitude, longitude);
      }
    },
    [data],
  );

  const goToDropOff = async() => {
    // console.log('markers',data);
    
    const currentMarkerIndex = markers.findIndex(
      (val, index) => val.type == 'c',
    );
    if (currentMarkerIndex !== -1) {
      markers.splice(currentMarkerIndex, 1, data);
      markers[currentMarkerIndex].type = 'p';
      setMarkers([...markers]);
      setCallApi(true);
      setShouldCallRelocationRequest(true);
      navigation.navigate('RelocationAddresses');
      if(Platform.OS == 'android'){
      const eventMessage = await eventHandler('Pick-Up Address','city-type',data?.city);
      const attributeMessage = await attributeHandler('pick-up', data?.city);
      }
    } else {
      setMarkers(pre => [...pre, data]);
      navigation.navigate('RelocationDropOff');
      if(Platform.OS == 'android'){
      const eventMessage = await eventHandler('Pick-Up Address','city-type',data?.city);
      const attributeMessage = await attributeHandler('pick-up', data?.city);
      }
    }
  };

  const axiosRequestCancel = useCallback(() => {
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel('Request canceled by user.');
    }
  }, [cancelTokenRef.current]);

  const onPressClearText = () => {
    setData(null);
  };

  const toolTipBtnHandler = () => {
    setTooltip(pre => ({
      ...pre,
      relocationPickUp: {...pre.relocationPickUp, pickUpInputToolTip: false, isTrue:false},
    }));
  };

  return (
    <GoogleMap
      headerTitle={'pickup_address'}
      navigateBackTo={'RelocationPickUp'}
      inputPlaceHolder={t('enterThePickUpAddress')}
      navigation={navigation}
      data={data}
      onPress={setCurrentLocationAddress}
      onPressNavigation={goToDropOff}
      onRequestCancel={axiosRequestCancel}
      mapMover={region => moveMaker(region)}
      onPressClearText={onPressClearText}
      toolTipAllow={toolTip?.relocationPickUp?.pickUpInputToolTip}
      toolTipConentText={AppConstants.relocationPickUpTooltipText}
      toolTiponPress={toolTipBtnHandler}
    />
  );
};
