import React, {
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Linking,
  SafeAreaView,
  Platform,
} from 'react-native';
import {GlobalContext} from '../../context/GlobalState';
import toastService from '../services/toast-service';
import {useTranslation} from 'react-i18next';
import {baseURL} from '../config/config';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../shared/theme';
import ButtonComponent from '../components/buttonComp/ButtonComponent';
import axios from 'axios';
import LoaderModal from '../components/Modal/LoaderModal';
import ResponsiveHeader from '../components/Header/ResponsiveHeader';
import messaging from '@react-native-firebase/messaging';
import analytics from '@react-native-firebase/analytics';
import useRelocationFoucsHandler from '../hooks/useRelocationFoucsHandler';
import RelocationSurveyUpdatedModal from '../components/RelocationSurveyUpdatedModal/RelocationSurveyUpdatedModal';
import {AppImages} from '../constants/AppImages';
import {colorTheme} from '../constants/ColorConstants';
import NewHeader from '../components/Header/NewHeader';
import useDateTimeManager from '../hooks/useDateTimeManager';
import NegotiateAmountModal from '../components/NegotiateAmountModal/NegotiateAmountModal';
import CancelReasonModal from '../components/RelocationComponents/RelocationCancelReasonModal/CancelReasonModal';
import useCancelRelocation from '../hooks/useCancelRelocation';

export default SurveySubmitted = ({navigation, route}) => {
  const {
    auth,
    setSurveyId,
    bootMeUpData,
    setEnableSegmentTab,
    setDropoffPproTypeindex,
    setMarkers,
    getSurveyId,
    setRelocationRequest,
    setSelectedRelocationItems,
    setSelectedPropertyType,
    setPropertyType,
    setPickupPproTypeindex,
    surveyScheduleUpdated,
    setSurveyScheduleUpdated,
    relocationRequest,
  } = useContext(GlobalContext);
  const {convertToLocal} = useDateTimeManager();
  const subscriptionRef = useRef(null);
  const {t, i18n} = useTranslation();
  const styles = getStyles(i18n.language);
  const {routes, index} = navigation.getState();
  const {cancelRelocationRequest, loadingState} = useCancelRelocation();
  const [btnPress, setBtnPress] = useState(false);
  const [getLoader, setLoader] = useState(false);
  const {relocationData, setFcmData} = useRelocationFoucsHandler({navigation});
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);

  const surveyDate = route.params?.response?.survey_date ?? '';
  const surveyTime = route.params?.response?.survey_time ?? '';

  const dateToShow = convertToLocal(surveyDate + ' ' + surveyTime);
  useLayoutEffect(() => {
    if (relocationData?.survey_date) {
      setSurveyScheduleUpdated(relocationData);
      setFcmData(null);
    }
  }, [relocationData]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onGoBackCallback);
    navigation.addListener('gestureEnd', onGoBackCallback);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onGoBackCallback);
      navigation.removeListener('gestureEnd', onGoBackCallback);
    };
  }, [navigation]);

  const onGoBackCallback = () => {
    navigation.navigate('Home');
    return true;
  };

  const headerNavigationHandler = useCallback(key => {
    if (key == 'cancel') {
      setShowAlertModal(true);
      return;
    }
    navigation.navigate('Home');
  }, []);

  const onAlertClosePressHandler = () => {
    setShowAlertModal(false);
    setShowReasonModal(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {getLoader && <LoaderModal load={getLoader} />}

        <NewHeader
          customNavigator={headerNavigationHandler}
          title={t('surveyBooked')}
          navigation={navigation}
          cancelButton
        />
        {showReasonModal && (
          <CancelReasonModal
            visible={showReasonModal}
            loadingState={loadingState}
            onSubmitPress={reasonIndex =>
              cancelRelocationRequest(getSurveyId, index, reasonIndex)
            }
            onClose={() => setShowReasonModal(false)}
          />
        )}
        {showAlertModal && (
          <NegotiateAmountModal
            data={relocationRequest}
            onClosePress={onAlertClosePressHandler}
            visible={showAlertModal}
            onModalClose={() => setShowAlertModal(false)}
          />
        )}
        <View style={styles.mainView}>
          <ScrollView>
            <View style={styles.imageView}>
              <Image
                style={styles.bookedImage}
                resizeMode="contain"
                source={AppImages.booked}
              />
            </View>
            <View style={styles.descriptionView}>
              <Text style={styles.descriptionHeading}>{t('surveyBooked')}</Text>
              <Text style={styles.descriptionText}>
                {t('relocation_move_confirm_desc')}
              </Text>
            </View>
            {surveyDate && surveyTime && (
              <View style={styles.dateContainer}>
                <Text style={styles.date}>{dateToShow}</Text>
              </View>
            )}
          </ScrollView>
        </View>
        {surveyScheduleUpdated && (
          <RelocationSurveyUpdatedModal
            data={surveyScheduleUpdated}
            showButton={false}
            visible={surveyScheduleUpdated ? true : false}
            onClose={() => setSurveyScheduleUpdated(false)}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const {primaryText, defaultText, secondaryBackground, lightPurpleBackground} = colorTheme;
const {
  jameelNooriNastaleeq,
  latoRegular,
  latoMedium,
  latoSemiBold,
  latoBold,
  latoHeavy,
} = THEME.fonts;

const getStyles = language =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    mainView: {
      flex: 1,
    },
    bookedImage: {
      height: moderateScale(264),
      width: '100%',
    },
    imageView: {
      alignItems: 'center',
      marginTop: moderateVerticalScale(50),
      marginHorizontal: moderateScale(6),
    },
    descriptionView: {
      marginVertical: moderateVerticalScale(28),
    },
    descriptionHeading: {
      color: primaryText,
      fontSize: scale(24),
      fontFamily: latoHeavy,
      textAlign: 'center',
    },
    dateContainer: {
      backgroundColor: lightPurpleBackground,
      marginHorizontal: moderateScale(22),
      paddingVertical: moderateVerticalScale(11),
      borderRadius: moderateScale(8),
    },
    date: {
      fontSize: scale(20),
      color: primaryText,
      textAlign: 'center',
      fontFamily: latoBold,
    },
    descriptionText: {
      fontSize: scale(14),
      fontFamily: latoRegular,
      color: defaultText,
      textAlign: 'center',
      marginTop: moderateVerticalScale(18),
      letterSpacing: 0.5,
      marginHorizontal: moderateScale(38),
      // backgroundColor:"red"
    },
  });
