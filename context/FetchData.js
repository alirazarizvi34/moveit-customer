import React, {useState, memo, useEffect, useRef} from 'react';
import {baseURL} from '../src/config/config';
import {version} from './../package.json';
import {AppConstants} from '../src/constants/AppConstants';
import toastService from '../src/services/toast-service';

export const FetchData = () => {
  const mymapref = useRef();
  const [auth, setAuth] = useState('');
  const [activeRide, setActiveRide] = useState(false);
  const [myTrips, setMyTrips] = useState();
  const [readNotify, setReadNotify] = useState(false);
  const [notification, setNotification] = useState();
  const [corporate, setCorporate] = useState(null);
  const [myLanguage, setMyLanguage] = useState(null);
  const [homeServiceSelect, setHomeServiceSelect] = useState(null);
  const [getDriver_user_id, setDriver_user_id] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [noOfLabour, setNoOfLabour] = useState(0);
  const [receiver, setReceiver] = useState({
    name: '',
    contact: '',
  });
  const [sender, setSender] = useState({
    name: '',
    contact: '',
  });

  const [initialCoordinates, setInitialCoordinates] = useState(null);
  const [globalCoordinates, setGlobalCoordinates] = useState(null);
  const [Globalvehicle, setGlobalVehicle] = useState(null);
  const [globalLabours, setGlobalLabours] = useState(0);
  const [attachPicture, setAttachPicture] = useState([]);
  const [city, setCity] = useState(null);
  const [setMyCurrentRideStatus, myCurrentRideStatus] = useState(false);
  const [RideRequestId, setRideRequestId] = useState(null);
  const [getGlobalRideId, setGlobalRideId] = useState(null);
  const [getCities, setCities] = useState([]);
  const [getRideDetails, setRideDetails] = useState(null);
  const [getEstimatedKM, setEstimatedKM] = useState(0);
  const [getEstimatedTime, setEstimatedTime] = useState(0);
  const [locationState, setLocationState] = useState(null);
  const [isBidding, setIsBidding] = useState(0);
  const [biddingAmount, setBiddingAmount] = useState(null); //this state value have to remove after conat form submission or complete journey.
  const [customerThreshold, setCustomerThreshold] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [getRefCoordinates, setRefCoordinates] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  const [relocationSpaces, setRelocationSpaces] = useState(AppConstants?.relocationSpaces);
  const [getSurveyId, setSurveyId] = useState(null);
  const [getRelocationList, setRelocationList] = useState(null);
  const [getSupport, setSupport] = useState(null);
  const [estimatedFare, setEstimatedFare] = useState(null);
  const [reviseBidThreshold, setReviseBidThreshold] = useState(null);
  const [hasBid, setHasBid] = useState(0);
  const [driverBiddingList, setDriverBiddingList] = useState([]);
  const [rideRequestDuration, setRideRequestDuration] = useState(null);
  const [rideCreatedTime, setRideCreatedTime] = useState(null);
  const [appVersion, setAppVersion] = useState(false);
  const [bootMeUpData, setBootMeUpData] = useState(null);
  const [bootMeUpApiEndTime, setBootMeUpApiEndTime] = useState(null);
  const [fabPosition, setFabPosition] = useState({x: 0, y: 0});
  const [currentCoords, setCurrentCoords] = useState(null);
  const [additionalMessage, setAdditionalMessage] = useState('');
  const [loadingUnloading, setLoadingUnLoading] = useState(false);
  const [mediaKeys, setMediaKeys] = useState('');
  const [locationPermission, setLocationPermission] = useState(false);
  const [otpTimer, setOtpTimer] = useState(AppConstants.otpTimer);
  const [userNumber, setUserNumber] = useState('');
  const [fcmToken, setFcmToken] = useState(null);
  const [isFcmToken, setIsFcmToken] = useState(false);
  const [multiRides, setMultiRides] = useState(null);
  const [selectedRelocationItems, setSelectedRelocationItems] = useState([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState(null); //This state inside save both pick-up and drop-off property type
  const [propertyType, setPropertyType] = useState(null); //property-types api save data inside state
  const [selectedPickupPproTypeindex, setPickupPproTypeindex] = useState(null);
  const [selectedDropoffPproTypeindex, setDropoffPproTypeindex] =
    useState(null);
  const [isEnableSegmentTab, setEnableSegmentTab] = useState(false);
  const [relocationRequest, setRelocationRequest] = useState(null);
  const [deliveryRequest, setDeliveryRequest] = useState(null);
  const [surveyScheduleUpdated, setSurveyScheduleUpdated] = useState(false);
  const [shouldCallRelocationRequest, setShouldCallRelocationRequest] =
    useState(false);
  const [isCallApi,setCallApi] = useState(false);
  const [scheduledAt,setScheduledAt] = useState(null);
  const [isScheduled,setScheduled] = useState(false);
  const [verifiedEmailModal, setVerifiedEmailModal] = useState(false);
  const [emailVerificationModal, setEmailVerificationModal] = useState(false);
  const [isUpdateItemsApiCall, setUpdateItemsApiCall] = useState(false);
  const [toolTip, setTooltip] = useState({
    relocationPickUp : {
      pickUpInputToolTip : false,
      isTrue: false,
    },
    relocationDropOff: {
      dropOffInputToolTip : false,
      isTrue : false
    },
    relocationAddress: {
      addressesToolTip : false,
      isTrue : false
    },
    pickupPropertyDetails: {
      addressToolTip : false,
      propertyToolTip : false,
      stepCount: 1,
      isTrue : false
    },
    dropOffPropertyDetails: {
      addressToolTip : false,
      propertyToolTip : false,
      stepCount: 1,
      isTrue : false
    },
    relocationItemCategory: {
      categoryToolTip : false,
      isTrue : false
    },
    relocationAdditionalServices: {
      packingTypeToolTip : false,
      loadingUnloadingToolTip : false,
      acInstallationToolTip: false,
      additionalDetailsToolTip: false,
      stepCount: 1,
      isTrue : false
    },
    relocationEstimatedQuote: {
      quoteBreakDownToolTip : false,
      buttonToolTip : false,
      isTrue : false
    }
  });


  return {
    auth,
    setAuth,
    activeRide,
    setActiveRide,
    markers,
    setMarkers,
    noOfLabour,
    setNoOfLabour,
    receiver,
    setReceiver,
    sender,
    setSender,
    selectedPackage,
    setSelectedPackage,
    myTrips,
    setMyTrips,
    readNotify,
    setReadNotify,
    notification,
    setNotification,
    corporate,
    setCorporate,
    myLanguage,
    setMyLanguage,
    initialCoordinates,
    setInitialCoordinates,
    globalCoordinates,
    setGlobalCoordinates,
    Globalvehicle,
    setGlobalVehicle,
    globalLabours,
    setGlobalLabours,
    attachPicture,
    setAttachPicture,
    city,
    setCity,
    setMyCurrentRideStatus,
    myCurrentRideStatus,
    setReviseBidThreshold,
    reviseBidThreshold,
    RideRequestId,
    setRideRequestId,
    getGlobalRideId,
    setGlobalRideId,
    getCities,
    setCities,
    getDriver_user_id,
    setDriver_user_id,
    getRideDetails,
    setRideDetails,
    getRefCoordinates,
    setRefCoordinates,
    getEstimatedKM,
    setEstimatedKM,
    getEstimatedTime,
    setEstimatedTime,
    getSurveyId,
    setSurveyId,
    getRelocationList,
    setRelocationList,
    customerThreshold,
    setCustomerThreshold,
    locationState,
    setLocationState,
    isBidding,
    setIsBidding,
    estimatedFare,
    setEstimatedFare,
    biddingAmount,
    setBiddingAmount,
    driverBiddingList,
    setDriverBiddingList,
    rideRequestDuration,
    setRideRequestDuration,
    rideCreatedTime,
    setRideCreatedTime,
    getSupport,
    setSupport,
    hasBid,
    setHasBid,
    appVersion,
    setAppVersion,
    bootMeUpData,
    setBootMeUpData,
    bootMeUpApiEndTime,
    setBootMeUpApiEndTime,
    fabPosition,
    setFabPosition,
    currentCoords,
    setCurrentCoords,
    additionalMessage,
    setAdditionalMessage,
    loadingUnloading,
    setLoadingUnLoading,
    mediaKeys,
    setMediaKeys,
    locationPermission,
    setLocationPermission,
    otpTimer,
    setOtpTimer,
    userNumber,
    setUserNumber,
    fcmToken,
    setFcmToken,
    isFcmToken,
    setIsFcmToken,
    multiRides,
    setMultiRides,
    selectedRelocationItems,
    setSelectedRelocationItems,
    selectedPropertyType,
    setSelectedPropertyType,
    selectedPickupPproTypeindex,
    setPickupPproTypeindex,
    propertyType,
    setPropertyType,
    selectedDropoffPproTypeindex,
    setDropoffPproTypeindex,
    isEnableSegmentTab,
    setEnableSegmentTab,
    relocationRequest,
    setRelocationRequest,
    surveyScheduleUpdated,
    setSurveyScheduleUpdated,
    shouldCallRelocationRequest,
    setShouldCallRelocationRequest,
    isCallApi,
    setCallApi,
    scheduledAt,
    setScheduledAt,
    isScheduled,
    setScheduled,
    toolTip,
    setTooltip,
    verifiedEmailModal,
    setVerifiedEmailModal,
    emailVerificationModal,
    setEmailVerificationModal,
    relocationSpaces,
    setRelocationSpaces,
    isUpdateItemsApiCall,
    setUpdateItemsApiCall,
    homeServiceSelect,
    setHomeServiceSelect,
    deliveryRequest,
    setDeliveryRequest
  };
};
