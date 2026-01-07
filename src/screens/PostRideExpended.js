import React, { useState, useContext, useEffect } from 'react';
import {  Text,  Image, TextInput, PermissionsAndroid, TouchableOpacity } from 'react-native';
import { Block } from 'galio-framework';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GlobalContext } from '../../context/GlobalState';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';


export default PostRideExpended = ({ navigation }) => {
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
            console.warn(err);
        }
    };
    const clearAuth = async () => {
       
        await AsyncStorage.removeItem('auth');
        setAuth('');
    }
    function rating_stars(a) {
        let stars = [];
        for (let i = 1; i < 6; i++) {
            if (i <= a) {
                stars.push(<TouchableOpacity onPress={() => { setRating(i) }}>
                    <Icon name="star" size={26} color="orange" style={{ marginRight: 2 }}></Icon>
                </TouchableOpacity>);
            }
            else {
                stars.push(<TouchableOpacity onPress={() => { setRating(i) }}>
                    <Icon name="star" size={26} color="#DFDFDF" style={{ marginRight: 2 }}></Icon>
                </TouchableOpacity>);
            }
        }
        return stars;
    }
    const [rating, setRating] = useState(0)
    const [x, setX] = useState(0);

    const smallTags = (title) => {
        return (
            <Text style={{ color: 'white', backgroundColor: 'purple', padding: 5, borderRadius: 7, margin: 3 }}>{title}</Text>
        )
    }
    return (
        <>
            <Block style={{ position: 'relative' }}>
                <MapView
                    style={{ height: '100%' }}
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
                >
                </MapView>









                <Block style={[{ position: 'absolute', bottom: 0, left: 0, width: '100%', }]} >
                    <Block style={[{ backgroundColor: 'white', paddingBottom: 30, paddingHorizontal: 30, borderTopRightRadius: 50, borderTopLeftRadius: 50, }]} >
                        <Block justifyContent={'center'} center>
                            <Block style={{ margin: 15, borderTopWidth: 3, borderTopColor: 'gray', width: 50, }} />
                        </Block>
                        <Block style={{ marginTop: 10 }} />
                        <Block center>
                            <Block style={{ borderColor: 'orange', borderWidth: 3, borderRadius: 50, padding: 5 }}>
                                <Image source={require('../../assets/img/dp.jpg')} style={{ height: 70, width: 70, borderRadius: 50, }} />
                            </Block>
                            <Text style={{ color: 'gray', fontSize: 16, fontWeight: 'bold', paddingTop: 10 }}>Monday, 10:38 AM</Text>
                            <Text style={{ color: '#4D226D', fontSize: 16, fontWeight: 'bold', paddingTop: 10 }}>How was your experience with</Text>
                            <Text style={{ color: '#4D226D', fontSize: 16, fontWeight: 'bold', }}>Janab Muhammad Zohaib?</Text>
                            <Block style={{ marginTop: 20 }} />
                            <Block flexDirection={'row'}>
                                {rating_stars(rating)}
                            </Block>
                            <Text style={{ color: '#4D226D', fontSize: 16, fontWeight: 'bold', paddingTop: 10 }}>Where can we improve?</Text>

                            <Block style={{ marginTop: 10 }} />
                            <Block flexDirection={'row'} flexWrap={'wrap'} justifyContent={'center'} >
                                {smallTags('To many calls')}
                                {smallTags('Slow App')}
                                {smallTags('Vehicle')}
                                {smallTags('Policy Issue')}
                                {smallTags('Incorrect Policy')}
                                {smallTags('Team Life')}
                                {smallTags('Customer Care')}
                            </Block>
                            <Block style={{ marginTop: 20 }} />

                            <Block flexDirection={'row'} >
                                <TextInput
                                    placeholder={'Any other sugguestions?'}
                                    style={{ textAlignVertical: 'top', height: 100, borderRadius: 5, borderWidth: 1, borderColor: 'gray', flex: 1 }}
          placeholderTextColor={'darkgray'}

                                />
                            </Block>
                            <Block style={{ marginTop: 20 }} />

                            <TouchableOpacity activeOpacity={0.8} >
                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={['#FFBE50', '#F18500',]}
                                    style={[{ borderRadius: 10, padding: 5, width: 100 }]}
                                >
                                    <Block style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', color: 'white' }}>Submit</Text>
                                    </Block>
                                </LinearGradient>
                            </TouchableOpacity>
                        </Block>
                        <Block style={{ marginTop: 10 }} />
                        <Block style={{ borderBottomWidth: 1, borderBottomColor: 'gray' }} />
                        <Block style={{ marginTop: 10 }} />
                        <Block flexDirection={'row'} space={'between'} flex={1}>
                            <Block>
                                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Total Fare</Text>
                            </Block>
                            <Block flexDirection={'row'} alignItems={'flex-end'}>
                                <Text style={{ color: 'gray', fontWeight: 'bold', paddingBottom: 2 }}>PKR </Text>
                                <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>500 </Text>
                            </Block>
                        </Block>
                    </Block>
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
