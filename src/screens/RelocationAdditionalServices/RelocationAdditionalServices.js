import {View, ScrollView, SafeAreaView, Text, TextInput, Platform} from 'react-native';
import React, {useState, useContext, useCallback, useEffect} from 'react';
import styles from './styles';
import NewHeader from '../../components/Header/NewHeader';
import {useTranslation} from 'react-i18next';
import ButtonComponent from '../../components/buttonComp/ButtonComponent';
import RelocationProgressBar from '../../components/RelocationProgressBar/RelocationProgressBar';
import relocationService from '../../services/relocation-service';
import {GlobalContext} from '../../../context/GlobalState';
import toastService from '../../services/toast-service';
import useCancelRelocation from '../../hooks/useCancelRelocation';
import LoaderModal from '../../components/Modal/LoaderModal';
import useQuoteUpdate from '../../hooks/useQuoteUpdate';
import {AppConstants} from '../../constants/AppConstants';
import PackingModal from '../../components/RelocationComponents/RelocationPackingTypeModal/PackingModal';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import NegotiateAmountModal from '../../components/NegotiateAmountModal/NegotiateAmountModal';
import CancelReasonModal from '../../components/RelocationComponents/RelocationCancelReasonModal/CancelReasonModal';
import TitleWithButton from '../../components/TitleWithButton/TitleWithButton';
import {colorTheme} from '../../constants/ColorConstants';
import ItemsListModal from '../../components/Modal/ItemsListModal';
import useRelocationItems from '../../hooks/useRelocationItems';
import useMergn from '../../hooks/useMergn';

const {darkBlack,placeholderText} = colorTheme;

