import Geocoder from 'react-native-geocoding';
import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ImageBackground,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import {GlobalContext} from '../../../context/GlobalState';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {scale} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import ButtonComponent from '../buttonComp/ButtonComponent';
import InputTextComponent from '../inputTextComp';
import {AppImages} from '../../constants/AppImages';
import { getStyles } from '../../screens/OnGoingRideFlow/OnGoingRideStyle';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCEdwZcHigbRFSXQWhyltHm8f672YGzsJQ';
Geocoder.init(GOOGLE_MAPS_APIKEY);

const {colorFFBE50, colorWhite} = THEME.colors;

export default MapViewComponent = ({
    driverLocation
}) => {
  const styles = getStyles();
  const {
    markers,
  } = useContext(GlobalContext);
  let myMapRef = useRef();

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);


  return (
    <MapView
          ref={myMapRef}
          provider={PROVIDER_GOOGLE}
          style={{height: '100%'}}
          initialRegion={{
            latitude: driverLocation ? driverLocation?.latitude : latitude,
            longitude: driverLocation ? driverLocation?.longitude : longitude,
            latitudeDelta: 5.1,
            longitudeDelta: 5.1,
          }}>
          {markers?.map((marker, i) => {
            if (marker?.latitude == 0) {
              return;
            }
            return (
              <Marker
                key={i}
                coordinate={{
                  latitude: marker?.lat,
                  longitude: marker?.lon,
                }}
                trackViewChanges={false}
                zIndex={i}
                pinColor={'#4C1F6B'}>
                {marker.type == 'd' ? (
                  <ImageBackground
                    source={AppImages.dropoffSimple}
                    style={styles.dropOffMarker}>
                    <Text style={styles.dropOffMarkerText}>{i}</Text>
                  </ImageBackground>
                ) : (
                  <Image
                    source={AppImages.locationPin}
                    style={styles.pickUpMarker}
                  />
                )}
              </Marker>
            );
          })}

          {driverLocation != null && (
            <Marker
              coordinate={{
                latitude: driverLocation?.latitude,
                longitude: driverLocation?.longitude,
              }}
              zIndex={Math.random()}
              trackViewChanges={false}
              pinColor={'yellow'}
              image={AppImages.driver}></Marker>
          )}
        </MapView>
  );
};
