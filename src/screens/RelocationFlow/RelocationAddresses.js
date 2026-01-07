import React, {useContext, useState, useEffect, useRef} from 'react';
import {GlobalContext} from '../../../context/GlobalState';
import {
  View,
  FlatList,
  SafeAreaView,
  BackHandler,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Platform,
  Text,
} from 'react-native';
import NewHeader from '../../components/Header/NewHeader';
import {useTranslation} from 'react-i18next';
import AddressList from '../../components/DropOffAddressList/AddressList';
import ButtonComponent from '../../components/buttonComp/ButtonComponent';
import MapView, {Marker, PROVIDER_GOOGLE, fitBounds} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoding';
import {useIsFocused, StackActions} from '@react-navigation/native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import RelocationProgressBar from '../../components/RelocationProgressBar/RelocationProgressBar';
import AlertModal from '../../components/Modal/AlertModal';
import useCancelRelocation from '../../hooks/useCancelRelocation';
import LoaderModal from '../../components/Modal/LoaderModal';
import {colorTheme} from '../../constants/ColorConstants';
import NegotiateAmountModal from '../../components/NegotiateAmountModal/NegotiateAmountModal';
import CancelReasonModal from '../../components/RelocationComponents/RelocationCancelReasonModal/CancelReasonModal';
import RelocationAddressList from '../../components/RelocationAddressList/RelocationAddressList';
import {AppImages} from '../../constants/AppImages';
import {AppConstants} from '../../constants/AppConstants';
import ToolTipComponent from '../../components/ToolTipComponent/ToolTipComponent';
import { THEME } from '../../shared/theme';
import useQuoteUpdate from '../../hooks/useQuoteUpdate';
import useMergn from '../../hooks/useMergn';

