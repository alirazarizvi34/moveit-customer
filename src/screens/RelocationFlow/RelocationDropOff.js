import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import {GlobalContext} from '../../../context/GlobalState';
import toastService from '../../services/toast-service';
import useLocation from '../../hooks/useLocation';
import {AppConstants} from '../../constants/AppConstants';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import geoService from '../../services/geo-service';
import axios from 'axios';
import GoogleMap from '../../components/GoogleMap/GoogleMap';
import useMergn from '../../hooks/useMergn';
import { Platform } from 'react-native';

export default RelocationDropOff = ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  const isFocused = useIsFocused();
  const {
    markers,
    myLanguage,
    setMarkers,
    locationPermission,
    setCurrentCoords,
    setCallApi,
    setShouldCallRelocationRequest,
    toolTip,
    setTooltip,
  } = useContext(GlobalContext);
  const {setCurrentLocationAddress, currentLocation} = useLocation();
  const {eventHandler, attributeHandler, uniqueIdentifierHandler} = useMergn();
  const cancelTokenRef = useRef(null);
  const [data, setData] = useState(null);
  // const [hasTooltip, setTooltip] = useState(true);
  const [process, setProcess] = useState(true); //For navigation process only

  useEffect(() => {
    if (isFocused) {
      setProcess(true);
    }
  }, [isFocused]);

  useEffect(() => {
    if (!route?.params?.coords && locationPermission) {
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
        data.type = 'd';
        setData(data);
        setCurrentCoords(pre => ({
          ...pre,
          title: !pre?.title ? data?.title : pre?.title,
        }));
      })
      .catch(error => {
        if (error?.response) {
          toastService.shortToast(error?.response?.data);
        }
      });
  };

  const MoveMaker = useCallback(
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
      locationAddress(latitude, longitude);
    },
    [data],
  );

  const goToRelocationAddress = async() => {
    setProcess(false);
    const currentMarkerIndex = markers.findIndex(
      (val, index) => val.type == 'c',
    );
    if (currentMarkerIndex !== -1) {
      markers.splice(currentMarkerIndex, 1, data);
      markers[currentMarkerIndex].type = 'd';
      setMarkers([...markers]);
    } else {
      setMarkers(pre => [...pre, data]);
    }
    setCallApi(true);
    setShouldCallRelocationRequest(true);
    navigation.popToTop();
    navigation.navigate('RelocationAddresses');
    if(Platform.OS == 'android'){
      const eventMessage = await eventHandler('Drop-off Address');
      const attributeMessage = await attributeHandler('drop-off', data?.city);
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
      relocationDropOff: {...pre.relocationDropOff, dropOffInputToolTip: false, isTrue:false},
    }));
  };

  return (
    <GoogleMap
      headerTitle={'droppoff_address'}
      navigateBackTo={'RelocationDropOff'}
      inputPlaceHolder={t('enterTheDropOffAddress')}
      navigation={navigation}
      data={data}
      onPress={setCurrentLocationAddress}
      onPressNavigation={() => process && goToRelocationAddress()}
      onRequestCancel={axiosRequestCancel}
      mapMover={region => MoveMaker(region)}
      onPressClearText={onPressClearText}
      toolTipAllow={toolTip?.relocationDropOff?.dropOffInputToolTip}
      toolTipConentText={AppConstants.relocationDropOffTooltipText}
      toolTiponPress={toolTipBtnHandler}
    />
  );
};
