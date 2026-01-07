import React, {useState, useContext, useEffect, useRef} from 'react';
import {GlobalContext} from '../../context/GlobalState';
import relocationService from '../services/relocation-service';
import toastService from '../services/toast-service';
import analytics from '@react-native-firebase/analytics';
import {useNavigation} from '@react-navigation/native';
import { AppConstants } from '../constants/AppConstants';

export default useRelocations = () => {
  const {
    getSurveyId,
    setRelocationRequest,
    setSurveyId,
    relocationRequest,
    setRelocationSpaces,
    relocationSpaces,
  } = useContext(GlobalContext);
  const navigation = useNavigation();
  const [getLoader, setLoader] = useState(false);
  const [apiCall, setApiCall] = useState(false);

  const acceptSurveyHandler = async () => {
    setLoader(true);
    await relocationService
      .acceptSurvey(getSurveyId)
      .then(async ({data}) => {
        await analytics().logEvent('quoteAccept');
        let response = data?.data;
        setRelocationRequest(pre => ({...pre, status: response?.status}));
        setSurveyId(response?.id);
        toastService.shortToast(data?.message);
        navigation.navigate('RelocationSurveyQuote', (response = {response}));
      })
      .catch(error => {
        setLoader(false);
        toastService.shortToast(error?.response?.data?.message);
      });
  };

  const declineSurveyHandler = async () => {
    setLoader(true);
    await relocationService
      .declineSurvey(getSurveyId)
      .then(async response => {
        await analytics().logEvent('quoteReject'), setSurveyId(null);
        setRelocationRequest(null);
        setRelocationSpaces(AppConstants?.relocationSpaces);
        toastService.shortToast(response?.data?.message);
        navigation.navigate('Home');
        setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        toastService.shortToast(error?.response?.data?.message);
      });
  };

  const SpacesPostHandler = async data => {
    setLoader(true);
    await relocationService
      .spaces(data)
      .then(async ({data}) => {
        
        setRelocationRequest(pre => ({
          ...pre,
          moving_type: 'move_everything'
        }));
        toastService.shortToast(data?.message);
        navigation.navigate('RelocationItemCategories',{previousScreen: 'RelocationSpaces'});
        setLoader(false);
        setApiCall(false);
      })
      .catch(error => {
        setLoader(false);
        toastService.shortToast(error?.response?.data?.message);
      });
  };

  const getSelectedSpacesHandler = async relocationId => {
    await relocationService
      .getSelectedspaces(relocationId)
      .then(async ({data}) => {
        const updatedSpaces = relocationSpaces.map(item => {
          const space = data?.data?.spaces.find(
            space => space?.name.toLowerCase() === item?.name,
          );
          if (space) {
            return {
              ...item,
              count: space?.count,
              [`${item.name}_packing`]: space?.packing_required,
            };
          }

          return item; // If no matching space found, return item unchanged
        });

        setRelocationSpaces(updatedSpaces);
      })
      .catch(error => {
        // toastService.shortToast(error?.response?.data?.message);
      });
  };

  const onSpaceCountIncreaseHandler = data => {
    setApiCall(true);
    setRelocationSpaces(prevItems =>
      prevItems.map(item => {
        if (item?.name === data?.name) {
          const newCount = item?.count + 1;
          return {...item, count: newCount};
        }
        return item;
      }),
    );
  };

  const onSpaceCountDecreaseHandler = data => {
    setApiCall(true);
    setRelocationSpaces(prevItems =>
      prevItems.map(item => {
        if (item?.name === data?.name) {
          const newCount = item?.count - 1;
          if (newCount === 0) {
            const packingField = `${item?.name}_packing`;
            return {...item, count: newCount, [packingField]: 0};
          }
          return {...item, count: newCount};
        }
        return item;
      }),
    );
  };

  const getPwaLink = async (id) => {
    setLoader(true);
    const pwa_link = new Promise((resolve, reject) => {
      relocationService
        .pwaLink(id)
        .then(({data}) => {
          setLoader(false);
          if (data?.data?.is_advance_paid) {
            resolve(true);
          } else {
            if (data?.data?.pwa_link) {
              navigation.navigate(
                'WebView',
                (data = {pwa: data?.data?.pwa_link}),
              );
            } else {
              toastService.shortToast('Can`t proceed to payment');
            }
          }
        })
        .catch(error => {
          setLoader(false);
          toastService.shortToast(error?.response?.data?.message);
        });
    });
    return pwa_link;
  };

  return {
    acceptSurveyHandler,
    declineSurveyHandler,
    getPwaLink,
    SpacesPostHandler,
    getSelectedSpacesHandler,
    onSpaceCountIncreaseHandler,
    onSpaceCountDecreaseHandler,
    getLoader,
    setApiCall,
    apiCall,
  };
};
