import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  BackHandler,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import NewHeader from '../components/Header/NewHeader';
import {getStyles} from './MoveDetailsStyles';
import {AppImages} from '../constants/AppImages';
import DropPinCount from '../components/DropPinCount/DropPinCount';
import ButtonComponent from '../components/buttonComp';
import appService from '../services/app-service';
import LoaderModal from '../components/Modal/LoaderModal';
import {GlobalContext} from '../../context/GlobalState';
import rideJurneyStatus from '../data/rideJurneyStatus';
import {useIsFocused} from '@react-navigation/native';
import {rideStatusColorHandler} from '../helperFunction/helperfunction';
import {colorTheme} from '../constants/ColorConstants';
import AlertModal from '../components/Modal/AlertModal';
import ScheduleCancelReasonModal from '../components/Modal/ScheduleCancelReasonModal';
import useSmallMoveRideCancel from '../hooks/useSmallMoveRideCancel';
import useDateTimeManager from '../hooks/useDateTimeManager';
import useRemoveEmojies from '../hooks/useRemoveEmojies';

const {
  errorBackground,
  secondaryBackground,
  primaryText,
  errorText,
  defaultText,
} = colorTheme;
const MoveDetails = ({navigation, route}) => {
  const {
    myCurrentRideStatus,
    setBiddingAmount,
    setGlobalRideId,
    setRideCreatedTime,
    setScheduled,
  } = useContext(GlobalContext);
  const {i18n, t} = useTranslation();
  const isFocused = useIsFocused();
  const {cancelRideRequest, loadingState} = useSmallMoveRideCancel();
  const {removeEmojies} = useRemoveEmojies();
  const {
    timeDifferenceWithCurrentTime,
    convertToLocal,
    isScheduledCancel,
    scheduleDateLocal,
  } = useDateTimeManager();
  const rideStatus = rideJurneyStatus(i18n.language);
  const [rideDetails, setRideDetails] = useState(null);
  const [loader, setLoader] = useState(true);
  const [rideId, setRideId] = useState(route?.params?.id);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showScheduledReasonModal, setScheduledReasonModal] = useState(false);
  const [cancelReasonText, setCancelReasonText] = useState(null);
  const [isText, setIsText] = useState(false);

  const actinBtnBgColorHandler = () => {
    if (isScheduledCancel && rideDetails?.status == 'scheduled') {
      return errorBackground;
    } else {
      return secondaryBackground;
    }
  };
  const actinBtnTxtColorHandler = () => {
    if (isScheduledCancel && rideDetails?.status == 'scheduled') {
      return errorText;
    } else {
      return primaryText;
    }
  };
  const styles = getStyles(
    i18n.language,
    actinBtnBgColorHandler,
    actinBtnTxtColorHandler,
  );

  useEffect(() => {
    if (isFocused) {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      navigation.addListener('gestureEnd', backAction);
    } else {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
      navigation.removeListener('gestureEnd', backAction);
    }
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
      navigation.removeListener('gestureEnd', backAction);
    };
  }, [isFocused]);

  const backAction = () => {
    if (route?.params?.navigateBackTo) {
      navigation.navigate(route?.params?.navigateBackTo);
    } else {
      navigation.goBack();
    }
    return true;
  };

  useEffect(() => {
    if (rideId) {
      appService
        .rideDetails(rideId)
        .then(({data}) => {
          setRideDetails(data?.data);
          if (data?.data?.status == 'scheduled') {
            timeDifferenceWithCurrentTime(
              data?.data?.ride_date,
              data?.data?.ride_time,
              'default_with_day'
            );
          }
          setLoader(false);
        })
        .catch(error => {
          setLoader(false);
        });
    }
  }, [rideId]);

  const pickupDropOffHandler = () => {
    const data = {pickup: '', dropOff: []};
    const markers = rideDetails?.markers;

    if (Array.isArray(markers)) {
      for (let index = 0; index < markers.length; index++) {
        const marker = markers[index];
        if (marker.type == 'p') {
          data.pickup = marker?.title;
        } else {
          data.dropOff.push(marker.title);
        }
      }
    }
    return data;
  };
  const onGoingRideHandler = () => {
    setScheduled(rideDetails?.is_scheduled);
    if (isScheduledCancel && rideDetails?.status == 'scheduled') {
      setShowWarningModal(true);
    } else {
      setScheduled(rideDetails?.is_scheduled);
      setGlobalRideId(rideDetails?.id);
      setRideCreatedTime(rideDetails?.ride_time);

      if (rideDetails?.journey_status == null) {
        if (rideDetails?.has_bid == 0) {
          setBiddingAmount(rideDetails?.bidding_amount);
          myCurrentRideStatus(rideDetails?.status);
          navigation.navigate('SearchVehicle', {navigateBackTo: 'MoveDetails'});
        } else {
          navigation.navigate('BiddingSearchResults', {
            navigateBackTo: 'MoveDetails',
          });
        }
      } else if (
        (rideDetails?.status == 'in_progress' &&
          rideDetails?.journey_status != 'finalised') ||
        rideDetails?.status == 'accepted'
      ) {
        navigation.navigate('OnGoingRide', {
          id: rideDetails?.id,
          navigateBackTo: 'MoveDetails',
        });
      } else {
        myCurrentRideStatus(rideDetails?.journey_status);
        navigation.navigate('Invoice', {navigateBackTo: 'MoveDetails'});
      }
    }
  };

  const AlertModalHandler = () => {
    setShowWarningModal(false);
    setScheduledReasonModal(true);
  };

  const ScheduleCancelReasonSubmitHandler = () => {
    const text = cancelReasonText ? removeEmojies(cancelReasonText) : null;
    if (text) {
      cancelRideRequest('Searching vehicle', text);
    } else {
      setIsText(true);
    }
  };

  const onGoBackCallback = () => {
    navigation.navigate('Home');
    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      {showWarningModal && (
        <AlertModal
          titleColor={primaryText}
          loadingState={loadingState}
          visible={showWarningModal}
          loader={loadingState}
          onClose={() => setShowWarningModal(false)}
          rejectPress={() => setShowWarningModal(false)}
          acceptPress={() => AlertModalHandler()}
          title={t('scheduled_warning_title')}
        />
      )}
      {showScheduledReasonModal && (
        <ScheduleCancelReasonModal
          isText={isText}
          inPutValue={cancelReasonText}
          onChangeInputValue={text => {
            setIsText(false);
            setCancelReasonText(text);
          }}
          titleColor={defaultText}
          loadingState={loadingState}
          visible={showScheduledReasonModal}
          loader={loadingState}
          onClose={() => setScheduledReasonModal(false)}
          rejectPress={() => setScheduledReasonModal(false)}
          acceptPress={() => ScheduleCancelReasonSubmitHandler()}
          title={t('scheduled_reason_title')}
        />
      )}
      <NewHeader
        title={t('move_details')}
        navigation={navigation}
        customNavigator={backAction}
        rightIcon={AppImages.headerHome}
        onRightIconPress={onGoBackCallback}
      />
      {loader && <LoaderModal load={loader} />}
      {rideDetails?.status == 'scheduled' && isScheduledCancel == false && (
        <View style={styles.scheduledAlertSliderView}>
          <Image
            style={styles.scheduledAlertSliderImage}
            source={AppImages.AlertTriangle}
          />
          <Text style={styles.scheduledAlertSliderText}>
            {t('scheduled_alert_slider_text')}
          </Text>
        </View>
      )}

      <View style={styles.innerContainer}>

        <View style={styles.topBar}>
          {rideDetails?.status == 'scheduled' ? (
            <Text style={styles.topBarLabel}>
              {t('scheduled_for')}:{" "}
              <Text style={styles.topbarValue}>{scheduleDateLocal}</Text>
            </Text>
          ) : (
            <Text style={styles.topBarLabel}>
              {t('move_date')}:{" "}
              <Text style={styles.topbarValue}>
                {rideDetails?.ride_date &&
                  convertToLocal(
                    rideDetails?.ride_date + ' ' + rideDetails?.ride_time,'default_with_day'
                  )}
              </Text>
            </Text>
          )}
        </View>

        {rideDetails?.journey_status != 'completed' && (
          <View style={styles.buttonView}>
            <ButtonComponent
              pressStatus={false}
              disabled={false}
              text={
                isScheduledCancel && rideDetails?.status == 'scheduled'
                  ? t('cancel_request')
                  : (!rideDetails?.journey_status && rideDetails?.has_bid) ||
                    !rideDetails?.journey_status
                  ? t('view')
                  : rideDetails?.journey_status == 'delivered'
                  ? t('feedback')
                  : t('track_move')
              }
              btnStyle={styles.btnContainer}
              textStyle={styles.btnText}
              onPress={onGoingRideHandler}
            />
          </View>
        )}
        <ScrollView>
          <View style={styles.detailsContainer}>
            <View style={styles.detailsInnerContainer}>
              <Text style={styles.detailsLabel}>{t('movers_name')}:</Text>
              <Text style={styles.detailsValue}>
                {rideDetails?.driver?.basic_info?.name
                  ? rideDetails?.driver?.basic_info?.name
                  : '-'}
              </Text>
            </View>
            <View style={styles.detailsInnerContainer}>
              <Text style={styles.detailsLabel}>{t('car_type')}:</Text>
              <Text style={styles.detailsValue}>
                {rideDetails?.vehicle?.vehicle_type}
              </Text>
            </View>
            <View style={styles.detailsInnerContainer}>
              <Text style={styles.detailsLabel}>{t('status')}:</Text>
              <Text
                style={[
                  styles.detailsValue,
                  {
                    color: rideStatusColorHandler(
                      rideDetails?.status == 'in_progress'
                        ? rideDetails?.journey_status
                        : rideDetails?.status,
                    ),
                  },
                ]}>
                {rideStatus.map(res => {
                  return res[
                    rideDetails?.status == 'in_progress'
                      ? rideDetails?.journey_status
                      : rideDetails?.status
                  ];
                })}
              </Text>
              {/* <Text style={styles.detailsValue}>{rideDetails?.journey_status_msg}</Text> */}
            </View>
            <View style={styles.detailsInnerContainer}>
              <Text style={styles.detailsLabel}>
                {rideDetails?.invoice ? t('total_distance') : t('est_distance')}
                :
              </Text>
              <Text style={styles.detailsValue}>
                {rideDetails?.invoice?.mean_km
                  ? rideDetails?.invoice?.mean_km
                  : rideDetails?.est_km}
              </Text>
            </View>
            <View style={styles.detailsInnerContainer}>
              <Text style={styles.detailsLabel}>
                {t('loading_unloading_charges')}:
              </Text>
              <Text style={[styles.detailsValue, styles.detailsCapital]}>
                {rideDetails?.invoice?.labour_amount
                  ? `PKR ${rideDetails?.invoice?.labour_amount}`
                  : '-'}
              </Text>
            </View>
            <View style={styles.detailsInnerContainer}>
              <Text style={styles.detailsLabel}>
                {t('price_breakdown_subtotal')}
              </Text>
              <Text style={[styles.detailsValue, styles.detailsCapital]}>
                {rideDetails?.invoice?.subtotal
                  ? `PKR ${rideDetails?.invoice?.subtotal}`
                  : '-'}
              </Text>
            </View>
            <View style={styles.detailsInnerContainer}>
              <Text style={styles.detailsLabel}>{t('tax')}:</Text>
              <Text style={[styles.detailsValue, styles.detailsCapital]}>
                {rideDetails?.invoice?.tax
                  ? `PKR ${rideDetails?.invoice?.tax}`
                  : '-'}
              </Text>
            </View>

            <View style={styles.detailsInnerContainer}>
              <Text style={styles.totalText}>{t('total_fare')}:</Text>
              <Text style={[styles.totalValue, styles.detailsCapital]}>
                {rideDetails?.invoice?.total_amount
                  ? `PKR ${rideDetails?.invoice?.total_amount}`
                  : '-'}
              </Text>
            </View>
          </View>
          <View style={styles.lineBreak} />

          <View style={styles.addressContainer}>
            <View>
              <View style={styles.addressLabelContainer}>
                <Image
                  resizeMode="contain"
                  style={styles.icon}
                  source={AppImages.locationPin}
                />
                <Text style={styles.addressLabel}>{t('pickup_address')}:</Text>
              </View>
              <View style={styles.addressValueContainer}>
                <Text style={styles.addressValue}>
                  {pickupDropOffHandler()?.pickup}
                </Text>
              </View>
            </View>
            {pickupDropOffHandler()?.dropOff.map((address, index) => (
              <View key={index}>
                <View style={styles.addressLabelContainer}>
                  <DropPinCount number={index + 1} />
                  <Text style={styles.addressLabel}>
                    {t('droppoff_address')}:
                  </Text>
                </View>
                <View style={styles.addressValueContainer}>
                  <Text style={styles.addressValue}>{address}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MoveDetails;
