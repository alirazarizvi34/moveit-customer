import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import moment from 'moment';
import React, {useContext, useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, PermissionsAndroid} from 'react-native';
import {EventRegister} from 'react-native-event-listeners';
import {GlobalContext} from '../context/GlobalState';
import UseBootMeUp from '../src/hooks/UseBootMeUp';
import useClearAuth from '../src/hooks/useClearAuth';
import AddCreditScreen from '../src/screens/AddCreditScreen';
import AppIntro from '../src/screens/AppIntro';
import ContactDetails from '../src/screens/ContactDetails';
import DropOff from '../src/screens/DropOff';
import DropOffAddresses from '../src/screens/DropOffAddresses';
import Home from '../src/screens/Home';
import MoveDetails from '../src/screens/MoveDetails';
import MyTripsScreen from '../src/screens/MyTripsScreen';
import PackageSelection from '../src/screens/PackageSelection';
import PayFromCard from '../src/screens/PayFromCard';
import PenaltyCharges from '../src/screens/PenaltyCharges';
import {PersonalInformation} from '../src/screens/PersonalInformation';
import PickUp from '../src/screens/PickUp';
import RelocationMovingConfirmed from '../src/screens/RelocationFeature/RelocationMovingConfirmed';
import RelocationProgress from '../src/screens/RelocationProgress';
import RelocationSurveyForm from '../src/screens/RelocationSurveyForm';
import SearchAddress from '../src/screens/SearchAddress';
import SearchVehicle from '../src/screens/SearchVehicle';
import SelectLanguage from '../src/screens/SelectLanguage';
import SignIn from '../src/screens/SignIn';
import Splash from '../src/screens/Splash';
import SurveySubmitted from '../src/screens/SurveySubmitted';
import UpdateProfile from '../src/screens/UpdateProfile';
import VehicleSelection from '../src/screens/VehicleSelection';
import Verification from '../src/screens/Verification';
import WebViewScreen from '../src/screens/WebViewScreen';
import RelocationDropOff from '../src/screens/RelocationFlow/RelocationDropOff';
import RelocationAdditionalServices from '../src/screens/RelocationAdditionalServices/RelocationAdditionalServices';
import RelocationEstimatedQuote from '../src/screens/RelocationEstimatedQuote/RelocationEstimatedQuote';
import RelocationNonPremiumEstimatedQuote from '../src/screens/RelocationEstimatedQuote/RelocationNonPremiumEstimatedQuote';
import RelocationBookingConfirmation from '../src/screens/RelocationEstimatedQuote/RelocationBookingConfirmation';
import RelocationSurveyQuote from '../src/screens/RelocationEstimatedQuote/RelocationSurveyQuote';
import DeliveryItemCategories from '../src/screens/DeliveriesFlow/DeliveryItemCategories/DeliveryItemCategories';
import DeliveryItemDetails from '../src/screens/DeliveriesFlow/DeliveryItemDetails/DeliveryItemDetails';
import DeliveryBookingSummary from '../src/screens/DeliveriesFlow/DeliveryBookingSummary/DeliveryBookingSummary';
import DeliveryBookingConfirmation from '../src/screens/DeliveriesFlow/DeliveryBookingConfirmation/DeliveryBookingConfirmation';
import DeliveryMovingConfirmed from '../src/screens/DeliveriesFlow/DeliveryMovingConfirmed/DeliveryMovingConfirmed';
import DeliveryProgress from '../src/screens/DeliveriesFlow/DeliveryProgress/DeliveryProgress';
import MergnModule from '../MergnModule';

const Stack = createStackNavigator();

