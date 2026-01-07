import React, {useContext,memo} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GlobalContext} from '../../../context/GlobalState';
import {useTranslation} from 'react-i18next';
import {AppImages} from '../../constants/AppImages';
import { getStyles } from './OnGoingRideFooterStyle';

const OnGoingRideFooter = ({callHandler}) => {
  const {t, i18n} = useTranslation();
  
  const styles = getStyles(i18n.language);
  const {getRideDetails, activeRide} = useContext(GlobalContext);

  return (
      <View style={styles.bottomContainer}>
        <View style={styles.profileMainContainer}>
          <Image
            source={
              getRideDetails && getRideDetails?.driver?.basic_info?.avatar != null
                ? {
                    uri: getRideDetails?.driver?.basic_info?.avatar,
                  }
                : AppImages.men1
            }
            style={styles.profileImage}
          />
          <View style={styles.profileContainer}>
            <View style={styles.profileView}>
              <Text style={styles.profileName}>{getRideDetails?.driver?.basic_info?.name}</Text>

              <View style={styles.ratingView}>
                <Icon name="star" size={12} color="#ffc107" />
                <Text style={styles.rating}>
                  {getRideDetails?.driver?.reviews_avg_rating}
                </Text>
                <Text style={styles.reviewsCount}>
                  ({getRideDetails?.driver?.reviews_count})
                </Text>
              </View>
            </View>

            <View style={styles.contactInfoView}>
              <TouchableOpacity style={styles.contactInfoView} onPress={() => callHandler(getRideDetails?.driver?.basic_info?.phone)}>
              <Image source={AppImages.call} style={styles.phoneImage} />
             
              <Text style={styles.phoneNo}>{getRideDetails?.driver?.basic_info?.phone}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.vehicleInfoContainer}>
          <View style={styles.vehicleInfoView}>
            <Text style={styles.vehicleType}>
              {getRideDetails?.vehicle?.vehicle_type}
            </Text>
            <View style={styles.verticleLine} />
            <Text style={styles.vehicleNo}>{getRideDetails?.vehicle?.vehicle_number ? getRideDetails?.vehicle?.vehicle_number : 'XXX-XXX'}</Text>
          </View>
          <View style={styles.vehicleImageView}>
            {getRideDetails && getRideDetails?.vehicle?.image != null &&
            <Image
            source={
              {  uri: getRideDetails?.vehicle?.image}
            }
            style={styles.vehicleImage}
          />
            }
          </View>
        </View>
      </View>
  );
};

export default memo(OnGoingRideFooter);