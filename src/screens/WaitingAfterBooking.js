import React, { useState, useContext, useEffect, useRef } from 'react';
import { Text, Image,  PermissionsAndroid, TouchableOpacity} from 'react-native';
import { Block } from 'galio-framework';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GlobalContext } from '../../context/GlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import toastService from '../services/toast-service';
import MapView, { Polygon, Polyline } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';


const origin = { latitude: 37.8025259, longitude: -122.4351431 };
const destination = { latitude: 37.7896386, longitude: -122.421646 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyCEdwZcHigbRFSXQWhyltHm8f672YGzsJQ';

export default WaitingAfterBooking = ({ navigation }) => {
    const { auth, setAuth } = useContext(GlobalContext);

    let [latitude, setLatitude] = useState(0);
    let [longitude, setLongitude] = useState(0);

    useEffect(() => {

        Geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            (error) => {
               
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );

    }, [])

    const getMyCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            (error) => {
               
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            } else {
            }
        } catch (err) {
        }
    };
    const clearAuth = async () => {
       
        await AsyncStorage.removeItem('auth');
        setAuth('');
    }

    const ref = useRef();

    useEffect(() => {
        ref.current?.setAddressText('');
    }, []);

    const mapRef = React.createRef();
    const changeRegion = () => {
        const latitude = 6.86;
        const longitude = 6.86;
        mapRef.current.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
        })
    }

    const [x, setX] = useState(0);
    const [marker, setMarker] = useState([]);
    let id = 0;

    let localMarkerCount = 0;
    let tempCount = 2;
    const onMapPress = (e) => {
        if (marker.length <= tempCount) {
            setMarker([...marker, { coordinate: e.nativeEvent.coordinate, key: id, }]);
            id = id + 1;
        }
    }
    const delteMarker = (i) => {
        let markerTemp = marker;
        markerTemp.splice(i, 1);
        setMarker(markerTemp);
    }



    const [markerFrom, setMarkerFrom] = useState();
    const [markerTo, setMarkerTo] = useState();
    const [currentState, setCurrentState] = useState();

   


    return (
        <>
            <Block style={{ position: 'relative' }}>
                <MapView
                    style={{ height: '100%', width: '100%' }}
                    initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.01
                    }}
                    region={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    onPress={e => addMarker(e)}
                >
                </MapView>

                <Block style={{ position: 'absolute', top: 20, left: 20 }}>
                    <TouchableOpacity
                        style={{
                            height: 50,
                            width: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 15,
                            backgroundColor: 'white',
                        }}
                        onPress={() => { clearAuth() }}
                    >
                        <Icon name='arrow-left' size={20} color={'#4F1D72'} ></Icon>
                        
                    </TouchableOpacity>
                </Block>

                <Block style={{ position: 'absolute', top: 20, right: 20 }}>
                    <TouchableOpacity
                        style={{
                            height: 50,
                            width: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50,
                            backgroundColor: 'white',
                        }}

                    >
                        <Image source={{ uri: auth && auth.basic_info.avatar }} style={{ height: 50, width: 50, borderRadius: 50, borderWidth: 3, borderColor: 'orange' }} />
                    </TouchableOpacity>
                </Block>

               





                <Block
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        position: 'absolute',
                       
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: 'white',
                        width: '100%' 

                    }}>
                    <Block><Text>OK</Text></Block>
                    <Block><Text>OK</Text></Block>
                    <Block><Text>OK</Text></Block>
                </Block>
            </Block>

        </>
    );
};

const styles = EStyleSheet.create({
    textStyle: {
        color: '#fff',
        fontSize: 20

    },
    whiteColor: {
        color: 'white'
    },
    textBoxes: {
        flex: 1,
        paddingRight: 50,
        backgroundColor: 'white',
        borderRadius: 25,
        paddingHorizontal: 20,
    }
});
