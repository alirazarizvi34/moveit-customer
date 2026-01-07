import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {View, SafeAreaView, BackHandler, Platform, Text} from 'react-native';
import NewHeader from '../../../components/Header/NewHeader';
import {useTranslation} from 'react-i18next';
import {GlobalContext} from '../../../../context/GlobalState';
import {getStyles} from './styles';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import PickupPropertyDetails from '../../../components/RelocationComponents/RelocationPropertiesList/PickupPropertyDetails/PickupPropertyDetails';
import DropOffPropertyDetails from '../../../components/RelocationComponents/RelocationPropertiesList/DropOffPropertyDetails/DropOffPropertyDetails';
import LoaderModal from '../../../components/Modal/LoaderModal';
import RelocationProgressBar from '../../../components/RelocationProgressBar/RelocationProgressBar';
import relocationService from '../../../services/relocation-service';
import toastService from '../../../services/toast-service';
import useCancelRelocation from '../../../hooks/useCancelRelocation';
import {colorTheme} from '../../../constants/ColorConstants';
import useQuoteUpdate from '../../../hooks/useQuoteUpdate';
import useRemoveEmojies from '../../../hooks/useRemoveEmojies';
import NegotiateAmountModal from '../../../components/NegotiateAmountModal/NegotiateAmountModal';
import CancelReasonModal from '../../../components/RelocationComponents/RelocationCancelReasonModal/CancelReasonModal';