const {
  primaryText,
  lightGrayBorder,
  secondaryBorder,
  defaultBackground,
  toolTipInfoBackground,
  stepsBackground
} = colorTheme;
const {jameelNooriNastaleeq,latoSemiBold} = THEME.fonts;
export default RelocationAddresses = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const {} = useQuoteUpdate();
  const [mapRef, setMapRef] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isFocused = useIsFocused();
  const {width, height} = Dimensions.get('window');

  const ASPECT_RATIO = (width - 20) / 250;
  const LATITUDE_DELTA = 0.0322;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  // const { routes, index } = navigation.getState();
  const {cancelRelocationRequest, loadingState} = useCancelRelocation();
  const {eventHandler, attributeHandler, uniqueIdentifierHandler} = useMergn();
  const {
    markers,
    setMarkers,
    relocationRequest,
    setRelocationRequest,
    setRelocationSpaces,
    toolTip,
    setTooltip,
  } = useContext(GlobalContext);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showCancelReasonModal, setShowReasonModal] = useState(false);
  const [region, setRegion] = useState(null);
  const isAddressesToolTip = toolTip?.relocationAddress?.addressesToolTip;
  const styles = getStyles(i18n.language,isAddressesToolTip);

  const GOOGLE_MAPS_APIKEY = 'AIzaSyCEdwZcHigbRFSXQWhyltHm8f672YGzsJQ';
  Geocoder.init(GOOGLE_MAPS_APIKEY);
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

  useEffect(() => {
    if (markers.length > 0) {
      let minLat = markers[0].lat;
      let maxLat = markers[0].lat;
      let minLon = markers[0].lon;
      let maxLon = markers[0].lon;

      markers.forEach(marker => {
        minLat = Math.min(minLat, marker.lat);
        maxLat = Math.max(maxLat, marker.lat);
        minLon = Math.min(minLon, marker.lon);
        maxLon = Math.max(maxLon, marker.lon);
      });

      let latitudeDelta = Math.max(LATITUDE_DELTA, maxLat - minLat + 0.03);
      let longitudeDelta = Math.max(LONGITUDE_DELTA, maxLon - minLon + 0.03);

      if (latitudeDelta > 4) {
        latitudeDelta = latitudeDelta + 2.0;
      }

      if (longitudeDelta > 4) {
        longitudeDelta = longitudeDelta + 2.0;
      }
      // if (latitudeDelta > longitudeDelta) {
      //   latitudeDelta = latitudeDelta + 0.5;
      //   longitudeDelta = longitudeDelta + 0.5;
      // }

      if (
        relocationRequest?.tagged_city !== 'same_city' &&
        latitudeDelta > 1.5 &&
        longitudeDelta > 1.5
      ) {
        latitudeDelta = latitudeDelta + 2.0;

        longitudeDelta = longitudeDelta + 2.0;
      } else if (latitudeDelta > 1.3 && longitudeDelta > 1.3) {
        latitudeDelta = latitudeDelta + 1;

        longitudeDelta = longitudeDelta + 1;
      }
      const calculatedRegion = {
        latitude: (minLat + maxLat) / 2,
        longitude: (minLon + maxLon) / 2,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      };
      setRegion(calculatedRegion);
    }
    // mapRef?.current?.fitBounds(markers);
  }, [markers]);

  useEffect(() => {
    if (mapRef && markers.length > 0) {
      fitToMarkers();
    }
  }, [mapRef, markers]);
  const fitToMarkers = () => {
    if (mapRef?.current && markers.length > 0) {
      mapRef?.current.fitToCoordinates(markers, {
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50}, // Adjust padding as needed
        animated: true,
      });
    }
  };

  const backAction = () => {
    if(relocationRequest?.status == 'draft'){
      navigation.navigate('Home');
    }
    return true;
  };

  const delectAddress = id => {
    const currentMarkerIndex = markers.findIndex((val, index) => index == id);
    if (currentMarkerIndex !== -1) {
      markers.splice(currentMarkerIndex, 1);
      setMarkers([...markers]);
    }
  };

  const markersHandler = () => {
    let marker = [];
    for (let index = 0; index < markers.length; index++) {
      const element = markers[index];
      marker.push({...element, id: index});
    }
    return marker;
  };
  const addressHandler = id => {
    const currentMarkerIndex = markers.findIndex((val, index) => index == id);
    if (currentMarkerIndex !== -1) {
      let coords = markers[currentMarkerIndex];
      if (coords?.type == 'p') {
        coords.type = 'c'; //Update Type because user wants to change to address, c (change).
        coords.animateToRegion = true;
        setMarkers([...markers]);
        navigation.navigate('RelocationPickUp', {coords, id});
      } else {
        coords.type = 'c'; //Update Type because user wants to change to address, c (change).
        coords.animateToRegion = true;
        setMarkers([...markers]);
        navigation.navigate('RelocationDropOff', {coords, id});
      }
    }
  };

  const calculateEstimatedKm = async () => {
    navigation.popToTop();
    navigation.navigate('RelocationPropertyDetails');
    if(Platform.OS == 'android'){
    const eventMessage1 = await eventHandler('Pick Up Details');
    const eventMessage2 = await eventHandler('Drop off Details');
    }
  };

  const headerNavigationHandler = () => {
    if (relocationRequest?.id) {
      setShowAlertModal(true);
      return;
    }
    setMarkers([]);
    setRelocationRequest(null);
    setRelocationSpaces(AppConstants?.relocationSpaces);
    navigation.navigate('Home');
  };
  const onCloseModalPressHandler = () => {
    setShowAlertModal(false);
    setShowReasonModal(true);
  };

  const toolTipBtnHandler = () => {
    setTooltip(pre => ({
      ...pre,
      relocationAddress: {...pre.relocationAddress, addressesToolTip: false, isTrue:false},
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {loadingState && <LoaderModal load={loadingState} textShow={false} />}
      {showAlertModal && (
        <NegotiateAmountModal
          data={relocationRequest}
          onModalClose={() => setShowAlertModal(false)}
          visible={showAlertModal}
          onClosePress={onCloseModalPressHandler}
        />
      )}
      {showCancelReasonModal && (
        <CancelReasonModal
          loadingState={loadingState}
          onSubmitPress={reasonIndex =>
            cancelRelocationRequest(relocationRequest?.id, reasonIndex)
          }
          visible={showCancelReasonModal}
          onClose={() => setShowReasonModal(false)}
        />
      )}
      <NewHeader
        title={'Confirm Address'}
        cancelButton={true}
        customNavigator={headerNavigationHandler}
      />
       <View style={styles.shadowWrapper}>
       <View style={styles.progressBarContainer}>
          <RelocationProgressBar progressCount={2} />
        </View>
        </View>
      <ScrollView>
        <View style={styles.addressContainer}>
          <ToolTipComponent
            isVisible={isAddressesToolTip}
            contentText={AppConstants.confirmAddressTooltipText}
            onPressForward={toolTipBtnHandler}>
            <View
              style={[
                styles.addressListContainer,
                isAddressesToolTip && styles.toolTipAddressListContainer,
              ]}>
              {markersHandler().map((address, index) => (
                <RelocationAddressList
                isTouchDisable={isAddressesToolTip}
                  onAddressPress={() => addressHandler(address.id)}
                  title={address?.title}
                  type={address?.type}
                  key={index}
                />
              ))}
            </View>
          </ToolTipComponent>
        </View>
        <View
          style={{
            borderBottomColor: lightGrayBorder,
            borderBottomWidth: 2,
            marginHorizontal: moderateScale(22),
            marginVertical: moderateVerticalScale(25),
          }}
        />
        <View style={styles.mapViewContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            ref={ref => setMapRef(ref)}
            pitchEnabled={false}
            scrollEnabled={false}
            // mapType={Platform.OS == 'android' ? 'terrain' : 'mutedStandard'}
            zoomEnabled={false}
            rotateEnabled={false}
            style={styles.mapView}
            region={region}
            initialRegion={region}>
              {markers[0]?.lat && markers[0]?.lat &&  
            <MapViewDirections
              strokeWidth={3}
              strokeColor={primaryText}
              origin={{
                latitude: markers[0]?.lat,
                longitude: markers[0]?.lon,
              }}
              destination={{
                latitude: markers[1]?.lat,
                longitude: markers[1]?.lon,
              }}
              apikey={GOOGLE_MAPS_APIKEY}
              precision="high"
            />
              }
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{latitude: marker?.lat, longitude: marker?.lon}}
                title={marker?.title}
                description={marker?.neighborhood}>
                <Image
                  resizeMode="contain"
                  style={{height: 14, width: 16}}
                  source={
                    marker.type == 'p'
                      ? AppImages.locationPin
                      : AppImages.dropoffpin
                  }
                />
              </Marker>
            ))}
          </MapView>
        </View>
      </ScrollView>
      <View style={styles.bottomButtonView}>
        <ButtonComponent
          disabled={markers.length <= 1 ? true : false}
          text={'Continue'}
          textStyle={styles.btnText}
          onPress={calculateEstimatedKm}
        />
      </View>
    </SafeAreaView>
  );
};

