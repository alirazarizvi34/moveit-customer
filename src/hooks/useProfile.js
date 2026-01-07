import React, {useContext, useState} from 'react';

import profileService from '../services/profile-service';
import toastService from '../services/toast-service';

import {GlobalContext} from '../../context/GlobalState';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIClient from '../services/api-client';
import {AppConstants} from '../constants/AppConstants';
import {APICONSTANTS} from '../constants/ApiConstants';
const useProfile = () => {
  const {auth, setAuth, setMyLanguage, setFcmToken, setIsFcmToken,setTooltip} = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const userLogout = async () => {
    let key =[
      'auth',
      'fcmToken',
      'toolTipData',
      'emailSendDateTime',
    ]
    await profileService
      .logout()
      .then(({data}) => {
        if (data?.status) {
          AsyncStorage.multiRemove(key);
          setAuth('');
          setFcmToken(null);
          setIsFcmToken(false);
          toastService.shortToast(data?.message);
          resetToolTipDataHandler();
          navigation.navigate('SignIn');
        } else {
          toastService.shortToast(data?.message);
        }
      })
      .catch(error => {
        toastService.shortToast(error?.response?.data?.message);
      });
  };

  const resetToolTipDataHandler = () => {
       setTooltip(pre => ({
          ...pre,
          relocationPickUp: {...pre.relocationPickUp,pickUpInputToolTip: false, isTrue: false},
          relocationDropOff: {...pre.relocationDropOff,dropOffInputToolTip: false, isTrue: false},
          relocationAddress: {...pre.relocationAddress,addressesToolTip: false, isTrue: false},
          pickupPropertyDetails: {...pre.pickupPropertyDetails,addressToolTip: false, stepCount: 1,isTrue: false},
          dropOffPropertyDetails: {...pre.dropOffPropertyDetails,addressToolTip: false, stepCount: 1,isTrue: false},
          relocationItemCategory: {...pre.relocationItemCategory,categoryToolTip: false, isTrue: false},
          relocationAdditionalServices: {...pre.relocationAdditionalServices,packingTypeToolTip: false, stepCount: 1, isTrue: false},
          relocationEstimatedQuote: {...pre.relocationEstimatedQuote,quoteBreakDownToolTip: false, isTrue: false},
        }));
  }

  const changeUserLanguage = async vID => {
    let languageData = {
      version_id: vID,
    };
    await profileService
      .changeLanguage(languageData)
      .then(result => {
        if (result?.data?.success) {
          AsyncStorage.setItem('lang', result?.data?.data?.language);
          setMyLanguage(result?.data?.data?.language);
          toastService.shortToast(result?.data?.message);
        } else {
          toastService.shortToast(result?.data?.message);
        }
      })
      .catch(error => {
        toastService.shortToast(error?.response?.data?.message);
      });
  };

  const userUpdateProfile = async profile => {
    setIsLoading(true);
    const profileData = new FormData();
    // Object.keys(profile).map(key => {
    //   if (key !== 'currentAvatar' && key!=="avatar") {
    //     profileData.append(key, profile[key]);
    //   }

    // });
    profileData.append('name', profile.name);
    profileData.append('avatar', profile?.avatar);
    profileData.append('email', profile.email);

    const headers = {
      'Content-Type': 'multipart/form-data;',
    };
    const apiClient = new APIClient(APICONSTANTS.updateProfile);
    await apiClient
      .post(profileData, headers)
      .then(async({data}) => {
        setIsLoading(false);
        let avatar = data?.data?.avatar;
        let name = data?.data?.name;
        let email = data?.data?.email;
        let is_email_verified = data?.data?.date_time ? data?.data?.is_email_verified : auth?.is_email_verified;
        if(data?.data?.date_time){
          await AsyncStorage.setItem('emailSendDateTime', data?.data?.date_time);
        }
        setAuth({...auth, name, avatar, email, is_email_verified});
        toastService.shortToast(data?.message);
        navigation.navigate('Profile');
      })
      .catch(error => {
        setIsLoading(false);

        toastService.shortToast(error?.response?.data?.message);
      });
  };

  return {userLogout, changeUserLanguage, userUpdateProfile, isLoading};
};

export default useProfile;
