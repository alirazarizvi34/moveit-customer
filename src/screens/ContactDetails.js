import Geocoder from 'react-native-geocoding';
import React, {useState, useContext, useEffect, useRef} from 'react';
import {ScrollView, View, Text, Keyboard, SafeAreaView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useFormik} from 'formik';
import analytics from '@react-native-firebase/analytics';

import {GOOGLE_MAPS_API_KEY} from '@env';
import {GlobalContext} from '../../context/GlobalState';

import validationSchema from '../validationSchema/contactDetailsValidationSchema';
import toastService from '../services/toast-service';
import moment from 'moment';
import ButtonComponent from '../components/buttonComp/ButtonComponent';
import InputText from '../components/InputText';
import LoaderModal from '../components/Modal/LoaderModal';
import Bidding from '../components/Modal/Bidding';
import APIClient from '../services/api-client';
import NewHeader from '../components/Header/NewHeader';
import {getStyles} from './ContactDetailsStyles';
import useLocation from '../hooks/useLocation';
import {StackActions} from '@react-navigation/native';
import useDateTimeManager from '../hooks/useDateTimeManager';

const apiClient = new APIClient('/ride/request');

const GOOGLE_MAPS_APIKEY = GOOGLE_MAPS_API_KEY;
Geocoder.init(GOOGLE_MAPS_APIKEY);

