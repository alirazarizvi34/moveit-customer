import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {getStyles} from './styles';
import moment from 'moment';
import {AppConstants} from '../../constants/AppConstants';
import useDateTimeManager from '../../hooks/useDateTimeManager';

const TripCard = ({
  discount,
  pickup,
  totalDistance,
  status,
  cardType,
  type,
  onPress,
  totalPrice,
  dropOff,
  dropOffCount,
  date,
  dateType,
}) => {
  const {i18n, t} = useTranslation();
  const {convertToLocal} = useDateTimeManager();
  const styles = getStyles(i18n.language);
  moment.locale('en');
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={AppConstants.buttonActiveOpacity}
      style={styles.container}>
      <View style={styles.textContainer}>
        <View style={[styles.textOuterContainer]}>
          <View style={styles.textInnerContainer}>
            <Text style={styles.label}>{t('type')}:</Text>
            <Text style={styles.value}>{type ? type : '-'}</Text>
          </View>
          {cardType !== 'moving' ? (
            <View style={styles.textInnerContainer}>
              <Text style={styles.label}>{t('total_distance')}:</Text>
              <Text style={styles.value}>{totalDistance ?? '-'}</Text>
            </View>
          ) : (
            <View style={styles.textInnerContainer}>
              <Text style={styles.label}>{t('discount')}:</Text>
              <Text style={styles.value}>
                {discount ? parseInt(discount).toFixed(2) : '-'}
              </Text>
            </View>
          )}
          {/* <View style={styles.textInnerContainer}>
                        <Text style={styles.label}>{t("discount")}:</Text>
                        <Text style={styles.value}>{discount ? parseInt(discount).toFixed(2) : "-"}</Text>
                    </View> */}
        </View>
        <View style={[styles.textOuterContainer, styles.sideContainerMargin]}>
          {/* {cardType !== "moving" ? <View style={styles.textInnerContainer}>
                        <Text style={styles.label}>{t("total_distance")}:</Text>
                        <Text style={styles.value}> {totalDistance ? parseInt(totalDistance).toFixed(2) : "-"}{" "}{totalDistance ? "Km" : ""} </Text>
                    </View> : ( */}
          <View style={styles.textInnerContainer}>
            <Text style={styles.label}>{t('survey_status')}:</Text>
            <Text style={styles.value}> {status ?? '-'} </Text>
          </View>
          {/* )} */}
          <View style={styles.textInnerContainer}>
            <Text style={styles.label}>{t('total_fare')}:</Text>
            <Text style={[styles.value, {textTransform: 'uppercase'}]}>
              {totalPrice ? 'PKR' : ''}{' '}
              {totalPrice ? parseInt(totalPrice).toFixed(2) : '-'}{' '}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.addressContainer}>
        <View style={styles.pickupContainer}>
          <Text style={styles.addressHeading}>{t('pickup_address')}:</Text>
          <Text style={styles.addressValue}>{pickup ?? '-'}</Text>
        </View>
        <View style={styles.dropOffContainer}>
          <Text style={styles.addressHeading}>
            {t('droppoff_address')}{' '}
            {dropOffCount > 1 && (
              <Text style={styles.multipleLabel}>(Multiple)</Text>
            )}
            :
          </Text>
          <Text style={styles.addressValue}>{dropOff ?? '-'}</Text>
        </View>
      </View>
      <View style={styles.dateContainer}>
      <Text style={styles.rideDateText}>
      {dateType == 'Survey' ? t('survey_date') : dateType == 'Move' ? t('move_date') : t('cancelled')}:
        </Text>
        <Text style={styles.rideDateText}>
          {date ? convertToLocal(date) : date ?? '-'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TripCard;
