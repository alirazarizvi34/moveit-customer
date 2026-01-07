import { Dimensions, Platform } from 'react-native';
import Geocoder from 'react-native-geocoding';
import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  ScrollView,
  View,
  Text,
  Keyboard,
  Image,
  TextInput,
  PermissionsAndroid,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import { GlobalContext } from '../../context/GlobalState';
import toastService from '../services/toast-service';
import MapView, { PROVIDER_GOOGLE, Polygon, Polyline } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useTranslation } from 'react-i18next';
import { baseURL, geoBaseURL } from '../config/config';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import { THEME } from '../shared/theme';
import ButtonComponent from '../components/buttonComp/ButtonComponent';
import { useDebounce } from '../hooks/useDebounce';
import axios from 'axios';
import LoaderModal from '../components/Modal/LoaderModal';
import { reverseGeocode } from '../helperFunction/helperfunction';


const GOOGLE_MAPS_APIKEY = 'AIzaSyCEdwZcHigbRFSXQWhyltHm8f672YGzsJQ';
Geocoder.init(GOOGLE_MAPS_APIKEY);

const { colorFFBE50, colorWhite, color4E008A, colorBlack, colorF6F6F6, validateColor, colorF0F0F0, color0F0F0F, colorB0B0C3, colorRed } = THEME.colors;
const { latoBlack, jameelNooriNastaleeq, latoRegular } = THEME.fonts;