export default function AppNavigation() {
  const {clearAuthData} = useClearAuth();
  const {
    auth,
    myLanguage,
  } = useContext(GlobalContext);

  const currentTime = moment();
  const [isLoading, setIsLoading] = useState(true);
  const {apiSuccess, splashScreenShow} = UseBootMeUp();
  const [tutorial, setTutorial] = useState('1');

  useEffect(() => {
    const authClearEvent = EventRegister.addEventListener('clearAuth', () => {
      clearAuthData();
    });
    return () => {
      EventRegister.removeEventListener(authClearEvent);
    };
  }, []);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
    },
  };

  const linking = {
    prefixes: ['techmoveit://', 'https://techmoveit.com'], // Replace with your own deep link prefixes
    // prefixes: ['https://moveittech.com/app'],
    config: {
      screens: {
        SignIn: 'SignIn',
      },
    },
  };

  return (
    <NavigationContainer theme={MyTheme} linking={linking}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={[{flex: 1}]}>
        <Stack.Navigator>
          {isLoading ? (
            <>
              <Stack.Screen
                name="Splash"
                component={Splash}
                options={{headerShown: false}}
              />
            </>
          ) : !splashScreenShow && myLanguage == null ? (
            <Stack.Screen
              name="SelectLanguage"
              component={SelectLanguage}
              options={{headerShown: false}}
            />
          ) : myLanguage && auth == '' ? (
            <>
              {tutorial === '1' && (
                <Stack.Screen
                  name="AppIntro"
                  component={AppIntro}
                  options={{headerShown: false}}
                />
              )}
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Verification"
                component={Verification}
                options={{headerShown: false}}
              />
            </>
          ) : auth?.is_profile_completed == 0 ? (
            <>
              <Stack.Screen
                name="PersonalInformation"
                component={PersonalInformation}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{headerShown: false}}
              />
            </>
          ) : (
            <>
              {/* <Stack.Screen
                name="RelocationItemCategories"
                component={RelocationItemCategories}
                options={{headerShown: false}}
           
             /> */}
              {/* <Stack.Screen
                name="RelocationEstimatedQuote"
                component={RelocationEstimatedQuote}
                options={{headerShown: false}}
              /> */}
              {/* <Stack.Screen
                name="RelocationPropertyDetails"
                component={RelocationPropertyDetails}
                options={{headerShown: false}}
              /> */}
              <Stack.Screen
                name="Home"
                component={Home}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PickUp"
                component={PickUp}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="DropOff"
                component={DropOff}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SearchAddress"
                component={SearchAddress}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="DropOffAddresses"
                component={DropOffAddresses}
                options={{headerShown: false, gestureEnabled: false}}
              />
              <Stack.Screen
                name="RelocationSurveyForm"
                component={RelocationSurveyForm}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="RelocationMovingConfirmed"
                component={RelocationMovingConfirmed}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="DeliveryMovingConfirmed"
                component={DeliveryMovingConfirmed}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="SurveySubmitted"
                component={SurveySubmitted}
                options={{
                  headerShown: false,
                  // for ios
                  // gestureEnabled: false,
                }}
              />

              <Stack.Screen
                name="RelocationProgress"
                component={RelocationProgress}
                options={{
                  headerShown: false,
                  // for ios
                  // gestureEnabled: false,
                }}
              />
                 <Stack.Screen
                name="DeliveryProgress"
                component={DeliveryProgress}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="MoveDetails"
                component={MoveDetails}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="VehicleSelection"
                component={VehicleSelection}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PackageSelection"
                component={PackageSelection}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ContactDetails"
                component={ContactDetails}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="UpdateProfile"
                component={UpdateProfile}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="MyTrips"
                component={MyTripsScreen}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="AddCredits"
                component={AddCreditScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="WebView"
                component={WebViewScreen}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="PayFromCard"
                component={PayFromCard}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PenaltyCharges"
                component={PenaltyCharges}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SearchVehicle"
                component={SearchVehicle}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="DeliveryItemCategories"
                component={DeliveryItemCategories}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="DeliveryItemDetails"
                component={DeliveryItemDetails}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="DeliveryBookingSummary"
                component={DeliveryBookingSummary}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="DeliveryBookingConfirmation"
                component={DeliveryBookingConfirmation}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="RelocationDropOff"
                component={RelocationDropOff}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="RelocationAdditionalServices"
                component={RelocationAdditionalServices}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="RelocationEstimatedQuote"
                component={RelocationEstimatedQuote}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="RelocationSurveyQuote"
                component={RelocationSurveyQuote}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="RelocationBookingConfirmation"
                component={RelocationBookingConfirmation}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="RelocationNonPremiumEstimatedQuote"
                component={RelocationNonPremiumEstimatedQuote}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
}
