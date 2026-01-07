import Geocoder from 'react-native-geocoding';
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  BackHandler,
} from 'react-native';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import {GlobalContext} from '../../../context/GlobalState';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {scale} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import ButtonComponent from '../buttonComp/ButtonComponent';
import InputTextComponent from '../inputTextComp';
import {AppImages} from '../../constants/AppImages';
import {getStyles} from './GoogleMapStyle';
import DropPinCount from '../DropPinCount/DropPinCount';
import {useTranslation} from 'react-i18next';
import {useIsFocused} from '@react-navigation/native';
import NewHeader from '../Header/NewHeader';
import {colorTheme} from '../../constants/ColorConstants';
import RelocationProgressBar from '../RelocationProgressBar/RelocationProgressBar';
import GoogleMapPinWithInput from './GoogleMapPinWithInput';
import {AppConstants} from '../../constants/AppConstants';
import ToolTipComponent from '../ToolTipComponent/ToolTipComponent';
import DeliveryProgressBar from '../../screens/DeliveriesFlow/DeliveryProgressBar/DeliveryProgressBar';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCEdwZcHigbRFSXQWhyltHm8f672YGzsJQ';
Geocoder.init(GOOGLE_MAPS_APIKEY);

const {lightGrayBackground, primaryBackground} = colorTheme;
const mappingScreens = [
  {PickUp: 'confirmPickup'},
  {DropOff: 'confirmDropoff'},
  {RelocationPickUp: 'confirmPickup'},
  {RelocationDropOff: 'confirmDropoff'},
];

const forwardScreens = {
  PickUp: 'DropOffAddresses',
  DropOff: 'DropOffAddresses',
  RelocationDropOff: 'RelocationAddresses',
  RelocationPickUp: 'RelocationAddresses',
  DeliveryPickUp: 'DeliveryAddresses',
  DeliveryDropOff: 'DeliveryAddresses',
};