const {primaryText} = colorTheme;
export default RelocationPropertyDetails = ({navigation}) => {
  const {
    markers,
    selectedPropertyType,
    setSelectedPropertyType,
    propertyType,
    setPropertyType,
    relocationRequest,
    setRelocationRequest,
    setPickupPproTypeindex,
    setDropoffPproTypeindex,
    isCallApi,
    setCallApi,
    homeServiceSelect
  } = useContext(GlobalContext);
  const {t, i18n} = useTranslation();
  const {} = useQuoteUpdate();
  const focused = useIsFocused();
  const {removeEmojies} = useRemoveEmojies();
  const {routes, index} = navigation.getState();
  const styles = getStyles({language: i18n.language});
  const {cancelRelocationRequest, loadingState} = useCancelRelocation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loader, setLoader] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showCancelReasonModal, setShowCancelReasonModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if(relocationRequest){
        const onBackPress = () => {
          return headerNavigationHandler(); // Block hardware back press
        };
  
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
  
        const gestureBlocker = (e) => {
          e.preventDefault(); // Prevent gesture-based navigation
          if(!relocationRequest){
            navigation.navigate('Home');
            return;
          }
          if(selectedIndex == 1){
            setSelectedIndex(0);
          }else{
            navigation.navigate('RelocationAddresses');
          }
        };
  
        const gestureRemoveListener = navigation.addListener(
          'beforeRemove',
          gestureBlocker
        );
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', onBackPress);
          gestureRemoveListener(); // Cleanup for navigation listener
        };
      }
    }, [navigation, headerNavigationHandler, selectedIndex, relocationRequest])
  );

  useEffect(() => {
    if (isCallApi) {
      for (let i = 0; i < markers.length; i++) {
        if (markers[i].type == 'p') {
          setRelocationRequest(pre => ({
            ...pre,
            pickup_location: markers[i],
            pickup_address: markers[i].title,
          }));
        } else {
          setRelocationRequest(pre => ({
            ...pre,
            dropoff_location: markers[i],
            dropoff_address: markers[i].title,
          }));
        }
      }
    }
  }, [isCallApi]);

  useEffect(() => {
    if (!propertyType && focused && !loadingState) {
      properttypeHandler();
    }
    return () => {
      properttypeHandler;
    };
  }, [!propertyType, !loadingState]);

  const headerNavigationHandler = useCallback(
    key => {
      if (key == 'cancel') {
        setShowAlertModal(true);
        return;
      }
      if(selectedIndex == 1){
        setSelectedIndex(0);
      }else{
        navigation.navigate('RelocationAddresses');
      }
      return true;
    },
    [loadingState,selectedIndex],
  );

  const properttypeHandler = () => {
    relocationService
      .propertyType()
      .then(({data}) => {
        setPropertyType(data?.data);
        if (!relocationRequest?.p_prop_details) {
          setSelectedPropertyType({
            pickUpPropertyType: data?.data[0],
            dropOffPropertyType: data?.data[0],
          });

          setRelocationRequest(pre => ({
            ...pre,
            p_prop_details: {relocation_category_id: data?.data[0]?.id},
            d_prop_details: {relocation_category_id: data?.data[0]?.id},
          }));
        } else {
          data?.data.filter((item, index) => {
            if (
              relocationRequest?.p_prop_details?.relocation_category_id ==
              item?.id
            ) {
              setPickupPproTypeindex(index);
              setSelectedPropertyType(pre => ({
                ...pre,
                pickUpPropertyType: item,
              }));
            }
            if (
              relocationRequest?.d_prop_details?.relocation_category_id ==
              item?.id
            ) {
              setDropoffPproTypeindex(index);
              setSelectedPropertyType(pre => ({
                ...pre,
                dropOffPropertyType: item,
              }));
            }
          });
        }
      })
      .catch(error => {
        toastService.shortToast(error?.response?.data?.message);
      });
  };

  const onPress = child => {
    if (child == 'Pickup') {
      if (relocationRequest?.p_prop_details?.other_discription) {
        const filterPickupOtherDis = removeEmojies(
          relocationRequest?.p_prop_details?.other_discription,
        );
        relocationRequest.p_prop_details.other_discription =
          filterPickupOtherDis;
        setRelocationRequest(pre => ({
          ...pre,
          p_prop_details: relocationRequest?.p_prop_details,
        }));
      }
      setRelocationRequest(pre => ({
        ...pre,
        pickup_address: removeEmojies(relocationRequest?.pickup_address),
      }));

      setSelectedIndex(1);
      return;
    } else {
      if (relocationRequest?.d_prop_details?.other_discription) {
        const filterDropoffOtherDis = removeEmojies(
          relocationRequest?.d_prop_details?.other_discription,
        );
        relocationRequest.d_prop_details.other_discription =
          filterDropoffOtherDis;
        setRelocationRequest(pre => ({
          ...pre,
          d_prop_details: relocationRequest?.d_prop_details,
        }));
      }
      const drop_off_adress = removeEmojies(relocationRequest?.dropoff_address);
      relocationRequest.dropoff_address = drop_off_adress;
      setRelocationRequest(relocationRequest);
      apiHanler();
    }
  };

  const apiHanler = () => {
    if (isCallApi) {
      const relocationObject = {
        pickup_location: JSON.stringify(relocationRequest?.pickup_location),
        dropoff_location: JSON.stringify(relocationRequest?.dropoff_location),
        p_prop_details: JSON.stringify(relocationRequest?.p_prop_details),
        d_prop_details: JSON.stringify(relocationRequest?.d_prop_details),
        pickup_address: relocationRequest?.pickup_address,
        relocation_category_id:
          relocationRequest?.p_prop_details?.relocation_category_id,
        dropoff_address: relocationRequest?.dropoff_address,
        tagged_city: relocationRequest?.tagged_city,
        data_type: 'property_details',
        ...(homeServiceSelect ? { moving_type: 'move_a_few_items' } : {}),
      };           
      setLoader(true);
      const headers = {
        'Content-Type': 'multipart/form-data;',
      };
      relocationService
        .selfEstimatedMove(relocationObject, headers)
        .then(({data}) => {
          setRelocationRequest(pre => ({
            ...pre,
            id: data?.data?.id,
            status: data?.data?.status,
            ...(homeServiceSelect ? { moving_type: 'move_a_few_items' } : {}),
          }));
          setLoader(false);
          setCallApi(false);
          if(relocationRequest?.moving_type != null){
            if(relocationRequest?.moving_type == 'move_everything'){
              navigation.navigate('RelocationSpaces');
            }else{
              navigation.navigate('RelocationItemCategories');
            }
          }else{
            if(homeServiceSelect){
              navigation.navigate('RelocationItemCategories');
              return
            }
            navigation.navigate('RelocationSelectCategory');
          }
        })
        .catch(error => {
          setLoader(false);
          //when modal is close toast also cloase that's why using setTimeOut
          setTimeout(() => {
            toastService.shortToast(error?.response?.data?.message);
          }, 50);
          if (error?.response?.data?.errors?.is_negotiated == 1) {
            const packagingType = error?.response?.data?.packaging_type;

            navigation.popToTop();
            if (packagingType == 'premium') {
              navigation.navigate('RelocationRevisedQuote');
            } else {
              navigation.navigate('RelocationNonPremiumRevisedQuote');
            }
          }
        });
    } else {
      if(relocationRequest?.moving_type != null){
        if(relocationRequest?.moving_type == 'move_everything'){
          navigation.navigate('RelocationSpaces');
        }else{
          navigation.navigate('RelocationItemCategories');
        }
      }else{
        if(homeServiceSelect){
          navigation.navigate('RelocationItemCategories');
          return
        }
        navigation.navigate('RelocationSelectCategory');
      }
      
    }
  };

  const onClosePressHandler = () => {
    setShowAlertModal(false);
    setShowCancelReasonModal(true);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerView}>
        {(loader || loadingState) && (
          <LoaderModal load={loader || loadingState} textShow={false} />
        )}
        {showAlertModal && (
          <NegotiateAmountModal
            data={relocationRequest}
            visible={showAlertModal}
            onClosePress={onClosePressHandler}
            onModalClose={() => setShowAlertModal(false)}
          />
        )}
        {showCancelReasonModal && (
          <CancelReasonModal
            visible={showCancelReasonModal}
            loadingState={loadingState}
            onClose={() => setShowCancelReasonModal(false)}
            onSubmitPress={reasonIndex =>
              cancelRelocationRequest(relocationRequest?.id, reasonIndex)
            }
          />
        )}
        <NewHeader
          title={selectedIndex ? t('drop_off_Details') : t('pickup_Details')}
          navigation={navigation}
          cancelButton={relocationRequest?.status == 'draft' ? true : false}
          screenName={'Property Details'}
          titleStyle={styles.headerStyles}
          customNavigator={headerNavigationHandler}
        />
         <View style={styles.shadowWrapper}>
        <View style={styles.progressBarContainer}>
          <RelocationProgressBar progressCount={3} />
        </View>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{selectedIndex ? ('Please provide drop-off details') : ('Please provide pickup details')}</Text>
        </View>
        {selectedIndex == 1 && selectedPropertyType ? (
          <DropOffPropertyDetails
            loader={loader}
            onPress={onPress}
            data={propertyType}
            dropOffTitle={relocationRequest?.dropoff_address}
            setShouldCallApi={setCallApi}
            shouldCallApi={isCallApi}
          />
        ) : (
          <PickupPropertyDetails
            loader={loader}
            onPress={onPress}
            data={propertyType}
            pickUpTitle={relocationRequest?.pickup_address}
            setShouldCallApi={setCallApi}
            shouldCallApi={isCallApi}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
