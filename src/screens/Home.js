import React, {
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react';
import {Text, View, SafeAreaView, ScrollView, Platform} from 'react-native';
import NewHeader from '../components/Header/NewHeader';
import {useTranslation} from 'react-i18next';
import messaging from '@react-native-firebase/messaging';
import {GlobalContext} from '../../context/GlobalState';
import analytics from '@react-native-firebase/analytics';
import UpdateAppModal from '../components/Modal/ForceUpdateModal';
import {version} from './../../package.json';
import {AppImages} from '../constants/AppImages';
import {getStyles} from '../styles/HomeScreenStyles';
import HomeCard from '../components/Card/HomeCard';
import DraggableFAB from '../components/DraggableFAB/DraggableFAB';
import {Modalize} from 'react-native-modalize';
import TripCardSummary from '../components/TripCardSumary/TripCardSummary';
import appService from '../services/app-service';
import {useIsFocused, useRoute} from '@react-navigation/native';
import UseFcmNotification from '../hooks/UseFcmNotification';
import HomeCarousel from '../components/HomeCarousel/HomeCarousel';
import SelectCityModal from '../components/SelectCityModal/SelectCityModal';
import HomeCarouselSkeleton from '../components/HomeCarousel/HomeCarouselSkeleton';
import toastService from '../services/toast-service';
import relocationService from '../services/relocation-service';
import RelocationSurveyUpdatedModal from '../components/RelocationSurveyUpdatedModal/RelocationSurveyUpdatedModal';
import SmallMoveModal from '../components/SmallMoveModal/SmallMoveModal';
import SmallMoveScheduleTimeModal from '../components/SmallMoveScheduleTimeModal/SmallMoveScheduleTimeModal';
import DatePickerCustomDrawerModal from '../components/DatePickerCustomDrawerModal/DatePickerCustomDrawerModal';
import HomeVerticalCard from '../components/Card/HomeVerticalCard';
import {AppConstants} from '../constants/AppConstants';
import useAuth from '../hooks/useAuth';
import SocialMediaModal from '../components/Modal/SocialMediaModal';
import useMergn from '../hooks/useMergn';

export default Home = ({navigation}) => {
  const {socialSurveyRequest, btnPress} = useAuth();
  const {
    auth,
    setSurveyId,
    bootMeUpData,
    multiRides,
    setBiddingAmount,
    setGlobalRideId,
    setMultiRides,
    setRideCreatedTime,
    setRelocationRequest,
    setRelocationSpaces,
    setMarkers,
    markers,
    relocationRequest,
    deliveryRequest,
    setDeliveryRequest,
    setSelectedRelocationItems,
    setSelectedPropertyType,
    setPropertyType,
    setPickupPproTypeindex,
    setDropoffPproTypeindex,
    setEnableSegmentTab,
    surveyScheduleUpdated,
    setSurveyScheduleUpdated,
    setScheduledAt,
    setScheduled,
    myCurrentRideStatus,
    homeServiceSelect,
    setHomeServiceSelect,
  } = useContext(GlobalContext);
  const modalizeRef = useRef(null);
  const isFocused = useIsFocused();
  const RouteName = useRoute();
  const {t, i18n} = useTranslation();
  const styles = getStyles({language: i18n.language});
  const {eventHandler, attributeHandler, uniqueIdentifierHandler} = useMergn();
  const [smallMoveModal, setSmallMoveModal] = useState(false);
  const [cityModal, setCityModal] = useState(false);
  const [banners, setBanners] = useState(null);
  const [triggerBlink, setTriggerBlink] = useState(false);
  const [ourServices, setOurServices] = useState([
    {
      title: 'moving_packing',
      description: 'moving_package_discription',
      disabled: false,
      image: AppImages.movingRelocationVehicle,
      loading: true,
    },
    {
      title: 'deliveries',
      description: 'deliveries_discription',
      disabled: false,
      image: AppImages.deliveries,
      loading: true,
    },
    {
      title: 'book_truck_now',
      description: 'book_truck_discription',
      disabled: false,
      image: AppImages.smallMoveVehicle,
      loading: true,
    },
  ]);
  const [relocationNotification, setRelocationNotification] = useState(false);
  const [scheduleTimeModal, setScheduleTimeModal] = useState(false);
  const [datePIckerModal, setDatePIckerModal] = useState(false);
  const {fcmData, setFcmData} = UseFcmNotification(
    setRelocationNotification,
    relocationNotification,
  );

  useEffect(() => {
    if (fcmData && isFocused) {
      if (fcmData?.bid_details) {
        const bid_details = JSON.parse(fcmData?.bid_details);
        trachMoveHandler(bid_details?.ride_id);
      }
      if (fcmData?.ride_id) {
        const getRideId = parseInt(fcmData?.ride_id);
        trachMoveHandler(getRideId);
      }
      if (fcmData?.relocation_id) {
        if (fcmData?.id == 'relocation_date_update') {
          setSurveyScheduleUpdated(fcmData);
        } else {
          setSurveyId(fcmData?.relocation_id);
          relocationNavigationHandler(fcmData);
        }
        setFcmData(null);
      }
      if (
        fcmData?.id == 'status_changed_to_draft' ||
        fcmData?.id == 'survey_canceled' || 
        fcmData?.id == 'manual_relocation_query'
      ) {
        getCurrentRelocation();
      }
    } else {
      setFcmData(null);
      modalizeRef.current = null;
    }

    return () => {
      // setFcmData(null);
      modalizeRef.current = null;
    };
  }, [fcmData, isFocused]);

  useEffect(() => {
    bannersHandler();
    modalizeRef?.current?.open();
    return () => {
      modalizeRef.current = null;
    };
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  useEffect(() => {
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then(fcmToken => {});
    } else {
    }

    // for relocation work
    const getInitialNotification = messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        const result = await remoteMessage;
        if (result) {
          let response = result?.data;
          if (response?.status == 'completed') {
            setSurveyId(response?.relocation_id);
            navigation.navigate(
              'RelocationBookingDetails',
              (response = {response}),
            );
          } else {
            setRelocationNotification(true);
          }
        }
      });

    return () => {
      getInitialNotification;
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      getCurrentRelocation();
    } else {
      getCurrentRelocation;
    }
    return () => {
      getCurrentRelocation;
    };
  }, [isFocused, relocationNotification]);

  useEffect(() => {
    let unMountInterval;
    fetchMultiRides();
    if (isFocused) {
      unMountInterval = setInterval(() => {
        fetchMultiRides();
      }, 10000);
    } else {
      clearInterval(unMountInterval);
      fetchMultiRides;
    }
    return () => {
      clearInterval(unMountInterval);
      fetchMultiRides;
    };
  }, [isFocused]);

  const fetchMultiRides = () => {
    if (auth) {
      let headers = {
        Authorization: `Bearer ${auth?.accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      appService
        .multiRides(headers)
        .then(({data}) => {
          const currentIndex = ourServices.findIndex(
            val => val.title == 'book_truck_now',
          );
          if (currentIndex !== -1) {
            ourServices[currentIndex] = {
              ...ourServices[currentIndex],
              loading: false,
            };
          }
          setOurServices([...ourServices]);
          if (data?.data?.rides.length > 0) {
            setMultiRides(data?.data?.rides);
          } else {
            setMultiRides(null);
          }
        })
        .catch(error => {
          toastService.shortToast(error?.response?.data?.message);
        });
    }
  };

  const updateLoadingState = title => {
    const currentIndex = ourServices.findIndex(val => val.title === title);
    if (currentIndex !== -1) {
      ourServices[currentIndex] = {
        ...ourServices[currentIndex],
        loading: false,
      };
    }
  };

  const getCurrentRelocation = async () => {
    if (auth) {
      let headers = {
        Authorization: `Bearer ${auth?.accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      relocationService
        .currentRelocation(headers)
        .then(({data}) => {
          updateLoadingState('moving_packing');
          updateLoadingState('deliveries');
          // const currentIndex = ourServices.findIndex(
          //   val => val.title == 'moving_packing',
          // );
          // if (currentIndex !== -1) {
          //   ourServices[currentIndex] = {
          //     ...ourServices[currentIndex],
          //     loading: false,
          //   };
          // }
          let response = data?.data;
          setOurServices([...ourServices]);
          if (relocationNotification) {
            setSurveyId(response?.id);
            relocationNavigationHandler(response);
          } else {
            if (Object.keys(response?.delivery).length > 0) {
              setDeliveryRequest(response?.delivery);
              // setMarkers(pre => [
              //   {...response?.delivery?.pickup_location},
              //   {...response?.delivery?.dropoff_location},
              // ]);
            }else{
              setDeliveryRequest(null);
            }
            if (response?.id) {
              setRelocationRequest(response);
              // setMarkers(pre => [
              //   {...response?.pickup_location},
              //   {...response?.dropoff_location},
              // ]);
            }
          }
        })
        .catch(error => {
          setMarkers([]);
          setRelocationRequest(null);
          setDeliveryRequest(null);
          setRelocationSpaces(AppConstants?.relocationSpaces);
          setSelectedRelocationItems([]);
          setSelectedPropertyType(null);
          setPropertyType(null);
          setPickupPproTypeindex(null);
          setDropoffPproTypeindex(null);
          setEnableSegmentTab(false);
          setRelocationNotification(false);
          // const currentIndex = ourServices.findIndex(
          //   val => val.title == 'moving_packing',
          // );
          // if (currentIndex !== -1) {
          //   ourServices[currentIndex] = {
          //     ...ourServices[currentIndex],
          //     loading: false,
          //   };
          // }
          updateLoadingState('moving_packing');
          updateLoadingState('deliveries');
          setOurServices([...ourServices]);
        });
    }
  };

  const bannersHandler = () => {
    let headers = {
      Authorization: `Bearer ${auth?.accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    appService
      .banners(headers)
      .then(({data}) => {
        setBanners(data?.data);
      })
      .catch(error => {
        // console.log('errorerrorerror',error);
      });
  };

  const goToRelocation = async relocationRequest => {
    await analytics().logEvent('serviceSelection', {
      serviceName: 'moving/relocation',
    });
    setPropertyType(null);
    if (relocationRequest && relocationRequest?.status == 'draft') {
      if (relocationRequest?.is_negotiated == 1) {
        if (relocationRequest?.packing_type == 'premium') {
          navigation.navigate('RelocationRevisedQuote');
        } else {
          navigation.navigate('RelocationNonPremiumRevisedQuote');
        }
        return;
      }
      setMarkers(pre => [
        {...relocationRequest?.pickup_location},
        {...relocationRequest?.dropoff_location},
      ]);
      setSelectedRelocationItems([]);
      navigation.navigate('RelocationAddresses');
      return;
    }
    if (relocationRequest && Object.keys(relocationRequest).length > 1) {
      setSurveyId(relocationRequest?.id);
      relocationNavigationHandler(relocationRequest);
      return;
    }
    if(Platform.OS == 'android'){
      const eventMessage = await eventHandler('Moving or Relocation clicked');
    }
    setMarkers([]);
    setCityModal(true);
  };

  const goToDelivery = async deliveryRequest => {
    await analytics().logEvent('serviceSelection', {
      serviceName: 'moving/delivery',
    });
    setPropertyType(null);
    if (deliveryRequest && deliveryRequest?.status == 'draft') {
      if (deliveryRequest?.is_negotiated == 1) {
        if (deliveryRequest?.packing_type == 'premium') {
          navigation.navigate('RelocationRevisedQuote');
        } else {
          navigation.navigate('DeliveryNonPremiumRevisedQuote');
        }
        return;
      }
      setMarkers(pre => [
        {...deliveryRequest?.pickup_location},
        {...deliveryRequest?.dropoff_location},
      ]);
      setSelectedRelocationItems([]);
      navigation.navigate('DeliveryAddresses');
      return;
    }
    if (deliveryRequest && Object.keys(deliveryRequest).length > 1) {
      setSurveyId(deliveryRequest?.id);
      relocationNavigationHandler(deliveryRequest);
      return;
    }
    if(Platform.OS == 'android'){
      const eventMessage = await eventHandler('Delivery Clicked');
    }
    setMarkers([]);
    setCityModal(true);
  };

  const relocationNavigationHandler = response => {
    setRelocationNotification(false);
    setCityModal(false);
    if (response?.status) {
      if (response?.status == 'new') {
        navigation.navigate('SurveySubmitted', (response = {response}));
      } else if (response?.status == 'in_progress') {
        if(response?.moving_type == 'delivery'){
          navigation.navigate('DeliveryProgress', (response = {response}));
        }else{
          navigation.navigate('RelocationProgress', (response = {response}));
        }
      } else if (response?.status == 'accepted') {
        navigation.navigate('RelocationSurveyQuote', (response = {response}));
      } else if (response?.status == 'confirmed') {
        if (response?.moving_type == 'delivery') {
          navigation.navigate(
            'DeliveryMovingConfirmed',
            (response = {response}),
          );
        }else{
          navigation.navigate(
            'RelocationMovingConfirmed',
            (response = {response}),
          );
        }
      } else if (response?.status == 'moving_in_progress') {
        if(response?.moving_type == 'delivery'){
          navigation.navigate('DeliveryProgress', (response = {response}));
        }else{
          navigation.navigate('RelocationProgress', (response = {response}));
        }
      } else if (response?.status == 'pending') {
        navigation.navigate(
          'RelocationQuoteBreakDown',
          (response = {response}),
        );
      }
    }
  };

  const goToOnDemandRide = async () => {
    await analytics().logEvent('serviceSelection', {
      serviceName: 'Book a truck now',
    });
    setMarkers([]);
    setScheduledAt(null);
    setScheduled(false);
    setSmallMoveModal(true);
  };

  const onCloseCityModal = () => {
    setCityModal(false);
  };
  const onCloseSmallMoveModal = () => {
    setSmallMoveModal(false);
  };
  const onCloseSmallMoveScheduleTimeModal = () => {
    setScheduleTimeModal(false);
  };

  const navigationHandler = tagged_city => {
    setCityModal(false);
    if (homeServiceSelect === 'deliveries') {
      setDeliveryRequest(pre => ({
        ...pre,
        tagged_city: tagged_city,
        is_coupon_applied: false,
      }));
      navigation.navigate('DeliveryPickUp');
      return;
    }
    setRelocationRequest(pre => ({
      ...pre,
      tagged_city: tagged_city,
      is_coupon_applied: false,
    }));
    navigation.navigate('RelocationPickUp');
  };

  const onCardPressHandler = useCallback(
    cardData => {
      switch (cardData) {
        case 'moving_packing':
          setHomeServiceSelect(null);
          goToRelocation(relocationRequest);
          break;
        case 'deliveries':
          // if (relocationRequest?.moving_type === 'move_everything'){
          //   toastService.shortToast('Your relocation request is in progress. Please check the Relocation tab for details.');
          //   setTriggerBlink((prev) => !prev); // Toggle blinking
          //   break;
          // }
          setHomeServiceSelect(cardData); //remove
          goToDelivery(deliveryRequest);
          break;
        case 'book_truck_now':
          setHomeServiceSelect(null);
          goToOnDemandRide();
          break;

        default:
          break;
      }
    },
    [relocationRequest, deliveryRequest],
  );

  const trachMoveHandler = useCallback(ride_detail => {
    setGlobalRideId(ride_detail?.id);
    navigation.navigate('MoveDetails', {
      id: ride_detail?.id,
      navigateBackTo: 'Home',
    });
  }, []);

  const navigateHandler = useCallback(ride => {
    setGlobalRideId(ride?.id);
    setRideCreatedTime(ride?.ride_time);
    if (ride?.journey_status == null) {
      if (ride?.has_bid == 0) {
        if (ride?.is_scheduled) {
          setScheduled(ride?.is_scheduled);
        } else {
          setScheduled(false);
        }
        setBiddingAmount(ride?.bidding_amount);
        myCurrentRideStatus(ride?.status);
        navigation.navigate('SearchVehicle', {navigateBackTo: 'Home'});
      } else {
        navigation.navigate('BiddingSearchResults', {navigateBackTo: 'Home'});
      }
    } else if (
      (ride?.status == 'in_progress' && ride?.journey_status != 'finalised') ||
      ride?.status == 'accepted'
    ) {
      navigation.navigate('OnGoingRide', {
        id: ride?.id,
        navigateBackTo: 'Home',
      });
    } else {
      navigation.navigate('Invoice', {navigateBackTo: 'Home'});
    }
  }, []);

  const renderItem = ({item}) => (
    <TripCardSummary
      item={item}
      trachMoveHandler={trachMoveHandler}
      navigateHandler={navigateHandler}
    />
  );

  const cardDisabledHandler = item => {
    if (
      item.title == 'book_truck_now' &&
      multiRides &&
      multiRides.length >= 10
    ) {
      return true;
    } else {
      return item.disabled;
    }
  };

  const smallMoveNavigationHandler = title => {
    setSmallMoveModal(false);
    if (title == 'move_now') {
      navigation.navigate('PickUp');
    } else {
      setDatePIckerModal(true);
      // setScheduleTimeModal(true);
    }
  };

  const smallMoveScheduleTimeHandler = () => {
    setScheduleTimeModal(false);
    navigation.navigate('PickUp');
  };

  const onDatePickHandler = date => {
    setScheduledAt(date);
    setDatePIckerModal(false);
    setScheduleTimeModal(true);
  };

  return (
    <SafeAreaView style={styles.Topcontainer}>
      <View style={styles.mainContainer}>
        <NewHeader
          main
          notificationBell
          navigation={navigation}
          screenName={'Home'}
          titleStyle={styles.headerStyles}
        />
        <DraggableFAB
          draggableHeight={multiRides ? 90 : 45}
          image={AppImages.Whatsapp}
        />
        <ScrollView>
          <View style={styles.HomeCarouselContainer}>
            {banners ? (
              <HomeCarousel data={banners} />
            ) : (
              <HomeCarouselSkeleton />
            )}
          </View>

          <View style={styles.ourServicesDividerView}>
            <View>
              <Text style={styles.ourServicesDividerText}>
                {t('ourServices')}
              </Text>
            </View>
            <View style={styles.ourServicesDividerLine} />
          </View>
          <View style={styles.topBarView}>
            {ourServices && ourServices.length > 0 && (
              <HomeCard
                key={0}
                disabled={cardDisabledHandler(ourServices[0])}
                title={ourServices[0].title}
                subTitle={ourServices[0].description}
                image={ourServices[0].image}
                loading={ourServices[0].loading}
                onPress={onCardPressHandler}
                triggerBlink={triggerBlink}
                setTriggerBlink={setTriggerBlink}
              />
            )}
            <View style={styles.horizontalCardContainer}>
              {ourServices &&
                ourServices.slice(-2).map((item, key) => {
                  return (
                    <HomeVerticalCard
                      key={key}
                      disabled={cardDisabledHandler(item)}
                      title={item.title}
                      subTitle={item.description}
                      image={item.image}
                      loading={item.loading}
                      onPress={onCardPressHandler}
                    />
                  );
                })}
            </View>
          </View>

          {bootMeUpData &&
            bootMeUpData?.force_update &&
            bootMeUpData?.app_version != version && (
              <UpdateAppModal
                currentVersion={version}
                updatedVersion={bootMeUpData?.app_version}
                show={true}
              />
            )}
        </ScrollView>
      </View>
      {multiRides && multiRides.length > 0 && (
        <Modalize
          ref={modalizeRef}
          modalTopOffset={80}
          modelHeight={50}
          panGestureComponentEnabled={true}
          avoidKeyboardLikeIOS={true}
          alwaysOpen={Platform.OS === 'ios' ? 100 : 85}
          modalStyle={styles.modalStyle}
          handleStyle={styles.handleStyle}
          HeaderComponent={
            <View style={styles.modalHeader}>
              <Text style={styles.modulizeHeader}>
                {t('active_and_scheduled_moves')} ({multiRides.length})
              </Text>
            </View>
          }
          flatListProps={{
            data: multiRides,
            keyExtractor: item => item.id,
            showsVerticalScrollIndicator: false,
            renderItem,
          }}
        />
      )}

      {!auth?.is_survey_submited && (
        <SocialMediaModal
          visible={true}
          loadingState={btnPress}
          onSubmitPress={title => {
            socialSurveyRequest(title);
          }}
          onClose={() => setShowReasonModal(false)}
        />
      )}

      {cityModal && (
        <SelectCityModal
          size={'small'}
          transparent
          onClose={onCloseCityModal}
          draggable
          visible={cityModal}
          onPress={navigationHandler}
        />
      )}
      {surveyScheduleUpdated && (
        <RelocationSurveyUpdatedModal
          navigation={navigation}
          data={surveyScheduleUpdated}
          visible={surveyScheduleUpdated ? true : false}
          onClose={() => setSurveyScheduleUpdated(false)}
          onPress={relocationNavigationHandler}
        />
      )}
      {smallMoveModal && (
        <SmallMoveModal
          size={'small'}
          transparent
          onClose={onCloseSmallMoveModal}
          visible={smallMoveModal}
          onPress={smallMoveNavigationHandler}
        />
      )}
      {scheduleTimeModal && (
        <SmallMoveScheduleTimeModal
          mode={'light'}
          size={'small'}
          transparent
          onClose={onCloseSmallMoveScheduleTimeModal}
          min_hours={bootMeUpData?.min_hours_for_scheduled_rides}
          visible={scheduleTimeModal}
          onPress={smallMoveScheduleTimeHandler}
        />
      )}
      {datePIckerModal && (
        <DatePickerCustomDrawerModal
          mode={'default'}
          max_days={bootMeUpData?.max_days_for_scheduled_rides - 1}
          onClose={() => setDatePIckerModal(false)}
          draggable
          visible={datePIckerModal}
          onPress={onDatePickHandler}
        />
      )}
    </SafeAreaView>
  );
};
