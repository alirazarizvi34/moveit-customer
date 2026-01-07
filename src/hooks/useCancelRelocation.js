import React, {useContext, useState} from 'react';
import {GlobalContext} from '../../context/GlobalState';
import relocationService from '../services/relocation-service';
import toastService from '../services/toast-service';
import {useNavigation} from '@react-navigation/native';
import { AppConstants } from '../constants/AppConstants';

export default useCancelRelocation = () => {
  const navigation = useNavigation();
  const {
    setSelectedRelocationItems,
    setSelectedPropertyType,
    setPropertyType,
    setPickupPproTypeindex,
    setDropoffPproTypeindex,
    setEnableSegmentTab,
    setRelocationRequest,
    setMarkers,
    setRelocationSpaces,
    setDeliveryRequest
  } = useContext(GlobalContext);

  const [loadingState, setLoadingState] = useState(false);

  const cancelRelocationRequest = (id, index,request='relocation') => {
    setLoadingState(true);
    const data = {cancellation_reason_index: index};

    relocationService
      .cancelRelocationRequest(id, data)
      .then(({data}) => {
        if(request == 'delivery'){
          setMarkers([]);
          setDeliveryRequest(null);
          setSelectedRelocationItems([]);
          setSelectedPropertyType(null);
          setPropertyType(null);
        }else{       
          setMarkers([]);
          setRelocationRequest(null);
          setSelectedRelocationItems([]);
          setSelectedPropertyType(null);
          setPropertyType(null);
          setPickupPproTypeindex(null);
          setDropoffPproTypeindex(null);
          setEnableSegmentTab(false);
          setRelocationSpaces(AppConstants?.relocationSpaces);
        }
        toastService.shortToast(data?.message);
        navigation.navigate('Home');
      })
      .catch(error => {
        toastService.shortToast(error?.response?.data?.message);
        setLoadingState(false);
      });
  };

  return {cancelRelocationRequest, loadingState};
};