const RelocationAdditionalServices = ({navigation, route}) => {
  const {
    auth,
    relocationRequest,
    setRelocationRequest,
    shouldCallRelocationRequest,
    setShouldCallRelocationRequest,
    selectedRelocationItems,
    setSelectedRelocationItems,
    isUpdateItemsApiCall,
    setUpdateItemsApiCall,
    hasModalOpened,
  } = useContext(GlobalContext);
  const {t} = useTranslation();
  const {} = useQuoteUpdate();
  const {cancelRelocationRequest, loadingState} = useCancelRelocation();
  const {eventHandler, attributeHandler, uniqueIdentifierHandler} = useMergn();
  const {packingUnpackingRequest, itemsLoader, shouldCallApi} =
    useRelocationItems();
  const [loader, setLoader] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showPackingDetailsModal, setShowPackingDetailsModal] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [showItemModal, setItemModal] = useState(false);
  const [itemApiShouldCall, setItemApiShouldCall] =
    useState(isUpdateItemsApiCall);
  const [relocationItems, setRelocationItems] = useState(
    selectedRelocationItems,
  );
  const previousScreen = route?.params?.previousScreen;
  const allItemsAreFragile = selectedRelocationItems.every(
    item => item?.is_fragile === 1,
  );

  useEffect(() => {
    if (
      relocationRequest?.is_packing_unpacking_required &&
      selectedRelocationItems.length > 0 &&
      itemApiShouldCall &&
      !allItemsAreFragile
    ) {
      setItemModal(true);
    }
  }, [itemApiShouldCall, allItemsAreFragile, selectedRelocationItems]);

  const apiHandler = () => {
    // if (shouldCallRelocationRequest) {
      setLoader(true);
      if (
        !allItemsAreFragile &&
        selectedRelocationItems.length > 0 &&
        isUpdateItemsApiCall
      ) {
        packingUnpackingRequest(relocationItems)
          .then(data => {
            setSelectedRelocationItems(relocationItems);
            getRelocationEstimateQuotes();
          })
          .catch(error => {
            setLoader(false);
            toastService.shortToast(error?.response?.data?.message);
          });
      } else {
        getRelocationEstimateQuotes();
      }
  };

  const getRelocationEstimateQuotes = () => {
    const relocationObject = {
      is_electrician_required: relocationRequest?.is_electrician_required ?? 0,
      is_packing_unpacking_required:
        relocationRequest?.is_packing_unpacking_required ?? null,
      is_carpenter_required: relocationRequest?.is_carpenter_required,
      tagged_city: relocationRequest?.tagged_city,
      no_of_ac_in: relocationRequest?.no_of_ac_in,
      no_of_led: relocationRequest?.no_of_led,
      data_type: 'get_estimates',
      additional_detail: relocationRequest?.additional_detail ?? '',
    };

    const headers = {
      'Content-Type': 'multipart/form-data;',
    };
    relocationService
      .selfEstimatedMove(relocationObject, headers)
      .then(async({data}) => {
        setUpdateItemsApiCall(false);
        setLoader(false);
        setRelocationRequest(pre => ({
          ...pre,
          is_coupon_applied: false,
          invoice: data?.data?.invoice,
        }));
        if (relocationRequest?.is_packing_unpacking_required == 0) {
          const updatedItems = relocationItems.map(item => ({
            ...item,
            is_packing_required: 0,
          }));
          setRelocationItems(updatedItems);
          setSelectedRelocationItems(updatedItems);
        }
        if(Platform.OS == 'android'){
          const eventMessage = await eventHandler('Get Estimate');
        }
        navigation.navigate('RelocationEstimatedQuote');
        setShouldCallRelocationRequest(false);
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
  };

  const headerNavigationHandler = useCallback(key => {
    if (key == 'cancel') {
      setShowAlertModal(true);
      return;
    }
    navigation.goBack();
  }, []);

  const onModalClosePressHandler = () => {
    setShowAlertModal(false);
    setShowReasonModal(true);
  };

  const acServiceHandler = useCallback(
    title => {
      setShouldCallRelocationRequest(true);
      setRelocationRequest(pre => ({
        ...pre,
        no_of_ac_in: title === 'Yes' ? relocationRequest?.no_of_ac_in || 1 : 0,
      }));
    },
    [relocationRequest?.no_of_ac_in],
  );

  const decrement = useCallback(
    type => {
      setShouldCallRelocationRequest(true);
      if (type == 'ac') {
        setRelocationRequest(pre => ({
          ...pre,
          no_of_ac_in: relocationRequest?.no_of_ac_in
            ? relocationRequest?.no_of_ac_in - 1
            : 0,
        }));
      } else {
        setRelocationRequest(pre => ({
          ...pre,
          no_of_led: relocationRequest?.no_of_led
            ? relocationRequest?.no_of_led - 1
            : 0,
        }));
      }
    },
    [relocationRequest?.no_of_ac_in, relocationRequest?.no_of_led],
  );

  const increment = useCallback(
    type => {
      setShouldCallRelocationRequest(true);
      if (type == 'ac') {
        setRelocationRequest(pre => ({
          ...pre,
          no_of_ac_in: relocationRequest?.no_of_ac_in
            ? relocationRequest?.no_of_ac_in + 1
            : 1,
        }));
      } else {
        setRelocationRequest(pre => ({
          ...pre,
          no_of_led: relocationRequest?.no_of_led
            ? relocationRequest?.no_of_led + 1
            : 1,
        }));
      }
    },
    [relocationRequest?.no_of_ac_in, relocationRequest?.no_of_led],
  );

  const ledservicesHandler = useCallback(
    title => {
      setShouldCallRelocationRequest(true);
      setRelocationRequest(pre => ({
        ...pre,
        no_of_led: title === 'Yes' ? relocationRequest?.no_of_led || 1 : 0,
      }));
    },
    [relocationRequest?.no_of_led],
  );

  const electricianServicesHandler = useCallback(
    title => {
      setShouldCallRelocationRequest(true);
      setRelocationRequest(pre => ({
        ...pre,
        is_electrician_required:
          title === 'Yes' ? relocationRequest?.is_electrician_required || 1 : 0,
      }));
    },
    [relocationRequest?.is_electrician_required],
  );

  const carpenterServicesHandler = useCallback(
    title => {
      setShouldCallRelocationRequest(true);
      setRelocationRequest(pre => ({
        ...pre,
        is_carpenter_required:
          title === 'Yes' ? relocationRequest?.is_carpenter_required || 1 : 0,
      }));
    },
    [relocationRequest?.is_carpenter_required],
  );

  const packingUnpackingServicesHandler = useCallback(
    title => {
      if (title == 'Yes') {
        setItemModal(true);
      }
      setShouldCallRelocationRequest(true);
      setRelocationRequest(pre => ({
        ...pre,
        is_packing_unpacking_required:
          title === 'Yes'
            ? relocationRequest?.is_packing_unpacking_required || 1
            : 0,
      }));
      if (title == 'No') {
        const updatedItems = relocationItems.map(item => ({
          ...item,
          is_packing_required: 0,
        }));
        setRelocationItems(updatedItems);
        setSelectedRelocationItems(updatedItems);
        setUpdateItemsApiCall(true);
      }
    },
    [relocationRequest?.is_packing_unpacking_required],
  );

  const isValueValid = value =>
    value !== null && value !== undefined && value >= 0;
  const isAnyServiceSelected = relocationRequest =>
    relocationRequest &&
    ((previousScreen === 'RelocationSpaces' &&
      selectedRelocationItems.length == 0) ||
      allItemsAreFragile ||
      isValueValid(relocationRequest?.is_packing_unpacking_required)) &&
    isValueValid(relocationRequest?.is_carpenter_required) &&
    (previousScreen !== 'RelocationSpaces' ||
      isValueValid(relocationRequest?.is_electrician_required)) &&
    isValueValid(relocationRequest?.no_of_ac_in) &&
    isValueValid(relocationRequest?.no_of_led);

  const onPressItemHandler = (id, cat_id) => {
    // setUpdateItemsApiCall(true);
    setShouldCallRelocationRequest(true);
    setRelocationItems(prevItems =>
      prevItems.map(item =>
        item?.item_id === id && item?.item_cat_id == cat_id
          ? {
              ...item,
              is_packing_required: item.is_packing_required === 0 ? 1 : 0,
            }
          : item,
      ),
    );
  };

  const packingUnpackingRequestHandler = data => {
    if (data) {
      setUpdateItemsApiCall(true);
      setItemApiShouldCall(false);
      setShouldCallRelocationRequest(true);
      setItemModal(false);
      setSelectedRelocationItems(relocationItems);
      if (relocationItems.every(item => item?.is_packing_required === 0)) {
        setRelocationRequest(pre => ({
          ...pre,
          is_packing_unpacking_required: 0,
        }));
      } else {
        setRelocationRequest(pre => ({
          ...pre,
          is_packing_unpacking_required: 1,
        }));
      }
    } else {
      if (relocationItems.every(item => item.is_packing_required === 0)) {
        setRelocationRequest(pre => ({
          ...pre,
          is_packing_unpacking_required: 0,
        }));
      }
      setItemApiShouldCall(false);
      setItemModal(false);
    }
  };

  const handleOtherDiscription = text => {
    setShouldCallRelocationRequest(true);
    setRelocationRequest({...relocationRequest, additional_detail: text});
  };

  return (
    <GestureHandlerRootView style={[styles.container]}>
      <SafeAreaView style={styles.container}>
        {(loader || loadingState) && (
          <LoaderModal load={loader || loadingState} textShow={false} />
        )}
        {showAlertModal && (
          <NegotiateAmountModal
            data={relocationRequest}
            visible={showAlertModal}
            onModalClose={() => setShowAlertModal(false)}
            onClosePress={onModalClosePressHandler}
          />
        )}
        {showReasonModal && (
          <CancelReasonModal
            loadingState={loadingState}
            onSubmitPress={index =>
              cancelRelocationRequest(relocationRequest?.id, index)
            }
            onClose={() => setShowReasonModal(false)}
          />
        )}
        {showPackingDetailsModal && (
          <PackingModal
            visible={showPackingDetailsModal}
            onClose={() => setShowPackingDetailsModal(false)}
            packingTypes={
              relocationRequest?.tagged_city == 'same city'
                ? AppConstants.sameCityModalData
                : AppConstants.otherCityModalData
            }
          />
        )}
        <NewHeader
          cancelButton={true}
          title={t('additionalServices')}
          navigation={navigation}
          customNavigator={headerNavigationHandler}
        />
        <View style={styles.shadowWrapper}>
          <View style={styles.progressBarContainer}>
            <RelocationProgressBar progressCount={5} />
          </View>
        </View>
        <View style={styles.innerContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{gap: 20}}>
              {selectedRelocationItems.length > 0 && !allItemsAreFragile && (
                <TitleWithButton
                  title={t(
                    'Do you need packing/unpacking service for added items?',
                  )}
                  btnSelect={
                    relocationRequest?.is_packing_unpacking_required != null
                      ? relocationRequest?.is_packing_unpacking_required > 0
                        ? 'Yes'
                        : 'No'
                      : null
                  }
                  onPress={packingUnpackingServicesHandler}
                />
              )}

              <TitleWithButton
                title={t('Do you need a carpenter?')}
                btnSelect={
                  relocationRequest?.is_carpenter_required != null
                    ? relocationRequest?.is_carpenter_required > 0
                      ? 'Yes'
                      : 'No'
                    : null
                }
                onPress={carpenterServicesHandler}
              />
              {previousScreen == 'RelocationSpaces' && (
                <TitleWithButton
                  title={t('Do you need an electrician?')}
                  btnSelect={
                    relocationRequest?.is_electrician_required != null
                      ? relocationRequest?.is_electrician_required > 0
                        ? 'Yes'
                        : 'No'
                      : null
                  }
                  onPress={electricianServicesHandler}
                />
              )}

              <TitleWithButton
                title={t('Do you need AC uninstallation/installation service?')}
                counter={
                  relocationRequest?.no_of_ac_in
                    ? relocationRequest?.no_of_ac_in
                    : 0
                }
                btnSelect={
                  relocationRequest?.no_of_ac_in != null
                    ? relocationRequest?.no_of_ac_in > 0
                      ? 'Yes'
                      : 'No'
                    : null
                }
                onPress={acServiceHandler}
                onIncreaseCount={() => increment('ac')}
                onDecreaseCount={() => decrement('ac')}
              />

              <TitleWithButton
                title={t(
                  'Do you need LED uninstallation/installation service?',
                )}
                counter={
                  relocationRequest?.no_of_led
                    ? relocationRequest?.no_of_led
                    : 0
                }
                btnSelect={
                  relocationRequest?.no_of_led != null
                    ? relocationRequest?.no_of_led > 0
                      ? 'Yes'
                      : 'No'
                    : null
                }
                onPress={ledservicesHandler}
                onIncreaseCount={() => increment('led')}
                onDecreaseCount={() => decrement('led')}
              />

              <View style={styles.additionalDetailContainer}>
                <View style={styles.additionalDetailTextView}>
                  <Text style={styles.additionalDetailText}>
                    Additional Details
                  </Text>
                </View>
                <TextInput
                  // ref={discriptionRef}
                  placeholder={
                    'Please type any additional details you want us to know about your move...'
                  }
                  placeholderTextColor={placeholderText}
                  multiline={true}
                  numberOfLines={10}
                  value={relocationRequest?.additional_detail}
                  onChangeText={text => handleOtherDiscription(text)}
                  style={styles.otherTextInput}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonComponent
            btnStyle={!isAnyServiceSelected(relocationRequest)}
            disabled={!isAnyServiceSelected(relocationRequest)}
            pressStatus={loader}
            text={'Continue'}
            textStyle={styles.btnText}
            onPress={apiHandler}
          />
        </View>
        {showItemModal && (
          <ItemsListModal
            items={relocationItems}
            titleColor={darkBlack}
            loadingState={itemsLoader}
            visible={showItemModal}
            loader={itemsLoader}
            onClose={() => setItemModal(false)}
            onPressItem={(id, cat_id) => {
              onPressItemHandler(id, cat_id);
            }}
            onPress={data => {
              packingUnpackingRequestHandler(data);
            }}
            // onPress={()=> {setItemModal(false)}}
            title={
              'Please select those items for which you want to avail packing/unpacking service.'
            }
          />
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default RelocationAdditionalServices;
