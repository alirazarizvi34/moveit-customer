import React, {useEffect, useState} from 'react';
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
import {getStyles} from './RelocationBookingDetailsStyles';
import {AppImages} from '../constants/AppImages';
import DropPinCount from '../components/DropPinCount/DropPinCount';
import {useIsFocused} from '@react-navigation/native';
import useDateTimeManager from '../hooks/useDateTimeManager';

const RelocationBookingDetails = ({navigation, route}) => {
  const {i18n, t} = useTranslation();
  const isFocused = useIsFocused();
  const {convertToLocal} = useDateTimeManager();
  const [bookingDetails, setBookingDetails] = useState(
    typeof route?.params?.response == 'string'
      ? JSON.parse(route?.params?.response)
      : route?.params?.response,
  );
  const [bookingInvoiceDetails, setBookingInvoiceDetails] = useState(
    typeof route?.params?.response?.invoice == 'string'
      ? JSON.parse(route?.params?.response?.invoice)
      : route?.params?.response?.invoice,
  );

  const styles = getStyles(i18n.language);
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
    if (bookingDetails?.navigateBackTo) {
      navigation.navigate(bookingDetails?.navigateBackTo);
    } else {
      navigation.goBack();
    }
    return true;
  };


  const onGoBackCallback = () => {
    navigation.navigate('Home');
    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      <NewHeader
        title={t('bookingDetails')}
        navigation={navigation}
        customNavigator={backAction}
        rightIcon={AppImages.headerHome}
        onRightIconPress={onGoBackCallback}
      />
      <View style={styles.innerContainer}>
        <View style={styles.topBar}>
          <Text style={styles.topBarLabel}>
            {t('bookedFor')}:{' '}
            <Text style={styles.topbarValue}>
              {bookingDetails?.moving_date &&
                convertToLocal(
                  bookingDetails?.moving_date +
                    ' ' +
                    bookingDetails?.moving_time,
                  'default_with_day',
                )}
            </Text>
          </Text>
        </View>

        <ScrollView>
          <View style={styles.detailsContainer}>
            <View style={styles.detailsInnerContainer}>
              <Text style={styles.detailsLabel}>{t('transportCharges')}:</Text>
              <Text style={styles.detailsValue}>
                {bookingInvoiceDetails?.transport_cost
                  ? `PKR ${bookingInvoiceDetails?.transport_cost}`
                  : '-'}
              </Text>
            </View>
            <View style={styles.detailsInnerContainer}>
              <Text style={styles.detailsLabel}>
                {t('Loading / Unloading Charges')}:
              </Text>
              <Text style={styles.detailsValue}>
                {bookingInvoiceDetails?.labour_cost
                  ? `PKR ${bookingInvoiceDetails?.labour_cost}`
                  : '-'}
              </Text>
            </View>
            <View style={styles.detailsInnerContainer}>
              <Text style={styles.detailsLabel}>
                {t('packing_unpacking_charges')}:
              </Text>
              <Text style={styles.detailsValue}>
                {bookingInvoiceDetails?.package_cost
                  ? `PKR ${bookingInvoiceDetails?.package_cost}`
                  : '-'}
              </Text>
            </View>
            <View style={styles.detailsInnerContainer}>
              <Text style={styles.detailsLabel}>
                {t('assemblingDisassemblingCharges')}:
              </Text>
              <Text style={styles.detailsValue}>
                {bookingInvoiceDetails?.assembling_cost
                  ? `PKR ${bookingInvoiceDetails?.assembling_cost}`
                  : '-'}
              </Text>
            </View>

            <View style={styles.detailsInnerContainer}>
              <Text style={styles.detailsLabel}>
                {t('additionalServices')}:
              </Text>
              <Text style={styles.detailsValue}>
                {bookingInvoiceDetails?.additional_cost
                  ? `PKR ${bookingInvoiceDetails?.additional_cost}`
                  : '-'}
              </Text>
            </View>

            <View style={styles.detailsInnerContainer}>
              <Text style={styles.detailsLabel}>{t('serviceCharges')}:</Text>
              <Text style={styles.detailsValue}>
                {bookingInvoiceDetails?.service_cost
                  ? `PKR ${bookingInvoiceDetails?.service_cost}`
                  : '-'}
              </Text>
            </View>

            <View style={styles.detailsInnerContainer}>
              <Text style={styles.detailsLabel}>{t('Protection Cost')}:</Text>
              <Text style={styles.detailsValue}>
                {bookingInvoiceDetails?.protection_cost
                  ? `PKR ${bookingInvoiceDetails?.protection_cost}`
                  : '-'}
              </Text>
            </View>

            <View style={styles.detailsInnerContainer}>
              <Text style={styles.detailsLabel}>{t('taxAmount')}:</Text>
              <Text style={styles.detailsValue}>
                {bookingInvoiceDetails?.tax
                  ? `PKR ${bookingInvoiceDetails?.tax}`
                  : '-'}
              </Text>
            </View>

            <View style={styles.detailsInnerContainer}>
              <Text style={styles.detailsLabel}>{t('Status')}:</Text>
              <Text style={styles.status}>{bookingDetails?.status}</Text>
            </View>

            <View style={styles.detailsInnerContainer}>
              <Text style={styles.detailsLabel}>{t('advancePayment')}:</Text>
              <Text style={styles.detailsValue}>
                {bookingInvoiceDetails?.advance_amount
                  ? `PKR ${bookingInvoiceDetails?.advance_amount}`
                  : '-'}
              </Text>
            </View>

            <View style={styles.detailsInnerContainer}>
              <Text style={styles.detailsLabel}>{t('paymentMethod')}:</Text>
              <Text style={styles.detailsValue}>{bookingInvoiceDetails?.payment_type}</Text>
            </View>

            <View style={styles.detailsInnerContainer}>
              <Text style={styles.detailsLabel}>{t('totalPayment')}:</Text>
              <Text style={styles.detailsValue}>
                {bookingInvoiceDetails?.total_amount
                  ? `PKR ${bookingInvoiceDetails?.total_amount}`
                  : '-'}
              </Text>
            </View>

            <View style={styles.detailsInnerContainer}>
              <Text style={styles.remainingPayment}>
                {t('remainingPayment')}:
              </Text>
              <Text style={styles.remainingPayment}>
                {bookingInvoiceDetails?.remaining_amount
                  ? `PKR ${bookingInvoiceDetails?.remaining_amount}`
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
                <Text style={styles.addressLabel}>{t('Pickup Address')}:</Text>
              </View>
              <View style={styles.addressValueContainer}>
                <Text style={styles.addressValue}>
                  {bookingDetails?.pickup_title}
                </Text>
              </View>
            </View>
            <View>
              <View style={styles.addressLabelContainer}>
                <DropPinCount number={1} />
                <Text style={styles.addressLabel}>
                  {t('Drop-off Address')}:
                </Text>
              </View>
              <View style={styles.addressValueContainer}>
                <Text style={styles.addressValue}>
                  {bookingDetails?.dropoff_title}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default RelocationBookingDetails;