const getStyles = (language,isTooltip) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    addressListView: {
      marginTop: moderateVerticalScale(25),
    },
    bottomButtonView: {
      justifyContent: 'flex-end',
      alignSelf: 'flex-end',
      width: '100%',
      paddingHorizontal: moderateScale(27),
      marginBottom: moderateVerticalScale(10),
    },
    progressContainer: {
      paddingTop: moderateScale(12),
    },
    addressContainer: {
      marginHorizontal: isTooltip ? moderateScale(11) : moderateScale(22),
      paddingTop: moderateVerticalScale(15),
      flex: 1,
    },
    mapViewContainer: {
      height: moderateScale(251),
      marginHorizontal: moderateScale(22),
      borderRadius: moderateScale(15),
      overflow:'hidden',
      marginBottom: moderateVerticalScale(20)
    },
    mapView: {
      flex: 1,
    },
    btnText: {
      fontSize: scale(20),
      fontFamily: latoSemiBold,
    },
    addressListContainer: {
      width: '100%',
      gap: 15,
      paddingVertical: 10,
      // marginBottom:moderateVerticalScale(12)
    },
    toolTipAddressListContainer: {
      width: '100%',
      borderRadius: 8,
      borderWidth: 2,
      borderColor: secondaryBorder,
      backgroundColor: defaultBackground,
      padding: 10,
      // backgroundColor:'red',
    },
    progressBarContainer: {
      paddingVertical: moderateVerticalScale(15),
      backgroundColor: stepsBackground,
      borderBottomRightRadius: moderateScale(8),
      borderBottomLeftRadius: moderateScale(8),
      // iOS shadow properties
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 12,
        shadowColor: '#000000',
      },
    }),
    },
    shadowWrapper: {
      overflow: 'hidden',
      paddingBottom: 5, // Add padding to show the bottom shadow
      borderBottomRightRadius: moderateScale(8),
      borderBottomLeftRadius: moderateScale(8),
    },
  });
