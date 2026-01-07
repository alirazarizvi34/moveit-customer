import React, {memo} from 'react';
import {Text, View, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import {THEME} from '../../shared/theme';
import {useTranslation} from 'react-i18next';
import {getStyles} from './styles';
import {AppConstants} from '../../constants/AppConstants';
import rideJurneyStatus from '../../data/rideJurneyStatus';
import {rideStatusColorHandler} from '../../helperFunction/helperfunction';
import {colorTheme} from '../../constants/ColorConstants';
import useDateTimeManager from '../../hooks/useDateTimeManager';

const {priTxtColor, colorFFBE50, color0359FF, colorF9693C, color22995A} =
  THEME.colors;
const {secondaryBackground, primaryBackground} = colorTheme;
const TripCardSummary = ({
  item,
  trachMoveHandler = () => {},
  navigateHandler = () => {},
}) => {
  const {i18n, t} = useTranslation();
  const {convertToLocal} = useDateTimeManager();
  const footerBgColorHandler = () => {
    if (item?.status == 'scheduled') {
      return secondaryBackground;
    } else {
      return primaryBackground;
    }
  };
  const styles = getStyles(i18n.language, footerBgColorHandler);
  const rideStatus = rideJurneyStatus(i18n.language);

  const textHandler = () => {
    var originalString = t('scheduled_for');
    var convertedString = originalString.toLowerCase();
    convertedString = convertedString.charAt(0).toUpperCase() + convertedString.slice(1);
    return convertedString;
  }

  return (
    <TouchableOpacity
      activeOpacity={AppConstants.buttonActiveOpacity}
      style={styles.container}
      onPress={() => trachMoveHandler(item)}>
      <View style={styles.mainView}>
        <View style={styles.ColumnView}>
          <View style={styles.vehicleTypeView}>
            <Text style={styles.vehicleTypeText}>{t('vehicle_type')} :</Text>
            <Text style={styles.vehicleTypeValue}>{item?.vehicle_type}</Text>
          </View>

          <View style={styles.vehicleStatusView}>
            <Text style={styles.vehicleStatusText}>{t('status')} :</Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={[
                styles.vehicleStatusValue,
                {
                  color: rideStatusColorHandler(
                    item?.status == 'in_progress'
                      ? item?.journey_status
                      : item?.status,
                  ),
                },
              ]}>
              {rideStatus.map(res => {
                return res[
                  item?.status == 'in_progress'
                    ? item?.journey_status
                    : item?.status
                ];
              })}
            </Text>
          </View>
        </View>

        <View style={styles.ColumnView}>
          <View style={styles.vehicleDistanceView}>
            <Text style={styles.vehicleDistanceText}>
              {item?.has_bid ? t('received_bids') : t('est_distance')} :
            </Text>
            <Text style={styles.vehicleDistanceValue}>
              {item?.has_bid ? item?.bids_count : item?.est_km}
            </Text>
          </View>
          <View style={styles.trackMoveView}>
            <TouchableOpacity onPress={() => navigateHandler(item)}>
              <Text style={styles.trackMove}>
                {(!item?.journey_status && item?.has_bid) ||
                !item?.journey_status
                  ? t('view')
                  : t('track_move')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.footerView}>
      <Text style={styles.footerText}>
          {item?.status == 'scheduled' && textHandler()}
          </Text>
        <Text style={styles.footerText}>
          {convertToLocal(item?.ride_date + ' ' + item?.ride_time)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default memo(TripCardSummary);
