import React, { useState, useContext ,useEffect} from 'react';
import {
  View,
  FlatList,
  Text
} from 'react-native';
import { useTranslation } from 'react-i18next';
import UseRides from '../hooks/UseRides';

import { getStyles } from './CompletedTripsStyles'
import { GlobalContext } from '../../context/GlobalState';
import TripCard from '../components/TripCard/TripCard';
import NoTripCard from '../components/NoTripCard/NoTripCard';
import ListBottomLoader from '../components/ListBottomLoader/ListBottomLoader';

const CompletedTrips = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const { getRideHistoryData, loadingTrips } = UseRides();

  const styles = getStyles(i18n.language)

  const { myTrips } = useContext(GlobalContext);

  useEffect(()=>{
    getRideHistoryData();
  },[])

  return (
    <View style={styles.container}>

      {Array.isArray(myTrips) && myTrips.length > 0 ? < FlatList
        data={myTrips}
        showsVerticalScrollIndicator={false}

        renderItem={({ item, index }) =>
          <TripCard
            onPress={() => navigation.navigate("MoveDetails", {id:item?.id})}
            key={index}
            trip={item}
            dateType={item?.moving_date ?? 'Move'}
            status={item?.journey_status}
            dropOffCount={item?.dropoff_count}
            totalPrice={item?.invoice?.total_amount}
            dropOff={item?.markers[item?.markers?.length - 1]?.title}
            pickup={item?.markers[0]?.title}
            totalDistance={item?.invoice?.mean_km}
            type={item?.vehicle_type}
            date={item?.ride_date+' '+item?.ride_time}
          />
        }
        onEndReached={!loadingTrips && getRideHistoryData}
        onEndReachedThreshold={0.5}

        ListFooterComponent={() => loadingTrips && <ListBottomLoader />
        }
      /> : !loadingTrips&& <NoTripCard />}
    </View>
  );
};

export default CompletedTrips;