export default GoogleMap = ({
  navigation,
  headerTitle,
  data,
  onPress,
  onRequestCancel,
  mapMover,
  onPressNavigation,
  inputPlaceHolder,
  navigateBackTo,
  onPressClearText,
  toolTipAllow = false,
  toolTipConentText = null,
  toolTiponPress,
}) => {
  const mymapref = useRef();
  const {t, i18n} = useTranslation();
  const isFocused = useIsFocused();
  const styles = getStyles(i18n.language);
  const {currentCoords, markers, setMarkers} = useContext(GlobalContext);
  const [latDelta, setLatDelta] = useState(0.002);
  const [lngDelta, setLngDelta] = useState(0.002);
  const [selection, setSelection] = useState({start: 0, end: 0}); // This hooks only use for text selection
  const [isLoading, setLoading] = useState(true);
  const locationInfo = data;

  useEffect(() => {
    if (locationInfo) {
      setLoading(false);
      const latitude = locationInfo?.lat;
      const longitude = locationInfo?.lon;
      if (locationInfo?.animateToRegion) {
        if (mymapref && mymapref.current) {
          setTimeout(() => {
            mymapref.current.animateToRegion({
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.002,
              longitudeDelta: 0.002,
            });
          }, 3);
        }
      }
    }
  }, [locationInfo]);

  useEffect(() => {
    if (isFocused) {
      BackHandler.addEventListener(
        'hardwareBackPress',
        headerNavigationHandler,
      );
      navigation.addListener('gestureEnd', headerNavigationHandler);
    } else {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        headerNavigationHandler,
      );
      navigation.removeListener('gestureEnd', headerNavigationHandler);
    }
    return () => {
      setLoading(false);
      BackHandler.removeEventListener(
        'hardwareBackPress',
        headerNavigationHandler,
      );
      navigation.removeListener('gestureEnd', headerNavigationHandler);
    };
  }, [isFocused]);

  //This function use for text selection, because Inputtext long string does not start from begning on android
  const onSelectionChange = ({nativeEvent: {selection, text}}) => {
    if (Platform.OS === 'android') {
      setSelection(selection);
    }
  };

  //Disable Handlers
  const navigationButonDisableHandler = () => {
    return locationInfo && locationInfo?.title && !isLoading ? false : true;
  };

  const buttonTextHandler = useCallback(() => {
    const buttonText = mappingScreens.find(screen => {
      if (screen[navigateBackTo]) {
        return screen[navigateBackTo];
      }
    });
    return buttonText[navigateBackTo];
  }, []);

  const headerNavigationHandler = () => {
    const currentMarkerIndex = markers.findIndex(
      (val, index) => val.type == 'c',
    );
    if (markers.length > 1) {
      if (currentMarkerIndex !== -1) {
        if (currentMarkerIndex > 0) {
          markers[currentMarkerIndex].type = 'd';
        } else {
          markers[currentMarkerIndex].type = 'p';
        }
        setMarkers([...markers]);
        navigation.navigate(forwardScreens[navigateBackTo]);
        return true;
      } else {
        navigation.navigate(forwardScreens[navigateBackTo]);
        return true;
      }
    } else {
      navigation.goBack();
      return true;
    }
  };

  const requestCancel = () => {
    // isDrag Enable
    setLoading(true);
    onRequestCancel();
  };

  const clearTextHandler = () => {
    setLoading(true);
    onPressClearText();
  };

  const progressBarHandler = () => {
    if (
      navigateBackTo == 'RelocationPickUp' ||
      navigateBackTo == 'DeliveryPickUp'
    ) {
      return 1;
    } else {
      return 2;
    }
  };

  const isPickUp = ['PickUp', 'RelocationPickUp', 'DeliveryPickUp'].includes(
    navigateBackTo,
  );

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.conainer}>
          <MapView
            style={{flex: 1}}
            // customMapStyle={AppConstants.customMapStyles}
            onPanDrag={() => requestCancel()}
            ref={mymapref}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: locationInfo?.lat ? locationInfo?.lat : 0,
              longitude: locationInfo?.lon ? locationInfo?.lon : 0,
              latitudeDelta: latDelta,
              longitudeDelta: lngDelta,
            }}
            scrollDuringRotateOrZoomEnabled={false}
            pitchEnabled={false}
            showsCompass={false}
            rotateEnabled={true}
            zoomControlEnabled={false}
            scrollEnabled={true}
            zoomEnabled={true}
            onRegionChangeComplete={region => {
              mapMover(region);
            }}>
            {markers.length > 0 &&
              markers?.map((marker, i) => {
                if (marker?.lat == 0) {
                  return;
                }
                return (
                  <Marker
                    key={i}
                    coordinate={{
                      latitude: marker?.lat,
                      longitude: marker?.lon,
                    }}
                    pinColor={marker?.color}>
                    <View style={styles.googleMarkersView}>
                      {marker?.type == 'd' ? (
                        <>
                          <GoogleMapPinWithInput title={marker?.title} />
                          <DropPinCount
                            textStyle={styles.dropPinCountTxt}
                            style={styles.dropPinCountView}
                            number={i}
                          />
                        </>
                      ) : marker?.type == 'p' ? (
                        <>
                          <GoogleMapPinWithInput title={marker?.title} />
                          <Image
                            source={AppImages.locationPin}
                            style={styles.locationPin}
                          />
                        </>
                      ) : null}
                    </View>
                  </Marker>
                );
              })}
            {currentCoords && currentCoords?.lat ? (
              <Marker
                coordinate={{
                  latitude: currentCoords?.lat,
                  longitude: currentCoords?.lon,
                }}>
                <View style={styles.currentMarkerView}>
                  <Image
                    source={AppImages.currentPointer}
                    style={styles.googlePointerIcon}
                  />
                </View>
              </Marker>
            ) : null}
          </MapView>

          <View style={styles.moverView}>
            <GoogleMapPinWithInput title={locationInfo?.title} />

            <Image
              source={isPickUp ? AppImages.locationPin : AppImages.dropoffpin}
              style={isPickUp ? styles.locationPin : styles.dropOffPin}
            />
            {/* {navigateBackTo == 'PickUp' ||
            navigateBackTo == 'RelocationPickUp' || navigateBackTo == 'DeliveryPickUp' ? (
              <Image
                source={AppImages.locationPin}
                style={styles.locationPin}
              />
            ) : (
              <Image source={AppImages.dropoffpin} style={styles.dropOffPin} />
            )} */}
          </View>

          <View style={styles.headerContainer}>
            <NewHeader
              title={t(headerTitle)}
              navigation={navigation}
              titleStyle={styles.headerStyles}
              customNavigator={() => headerNavigationHandler()}
            />

            {/* {navigateBackTo == 'RelocationPickUp' || navigateBackTo == 'DeliveryPickUp' || navigateBackTo == 'DeliveryDropOff'
             || navigateBackTo == 'RelocationDropOff' ? (
              <View style={styles.shadowWrapper}>
              <View style={styles.ProgressContainer}>
                <RelocationProgressBar progressCount={progressBarHandler()} />
              </View>
              </View>
            ) : null} */}

            {['RelocationPickUp', 'RelocationDropOff'].includes(
              navigateBackTo,
            ) && (
              <View style={styles.shadowWrapper}>
                <View style={styles.ProgressContainer}>
                  <RelocationProgressBar progressCount={progressBarHandler()} />
                </View>
              </View>
            )}

            {['DeliveryPickUp', 'DeliveryDropOff'].includes(navigateBackTo) && (
              <View style={styles.shadowWrapper}>
                <View style={styles.ProgressContainer}>
                  <DeliveryProgressBar progressCount={progressBarHandler()} />
                </View>
              </View>
            )}

            <View style={styles.inputContainer}>
              <ToolTipComponent
                isVisible={toolTipAllow}
                contentHeight={123}
                contentWidth={218}
                contentText={toolTipConentText}
                onPressForward={toolTiponPress}>
                <View
                  style={[
                    styles.inputView,
                    toolTipAllow && styles.toolTipInputView,
                  ]}>
                  <TouchableOpacity
                    disabled={toolTipAllow}
                    activeOpacity={1}
                    onPress={() => {
                      navigation.navigate(
                        'SearchAddress',
                        (navigateBackTo = {navigateBackTo}),
                      );
                    }}>
                    <InputTextComponent
                      isTouchDisable={toolTipAllow}
                      bgColor={lightGrayBackground}
                      placeholder={inputPlaceHolder}
                      borderShadow={true}
                      editable={false}
                      imageLeft={{show: true, url: AppImages?.inputIcon}}
                      imageRight={{show: true, url: AppImages?.crossBtn}}
                      value={locationInfo?.title}
                      onSelectionChange={event => onSelectionChange(event)}
                      onPressIcon={clearTextHandler}
                      selection={Platform.OS === 'android' ? selection : null}
                      pointerEvents="none"
                    />
                  </TouchableOpacity>
                </View>
              </ToolTipComponent>
            </View>
          </View>

          <View style={styles.gpsButtonView}>
            <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
              <IconMaterial
                style={styles.gpsButton}
                name={'gps-fixed'}
                size={scale(24)}
                color={primaryBackground}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonView}>
            <ButtonComponent
              pressStatus={false}
              disabled={navigationButonDisableHandler()}
              onPressIn={onPressNavigation}
              text={t('continue')}
              btnStyle={
                navigationButonDisableHandler()
                  ? styles.disbaleBtnStyle
                  : styles.btnStyle
              }
              textStyle={styles.btnTextStyles}
              onPress={() => setLoading(true)}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