export default SearchLocation = ({
  navigation,
  onPress = () => { },
  onSelect,
  getSearchType,
  setCoordinate,

}) => {

  const { auth, getCities, myLanguage } = useContext(GlobalContext);
  let [searchFocus, setSearchFocus] = useState(false);
  // let [getlatitude, setLatitude] = useState(33.66179273060629);
  // let [getlongitude, setLongitude] = useState(73.04619876988451);
  let [getlatitude, setLatitude] = useState(null);
  let [getlongitude, setLongitude] = useState(null);
  let [latDelta, setLatDelta] = useState(0.0020);
  let [lngDelta, setLngDelta] = useState(0.0020);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [openKeyBoard, setOpenKeyboard] = useState(false);
  const [cityName, setCityName] = useState('');
  const [search, setSearch] = useState({ term: '', fetchPredictions: false });
  const [showPredictions, setShowPredictions] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [goToDropOffLocation, setGoToDropOffLocation] = useState(false);
  const [inputDisable, setInputDisable] = useState(false);
  const [getLoader, setLoader] = useState(true);
  const [getmarkersValue, setmarkersValue] = useState([
    { lat: 0, lon: 0, type: 'p', title: '', state: '' },
  ]);
  const [selection, setSelection] = useState({ start: 0, end: 0 }); // This hooks only use for text selection

  const mymapref = useRef();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    permissionAndgetMyCurrentLocation();
  }, []);

  const getMyAddressName = (index = selectedMarkerIndex) => {
    const config = {
      headers: { Authorization: `Bearer ${auth?.accessToken}` }
    };
    Geolocation.getCurrentPosition(
      position => {
        let lat = position?.coords?.latitude;
        let lon = position?.coords?.longitude;
        if (lat && lon) {
          let array = getmarkersValue;

          let setData = {
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
            language: myLanguage,
            serviceType: 'relocation'
          }

          if((lat < 0 && lat > -1) || (lon < 0 && lon > -1)){
            setLoader(false);
            toastService.shortToast('Your location coordinates are faulty');
            return ;
          }

            reverseGeocode(config, setData).then((response) => {

              if (mymapref && mymapref.current) {
                mymapref.current.animateToRegion({
                  latitude: lat,
                  longitude: lon,
                  latitudeDelta: 0.0020,
                  longitudeDelta: 0.0020,
                });
              }

              if (response?.error !== null) {
                setSearchFocus(true);
                array[index].title = '';
                setSearch({ term: '', fetchPredictions: false });
                setmarkersValue(array);
                toastService.shortToast(response?.error?.response?.data);
              }

              if (response?.data) {
                setShowPredictions(false);
                setSearchFocus(false);
                array[index].title = response?.data?.title;
                array[index].lat = lat;
                array[index].lon = lon;
                array[index].state = response?.data?.state;
                setmarkersValue(array);
              }
            });
        }
      },
      error => { },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };
  const getMyCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        let lat = position?.coords?.latitude;
        let lon = position?.coords?.longitude;
        if (lat && lon) {
          setLatitude(lat);
          setLongitude(lon);
          if (mymapref && mymapref.current) {
              mymapref.current.animateToRegion({
                latitude: setCoordinate ? setCoordinate?.latitude : lat,
                longitude: setCoordinate ? setCoordinate?.longitude : lon,
                latitudeDelta: latDelta,
                longitudeDelta: lngDelta,
              });
          }
        }
      },
      error => { },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };
  const permissionAndgetMyCurrentLocation = async () => {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      if (auth === 'granted') {
        getMyCurrentLocation();
      }
      return;
    }
    let granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted) {
      getMyCurrentLocation();
    } else {
      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Accessing Permission',
          message: 'App needs access to your location',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setInputDisable(true);
        getMyCurrentLocation();
      } else {
        setInputDisable(true);
        toastService.shortToast('Geolocation permission is denied');
      }
    }
  };

  useEffect(() => {

    const keyboardDidShowlistner = Keyboard.addListener('keyboardDidShow', (event) => {
      setOpenKeyboard(true);
    })

    const keyboardDidHidelistner = Keyboard.addListener('keyboardDidHide', (event) => {
      setSelection({ start: 0, end: 0 });
      setOpenKeyboard(false);
    })
    return () => {
      keyboardDidShowlistner.remove();
      keyboardDidHidelistner.remove();
    }
  }, [openKeyBoard]);

  

  const fetchAddressName = index => {

    let array = getmarkersValue;
    let latitude = array[index].lat;
    let longitude = array[index].lon;

    const config = {
      headers: { Authorization: `Bearer ${auth?.accessToken}` }
    };

    let setData = {
      latitude: array[index].lat,
      longitude: array[index].lon,
      language: myLanguage,
      serviceType: 'relocation'
    }

    if((latitude < 0 && latitude > -1) || (longitude < 0 && longitude > -1)){
      setLoader(false);
      toastService.shortToast('Your location coordinates are faulty');
      return ;
    }
      reverseGeocode(config, setData).then((response) => {
        if (response?.error !== null) {
          setSearchFocus(true);
          array[index].title = '';
          setSearch({ term: '', fetchPredictions: false });
          setmarkersValue(array);
          toastService.shortToast(response?.error?.response?.data);
        }
        if (response?.data) {
          setLoader(false);
          setSearchFocus(false);
          array[index].title = response?.data?.title;
          array[index].state = response?.data?.state;
          setSearch({ term: '', fetchPredictions: false });
          setmarkersValue(array);
          setShowPredictions(false);
          setInputDisable(true);
        }

      });
  };

  const MoveMaker = async (e) => {
    let lat;
    let lon;
    if (selectedMarkerIndex >= 0) {
      if (e.latitude == 0 || e.longitude == 0) {
        lat = getlatitude && getlatitude;
        lon = getlongitude && getlongitude
      } else {
        lat = e.latitude;
        lon = e.longitude;
      }
      if(getlatitude && getlongitude){
      // setLatitude(lat);
      // setLongitude(lon);
      let array = getmarkersValue;
      let address = '';
      array[selectedMarkerIndex].title = address;
      array[selectedMarkerIndex].lat = lat;
      array[selectedMarkerIndex].lon = lon;
      setmarkersValue([...array]);
      if(array[selectedMarkerIndex].lat && array[selectedMarkerIndex].lon){
      fetchAddressName(selectedMarkerIndex);
      }
    }
    }
  };

  const onChangeText = async () => {
    if (search.term.trim() === '') return
    if (!search.fetchPredictions) return
    const config = {
      headers: { Authorization: `Bearer ${auth?.accessToken}` }
    };

    const resp = await axios.get(geoBaseURL + `/map/autocomplete?place_name=${search.term}`, config)
      .then(function (result) {
        const { data: { predictions } } = result;
        setPredictions(predictions);
        setShowPredictions(true);
      })
      .catch(function (error) {
        toastService.shortToast('length must be at least 2 characters long');
      });
  }
  useDebounce(onChangeText, 1500, [search.term])

  const onPredictionTapped = async (placeId, description) => {
    setSearchFocus(true);
    const config = {
      headers: { Authorization: `Bearer ${auth?.accessToken}` }
    };

    const resp = await axios.get(geoBaseURL + `/map/place/${placeId}`, config)
      .then(function (result) {
        if (result) {
          const { data: { result: { geometry: { location } } } } = result
          const { lat, lng } = location
          if (lat && lng) {
            setLatitude(lat);
            setLongitude(lng);
            setTimeout(() => {
              if (mymapref && mymapref.current) {
                mymapref.current.animateToRegion({
                  latitude: lat,
                  longitude: lng,
                  latitudeDelta: latDelta,
                  longitudeDelta: lngDelta,
                });
                setSearch({ term: description, fetchPredictions: false });
              }
            }, 10);

          }
          setShowPredictions(false);

          array[selectedMarkerIndex].title = description;
          array[selectedMarkerIndex].lat = lat;
          array[selectedMarkerIndex].lon = lng;
          setmarkersValue([...array]);
        }
      })
      .catch(function (error) {
        // console.log(error)
      });
  }

  const _renderPredictions = (predictions) => {
    return (
      <>
        {predictions?.length < 1 ? null :

          <FlatList
            nestedScrollEnabled
            onScrollBeginDrag={() => Keyboard.dismiss()}
            data={predictions}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={{
                    paddingBottom: moderateScale(15),
                    marginBottom: moderateScale(15),
                    borderBottomColor: colorF0F0F0,
                    borderBottomWidth: moderateScale(1), flexDirection: "row",
                    alignItems: "center"
                  }}
                  onPress={() => { onPredictionTapped(item.place_id, item.description) }}
                >
                  <View style={{ marginHorizontal: moderateScale(7) }}>
                    {getSearchType == 'pickup' ? (

                      <Icon name="map-marker" color={colorFFBE50} size={24} />

                    ) : (
                      <Icon name="map-marker" color={colorRed} size={24} />

                    )}
                  </View>

                  <Text style={{
                    fontFamily: latoRegular,
                    fontSize: scale(16),
                    color: colorBlack,
                  }}
                    numberOfLines={1}
                  >
                    {item.description}
                  </Text>
                </TouchableOpacity>
              )
            }}
            keyExtractor={(item) => item?.place_id}
            style={{
              height: moderateScale(140),
              backgroundColor: colorWhite,
              padding: moderateScale(10),
              paddingHorizontal: moderateScale(5),
              borderRadius: moderateScale(10),
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOpacity: 1,
              shadowRadius: 1.84,
              elevation: 5,

            }}
          />
        }
      </>
    )
  }

  const searchInput = useRef();


  const goBack = () => {
    onSelect(getmarkersValue);
    onPress();
  }

   //This function use for text selection, because Inputtext long string does not start from begning on android
   const onSelectionChange = ({ nativeEvent: { selection, text } }) => {
    setSelection(selection);
  };

  return (
    <>
      <SafeAreaView style={{
        flex: 1,
      }}>
        <View style={{
          flex: 1,
          flexDirection: "column"
        }}>
          <View style={{ flex: 4 }} >
            <MapView
              style={{ flex: 1 }}
              ref={mymapref}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: getlatitude ? getlatitude : 0,
                longitude: getlongitude ? getlongitude : 0,
                latitudeDelta: latDelta,
                longitudeDelta: lngDelta,
              }}
              scrollDuringRotateOrZoomEnabled={false}
              pitchEnabled={false}
              showsCompass={false}
              rotateEnabled={false}
              zoomControlEnabled={false}
              scrollEnabled={scrollEnabled}
              zoomEnabled={true}
              // onRegionChangeComplete={(e) => { !goToDropOffLocation && MoveMaker(e) }}
              onRegionChangeComplete={(e) => { MoveMaker(e) }}
            >
            </MapView>



            {getSearchType
              && (
                <View style={{
                  left: '50%',
                  marginLeft: -24,
                  marginTop: -48,
                  position: 'absolute',
                  top: '50%'
                }}>
                  <Image
                    source={
                      getSearchType == 'dropoff'
                        ? require('../../assets/icons/dropoffPointer.png')
                        : require('../../assets/icons/pickuppin.png')
                    }
                  />
                </View>
              )

            }



            {openKeyBoard ? (null) : (

              <>
                <View style={{ width: "100%", position: 'absolute', flexDirection: "row", zIndex: 999999 }}>

                  <View style={{ marginLeft: moderateScale(10), marginTop: moderateScale(14) }}>
                    <TouchableOpacity onPress={onPress}>

                      <View style={{
                        backgroundColor: colorFFBE50,
                        width: moderateScale(54),
                        height: moderateScale(50),
                        borderRadius: moderateScale(10),
                        shadowColor: "rgba(0, 0, 0, 0.1)",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 1.25,
                        shadowRadius: 3.84,

                        elevation: 5,

                      }}
                        justifyContent={'center'}
                        alignItems={'center'}>
                        <Icon name="angle-left" size={40} color={color4E008A} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </>

            )}


            <View style={{ display: "flex", width: moderateScale(54), height: moderateScale(54), position: 'absolute', backgroundColor: colorWhite, borderRadius: moderateScale(10), bottom: moderateScale(22), justifyContent: "center", right: moderateScale(10) }}>
              <TouchableOpacity
                onPress={() => getMyAddressName()} >
                <IconMaterial style={{ alignSelf: "center" }} name={'gps-fixed'} size={scale(35)} color={color4E008A} />
              </TouchableOpacity>
            </View>

          </View>



          {/* start Bottom modal */}
          <View style={{ flex: openKeyBoard ? 5 : getmarkersValue?.length > 2 ? 4 : 3, paddingTop: moderateScale(10), backgroundColor: color4E008A, borderRadius: moderateScale(10) }} >
            <View style={{ flex: openKeyBoard ? 5 : getmarkersValue?.length > 2 ? 4 : 3, borderTopLeftRadius: moderateScale(11), borderTopRightRadius: moderateScale(11), backgroundColor: colorWhite }} >
              <ScrollView showsVerticalScrollIndicator={true} >
                <View style={{ flex: 1, marginHorizontal: moderateScale(30) }} >

                  <View style={{ marginVertical: openKeyBoard ? (moderateVerticalScale(22)) : (moderateVerticalScale(38)), alignItems: i18n.language === 'urdu' ? "flex-end" : "flex-start" }}>
                    <Text style={[styles.Searchtitle]}>
                      {t('search_location')}
                    </Text>
                  </View>

                  <View style={{
                    borderRadius: moderateScale(10),
                    borderColor: colorF0F0F0,
                    borderWidth: 1, backgroundColor: '#F7F7F7'
                  }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: moderateScale(10) }}>
                      <Icon name="search" color={getSearchType == 'dropoff' ? colorRed : colorFFBE50} size={scale(20)} />

                      <TextInput
                        editable={inputDisable && true}
                        selectTextOnFocus={true}
                        onSelectionChange={(event)=>  onSelectionChange(event) }
                        selection={Platform.OS === 'android' ? selection : null}
                        placeholder={'Search'}
                        ref={searchInput}
                        style={{
                          flex: 1,
                          borderWidth: 0,
                          marginHorizontal: moderateScale(5),
                          paddingVertical: moderateVerticalScale(10),
                          fontFamily: latoRegular,
                          fontSize: scale(16),
                          color: colorBlack,
                        }}

                        value={search?.term ? search?.term : (getmarkersValue &&
                          getmarkersValue?.length ?
                          getmarkersValue?.map((el, i) => { search.term = el?.title }).toString() : ('raheel'))}

                        onChangeText={(text) => {
                          setSearchFocus(true);
                          setmarkersValue([{ lat: 0, lon: 0, type: 'p', title: '', state: '' }]);
                          setSearch({ term: text, fetchPredictions: true });
                        }}
                        showPredictions={showPredictions}
                        predictions={predictions}
                        onPredictionTapped={onPredictionTapped}
                        placeholderTextColor={colorB0B0C3}
                      />
                      {!openKeyBoard &&
                        <TouchableOpacity onPress={() => { searchInput.current.focus() }} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                          <Icon name="pencil" color={color4E008A} size={scale(18)} />
                        </TouchableOpacity>
                      }


                    </View>
                    {showPredictions && search.term != '' && _renderPredictions(predictions)}

                  </View>


                  <View style={styles.buttonContainer}>
                    <ButtonComponent
                      disabled={getmarkersValue[selectedMarkerIndex]?.title == '' || searchFocus ? (true) : (false)}

                      icon={{
                        name: 'arrow-right',
                        color: colorWhite,
                        size: scale(30)
                      }}
                      btnStyle={{
                        backgroundColor: color4E008A
                      }}
                      textStyle={{ fontSize: scale(19) }}
                      onPress={() => { goBack() }}
                    />

                  </View>

                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: '#fff',
    fontSize: 20,
  },
  whiteColor: {
    color: color0F0F0F,
    fontFamily: latoRegular,
    fontSize: scale(30),
    textAlign: "center",
  },
  multiDropOff: {
    color: color4E008A,
    fontFamily: latoRegular,
    fontSize: scale(16),
    paddingHorizontal: moderateScale(6),
    paddingBottom: moderateScale(0)
  },
  Searchtitle: {
    color: color0F0F0F,
    fontFamily: latoRegular,
    fontSize: scale(22),
  },
  textBoxes: {
    flex: 1,
    paddingRight: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: moderateVerticalScale(34)
  },
});