export default ContactDetails = ({navigation}) => {
  const mymapref = useRef();
  const {t, i18n} = useTranslation();
  const {markersSortHandler} = useLocation();
  const {convertToLocal} = useDateTimeManager();

  const {
    auth,
    markers,
    getRefCoordinates,
    globalLabours,
    getEstimatedTime,
    getEstimatedKM,
    Globalvehicle,
    attachPicture,
    city,
    myCurrentRideStatus,
    locationState,
    isBidding,
    additionalMessage,
    setGlobalLabours,
    setLoadingUnLoading,
    biddingAmount,
    setAdditionalMessage,
    mediaKeys,
    setMediaKeys,
    setGlobalRideId,
    setMarkers,
    setInitialCoordinates,
    setGlobalCoordinates,
    setGlobalVehicle,
    setAttachPicture,
    setRideRequestId,
    setIsBidding,
    setHasBid,
    setBiddingAmount,
    setDriverBiddingList,
    setRideCreatedTime,
    scheduledAt,
    setScheduled,
  } = useContext(GlobalContext);

  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [btnPress, setBtnPress] = useState(false);
  const [getModal, setModal] = useState(false);
  const [keyBoardHeight, setKeyBoardHeight] = useState(false);
  const [getLoader, setLoader] = useState(false);

  let currentNewDate = new Date();
  let mydate = currentNewDate.getTime() + 18000000;
  const [date, setDate] = useState(new Date(mydate));
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1;
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  month = month <= 9 ? '0' + month : month;
  day = day <= 9 ? '0' + day : day;
  let newDate = year + '-' + month + '-' + day;
  const newTime = JSON.stringify(date).split('T')[1].split('.')[0];
  let tempDate = '' + newDate + ' ' + newTime;

  useEffect(() => {
    const keyboardDidShowlistner = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        setKeyBoardHeight(true);
      },
    );

    const keyboardDidHidelistner = Keyboard.addListener(
      'keyboardDidHide',
      event => {
        setKeyBoardHeight(false);
      },
    );
    return () => {
      keyboardDidShowlistner.remove();
      keyboardDidHidelistner.remove();
    };
  }, [keyBoardHeight]);

  useEffect(() => {
    setTimeout(() => {
      animateToCenter();
    }, 100);
  }, []);

  const initialValues = {
    name: '',
    contactNo: '',
    senderName: auth?.name,
    senderContactNo: auth?.phone,
  };

  const animateToCenter = () => {
    mymapref?.current?.animateToRegion(getRefCoordinates);
  };

  const onSubmit = async values => {
    let firbaseEventObject = {
      preferred_vehicle: Globalvehicle?.name,
      loading_unloading: globalLabours,
    };

    const titles = markers.forEach((res, index) => {
      if (res?.type == 'p') {
        firbaseEventObject = {
          ...firbaseEventObject,
          pickup_address: res?.title,
        };
      } else {
        firbaseEventObject = {
          ...firbaseEventObject,
          ['dropoff_address_' + index]: res?.title,
        };
      }
    });
    setModal(false);
    setLoader(true);
    let numRegexPattern = /^[0-9]*$/;
    let num = values?.contactNo;
    let senderContactNo = values?.senderContactNo;

    if (num != '' && senderContactNo != '') {
      if (
        numRegexPattern?.test(num) &&
        numRegexPattern?.test(senderContactNo)
      ) {
        if (
          numRegexPattern?.test(num) &&
          numRegexPattern?.test(senderContactNo)
        ) {
          let ReceiverContactpattern = num?.charAt(0) + '' + num?.charAt(1);
          let SenderContactpattern =
            senderContactNo?.charAt(0) + '' + senderContactNo?.charAt(1);
          num = num.substring(1);
          senderContactNo = senderContactNo?.substring(1);
          senderContactNo = '92' + senderContactNo;
          num = '92' + num;
          if (ReceiverContactpattern != '03' || SenderContactpattern != '03') {
            if (ReceiverContactpattern != '03') {
              setBtnPress(false);
              toastService.shortToast(
                'Phone number should start with 03 in receiver`s details',
              );
            } else {
              setBtnPress(false);
              toastService.shortToast(
                'Phone number should start with 03 in sender`s details',
              );
            }
            setLoader(false);
            return;
          }
        } else {
          setLoader(false);
          setBtnPress(false);
          toastService.shortToast('Phone number should contain only numbers');
          return;
        }
      }
    }

    const formData = new FormData();
    formData.append('markers', JSON.stringify(markers));
    formData.append('load_image', attachPicture[0]);
    formData.append('vehicle_id', Globalvehicle?.id);
    formData.append('vehicle_type', Globalvehicle?.vehicle_type);
    formData.append('state_name', locationState);
    formData.append('city', city);
    formData.append('media_key', mediaKeys);
    formData.append('payment_type', 'cash');
    formData.append('date', tempDate);
    formData.append(
      'receiver',
      JSON.stringify({name: values?.name, contact: values?.contactNo}),
    );
    formData.append(
      'sender',
      JSON.stringify({
        name: values?.senderName,
        contact: values?.senderContactNo,
      }),
    );
    formData.append('labour_required', globalLabours);
    formData.append('est_km', getEstimatedKM);
    formData.append('est_time', +getEstimatedTime.toFixed(2));
    formData.append('additional_details', additionalMessage);
    if (scheduledAt) {
      formData.append('scheduled_at', scheduledAt);
    }
    if (isBidding && biddingAmount) {
      formData.append('is_bid_allowed', isBidding);
      formData.append('bidding_amount', biddingAmount);
    }
    if(Globalvehicle?.discount_availability){
      formData.append('discount_availability', Globalvehicle?.discount_availability);
    }

    const headers = {
      'Content-Type': 'multipart/form-data;',
    };
    await apiClient
      .post(formData, headers)
      .then(async function (data) {
        await analytics().logEvent('ondemandPre', firbaseEventObject);
        await analytics().logEvent('bidSendoffer', {
          users_fare: biddingAmount,
          estimated_fare: Globalvehicle?.final_est_fare,
        });
        setGlobalRideId(data?.data?.data?.ride_id);
        if (data?.data?.success) {
          setMediaKeys('');
          setAdditionalMessage('');
          setGlobalLabours(0);
          setLoadingUnLoading(false);
        }
        myCurrentRideStatus(data?.data?.data?.state);
        setRideCreatedTime(data?.data?.data?.ride_time);
        setMarkers([]);
        setGlobalVehicle(null);
        setGlobalLabours(0);
        setAttachPicture([]);
        setScheduled(data?.data?.data?.is_scheduled);
        navigation.navigate('SearchVehicle');
        setLoader(false);
      })
      .catch(function (error) {
        setLoader(false);
        toastService.shortToast(error?.response?.data?.message);
      });
  };

  const buttonPressHandler = async () => {
    let firbaseEventObject = {
      preferred_vehicle: Globalvehicle?.name,
      loading_unloading: globalLabours,
    };

    const titles = markers.forEach((res, index) => {
      if (res?.type == 'p') {
        firbaseEventObject = {
          ...firbaseEventObject,
          pickup_address: res?.title,
        };
      } else {
        firbaseEventObject = {
          ...firbaseEventObject,
          ['dropoff_address_' + index]: res?.title,
        };
      }
    });

    await analytics().logEvent('ondemandPre', firbaseEventObject);
    if (
      !isValid ||
      values?.name === '' ||
      values?.contactNo === '' ||
      values?.senderName === '' ||
      values?.senderContactNo === ''
    ) {
      toastService.shortToast('Please fill this form first');
      return;
    }
    if (scheduledAt) {
      handleSubmit();
      return;
    }
    setModal(true);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    isSubmitting,
    isValid,
    handleSubmit,
  } = formik;

  const styles = getStyles(i18n.language, errors, touched);
  return (
    <>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.subContainer}>
          {getLoader && <LoaderModal load={getLoader} />}
          {/* start Bottom modal */}
          <NewHeader navigation={navigation} title={t('booking_summary')} />

          <View style={styles.innerContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.scrollContainer}>
                <View style={styles.vehicleHeadingContainer}>
                  <Text style={styles.heading}>{t('vehicle_details')}</Text>
                  <Text style={styles.subHeadingValue}>
                    {Globalvehicle?.name}
                  </Text>
                </View>

                {scheduledAt && (
                  <View style={styles.vehicleHeadingContainer}>
                    <Text style={styles.heading}>{t('scheduled_for')}{i18n.language != 'urdu' && ':'}</Text>
                    <Text style={styles.subHeadingValue}>
                      {convertToLocal(scheduledAt, 'ordinal_suffix')}
                    </Text>
                  </View>
                )}

                <View style={styles.detailsContainer}>
                  <View style={styles.senderContainer}>
                    <Text style={styles.heading}>
                      {t('contact_details')} -{' '}
                    </Text>
                    <Text style={styles.label}>{t('sender_details')}</Text>
                  </View>
                  <InputText
                    placeholder="Name"
                    inLineStyle={styles.senderNameInputStyles}
                    keyboardType="default"
                    onChangeText={handleChange('senderName')}
                    error={errors?.senderName && touched?.senderName}
                    onBlur={handleBlur('senderName')}
                    value={values?.senderName}
                  />
                  {errors?.senderName && touched?.senderName && (
                    <Text style={styles.errorText}>
                      {t(errors?.senderName)}
                    </Text>
                  )}
                </View>

                <InputText
                  placeholder="Contact No"
                  inLineStyle={styles.senderContactInputStyles}
                  error={errors?.senderContactNo && touched?.senderContactNo}
                  maxLength={11}
                  keyboardType="numeric"
                  onChangeText={handleChange('senderContactNo')}
                  onBlur={handleBlur('senderContactNo')}
                  value={values?.senderContactNo}
                />

                {errors?.senderContactNo && touched?.senderContactNo && (
                  <Text style={styles.errorText}>
                    {t(errors?.senderContactNo)}
                  </Text>
                )}

                <View style={styles.reciverContainer}>
                  <View style={styles.receiverContainer}>
                    <Text style={styles.heading}>
                      {t('contact_details')} -{' '}
                    </Text>
                    <Text style={styles.recieverDetailsText}>
                      {t('receiver_details')}
                    </Text>
                  </View>

                  <View style={styles.nameInputContainer}>
                    <InputText
                      placeholder="Name"
                      inLineStyle={styles.nameInputStyles}
                      keyboardType="default"
                      onChangeText={handleChange('name')}
                      error={errors?.name && touched?.name}
                      onBlur={handleBlur('name')}
                      value={values?.name}
                    />
                    {errors.name && touched.name && (
                      <Text style={styles.errorText}>{t(errors?.name)}</Text>
                    )}
                  </View>

                  <InputText
                    placeholder="Contact No"
                    inLineStyle={styles.contactNoinputStyles}
                    keyboardType="numeric"
                    onChangeText={handleChange('contactNo')}
                    error={errors?.contactNo && touched?.contactNo}
                    onBlur={handleBlur('contactNo')}
                    value={values?.contactNo}
                    maxLength={11}
                  />
                  {errors?.contactNo && touched?.contactNo && (
                    <Text style={styles.errorText}>{t(errors?.contactNo)}</Text>
                  )}
                </View>
                <View style={styles.detailsHeadingContainer}>
                  <Text style={styles.detailsHeading}>
                    {t('pickup_and_dropoff_details')}
                  </Text>
                </View>
                <View style={styles.addressDetailContainer}>
                  <ScrollView nestedScrollEnabled>
                    {/* TODOS  */}
                    <View style={styles.addressDetailsSubContainer}>
                      <View style={styles.addressLabelView}>
                        <Text style={styles.addressLabel}>{t('pickup')}:</Text>
                      </View>
                      <Text style={styles.addressValue}>
                        {markersSortHandler().pickup?.title}
                      </Text>
                    </View>
                    {markersSortHandler().droppOff.map((marker, index) => (
                      <View
                        key={index}
                        style={styles.addressDetailsSubContainer}>
                        <View style={styles.addressLabelView}>
                          <Text style={styles.addressLabel}>
                            {t('dropoff')} {index + 1}:
                          </Text>
                        </View>
                        <Text style={styles.addressValue}>{marker.title}</Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </ScrollView>

            <View style={styles.estimatedFareContainer}>
              <Text style={styles.estimatedLabel}>
                {scheduledAt ? t('total_fare') : t('estimated_fare')}
              </Text>

              <View
                  style={{
                  alignItems: 'center',
                  flexDirection: 'row',gap:5}}>
                   <Text style={styles.estimatedValue}>
                   PKR {Globalvehicle?.final_est_fare}
                </Text>

                {Globalvehicle?.discount_availability &&
                <Text style={styles.estimatedInnerValue}>
                {Globalvehicle?.est_fare}
                </Text>
                }
                  
                  </View>
            </View>

            <View style={styles.buttonContainer}>
              <ButtonComponent
                disabled={false}
                pressStatus={btnPress}
                text={scheduledAt ? t('bookNow') : t('bid_own_fare')}
                btnStyle={styles.btnStyle}
                textStyle={styles.btnTextStyles}
                onPress={buttonPressHandler}
              />
            </View>
            {/* Bidding component */}
            <Bidding
              title={t('your_offer')}
              data={{
                estimatedFare: String(Globalvehicle?.final_est_fare),
              }}
              showModal={getModal}
              titleTextStyle={styles.biddingTextStyle}
              onModalClose={() => {
                setModal(false);
              }}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

// 734
