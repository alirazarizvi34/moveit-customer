import React, {useState, useContext, useEffect} from 'react';
import {
  Platform,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  BackHandler
} from 'react-native';
import {GlobalContext} from '../../../context/GlobalState';
import toastService from '../../services/toast-service';
import Icon from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';
import {moderateVerticalScale, scale} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import ButtonComponent from '../../components/buttonComp/ButtonComponent';
import LoaderModal from '../../components/Modal/LoaderModal';
import NewHeader from '../../components/Header/NewHeader';
import InVoiceService from '../../services/InVoiceService';
import {getStyles} from './InvoiceStyle';
import UseFcmNotification from '../../hooks/UseFcmNotification';
import { useIsFocused } from "@react-navigation/native";

const {color4E008A, colorWhite, colorBlack, color666666, colorF0F0F0} =
  THEME.colors;
const {jameelNooriNastaleeq, latoRegular, latoSemiBold, latoMedium} =
  THEME.fonts;

export default Invoice = ({navigation,route}) => {
  const {getGlobalRideId, setMyCurrentRideStatus, myCurrentRideStatus} =
    useContext(GlobalContext);
  const {fcmData} = UseFcmNotification();
  const {t, i18n} = useTranslation();
  const isFocused = useIsFocused();
  const styles = getStyles(i18n.language);
  const [disInfoDropDown, setdisInfoDropDown] = useState(true);
  const [priceBreakDropDown, setpriceBreakDropDown] = useState(true);
  const [getCustomerInvoive, setCustomerInvoive] = useState(null);
  const [getLoader, setLoader] = useState(true);
  const [navigateBackTo, setNavigateBackTo] = useState(route?.params?.navigateBackTo);

  useEffect(() => {
    if(isFocused){
      BackHandler.addEventListener('hardwareBackPress', backAction);
      navigation.addListener('gestureEnd', backAction);
    }else{
      BackHandler.removeEventListener('hardwareBackPress', backAction);
      navigation.removeListener('gestureEnd', backAction);
    }
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
      navigation.removeListener('gestureEnd', backAction);
    };
  }, [isFocused]);

    const backAction = () => {
      navigation.navigate(navigateBackTo ? navigateBackTo : 'Home');
      return true;
    };

  useEffect(() => {
    let params = {
      ride_id: getGlobalRideId,
    };
    InVoiceService.InvoiceDetail(params)
      .then(({data}) => {
        setCustomerInvoive(data?.data);
        setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        toastService.shortToast(error?.response?.data?.message);
      });
  }, []);

  useEffect(() => {
    if (fcmData) {
      let fcm_ride_data = fcmData;
        if(getGlobalRideId == fcm_ride_data?.ride_id){
          if (fcm_ride_data?.ride_status == 'delivered') {
          myCurrentRideStatus(fcm_ride_data?.ride_status);
        }
        }
    }
    return () => {
      fcmData;
    };
  }, [fcmData]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          {getLoader && <LoaderModal load={getLoader} />}
          <NewHeader title={t('invoice')} />

          <ScrollView>
            {/* <View
              style={{
                marginHorizontal: moderateScale(10),
                marginVertical: moderateVerticalScale(10),
                   flexDirection: i18n.language === 'urdu' ? 'row-reverse' : 'column',
              }}>
              <Text
                style={{
                  fontSize: i18n.language === 'urdu' ? scale(24) : scale(16),
                  fontFamily:
                    i18n.language === 'urdu'
                      ? jameelNooriNastaleeq
                      : latoMedium,
                  lineHeight:
                    i18n.language === 'urdu'
                      ? moderateVerticalScale(34)
                      : moderateVerticalScale(20),
                  color: colorBlack,
                }}>
                {t('pickup_dropoff_details')}
              </Text>
            </View> */}

            {/* <View style={styles.locationContainer}>
              <ScrollView nestedScrollEnabled={true}>
                {getCustomerInvoive?.markers.map((items, index) => {
                  return (
                    <View key={index} style={styles.locationView}>
                      <View style={styles.locationLabelView}>
                        <Text style={[styles.text, {color: color646464}]}>
                          {items?.type == 'p' ? 'Pickup:' : `Dropoff ${index}:`}
                        </Text>
                      </View>

                      <View style={styles.locationTitleView}>
                        <Text style={[styles.text, {color: color0F0F0F}]}>
                          {items?.title}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View> */}

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setdisInfoDropDown(!disInfoDropDown)}>
              <View style={styles.dropDownHeader}>
                <View style={styles.dropDownHeaderView}>
                  <Text style={styles.dropDownHeaderTitle}>
                    {t('distance_information')}
                  </Text>
                  <Icon
                    name={disInfoDropDown ? 'up' : 'down'}
                    size={18}
                    color={colorBlack}
                    style={{alignSelf: 'center'}}
                  />
                </View>
              </View>
            </TouchableOpacity>

            {disInfoDropDown && (
              <View style={styles.distanceInfoContainer}>
                <View style={styles.totalKmView}>
                  <Text style={styles.totalKm}>{t('total_kilometers')}</Text>
                  <Text style={[styles.text, {color: color666666}]}>
                    {getCustomerInvoive?.mean_km}
                  </Text>
                </View>

                <View style={styles.rideDurationView}>
                  <Text style={styles.rideDuration}>{t('total_time')}</Text>
                  <Text style={[styles.text, {color: color666666}]}>
                    {getCustomerInvoive?.ride_duration}
                  </Text>
                </View>
              </View>
            )}

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setpriceBreakDropDown(!priceBreakDropDown)}>
              <View style={styles.dropDownHeader}>
                <View style={styles.dropDownHeaderView}>
                  <Text style={styles.dropDownHeaderTitle}>
                    {t('prices_breakdown')}
                  </Text>
                  <Icon
                    name={priceBreakDropDown ? 'up' : 'down'}
                    size={18}
                    color={colorBlack}
                    style={{alignSelf: 'center'}}
                  />
                </View>
              </View>
            </TouchableOpacity>

            {priceBreakDropDown && (
              <View style={styles.pricesContainer}>
                {getCustomerInvoive?.labour_amount != 0 && (
                  <View style={styles.labourAmountView}>
                    <Text style={styles.labourAmount}>
                      {t('loading_unloading')}
                    </Text>
                    <Text style={[styles.text, {color: color666666}]}>
                      {getCustomerInvoive?.labour_amount}
                    </Text>
                  </View>
                )}

                <View style={styles.subTotalView}>
                  <Text style={styles.subTotal}>
                    {t('price_breakdown_subtotal')}
                  </Text>
                  <Text style={[styles.text, {color: color666666}]}>
                    Rs. {getCustomerInvoive?.subtotal}
                  </Text>
                </View>

                <View style={styles.taxView}>
                  <Text style={styles.tax}>{t('tax')} (%):</Text>
                  <Text style={[styles.text, {color: color666666}]}>
                    Rs. {getCustomerInvoive?.tax}
                  </Text>
                </View>

                <View style={styles.totalAmountView}>
                  <Text style={styles.totalAmountTitle}>
                    {t('total_amount')}
                  </Text>
                  <Text style={styles.totalAmount}>
                    Rs. {getCustomerInvoive?.total_amount}
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <ButtonComponent
              disabled={setMyCurrentRideStatus == 'delivered' ? false : true}
              pressStatus={false}
              icon={{
                name: 'arrow-right',
                color: colorWhite,
                size: scale(30),
              }}
              btnStyle={{
                backgroundColor:
                  setMyCurrentRideStatus == 'delivered'
                    ? color4E008A
                    : colorF0F0F0,
              }}
              textStyle={{
                fontSize: i18n?.language === 'urdu' ? scale(32) : scale(20),
                fontFamily:
                  i18n?.language === 'urdu'
                    ? jameelNooriNastaleeq
                    : latoRegular,
                textAlign: 'center',
                bottom:
                  i18n?.language === 'urdu'
                    ? Platform.OS === 'ios'
                      ? moderateVerticalScale(0)
                      : moderateVerticalScale(5)
                    : moderateVerticalScale(0),
              }}
              onPress={() =>
                navigation.navigate('RatingReview', {
                 driverInfo: {name:getCustomerInvoive?.driver_name,avatar:getCustomerInvoive?.driver_avatar}, rideCount: getCustomerInvoive?.ride_count,
                })
              }
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
