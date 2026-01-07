import React, {useState, useContext, useRef} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {GlobalContext} from '../../context/GlobalState';
import toastService from '../services/toast-service';
import {useTranslation} from 'react-i18next';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../shared/theme';
import ButtonComponent from '../components/buttonComp/ButtonComponent';
import LoaderModal from '../components/Modal/LoaderModal';
import NewHeader from '../components/Header/NewHeader';
import {RatingStars} from '../helperFunction/ratingStar';
import InVoiceService from '../services/InVoiceService';
import analytics from '@react-native-firebase/analytics';

const {
  BorderColor,
  colorWhite,
  color4E008A,
  colorBlack,
  color0F0F0F,
  colorF8F8F8,
  colorE5E5E5,
  colorBorder,
  grayTxtColor,
} = THEME.colors;
const {jameelNooriNastaleeq, latoRegular, latoMedium, latoSemiBold} =
  THEME.fonts;

export default RatingReview = ({navigation,route}) => {
  const {
    setMarkers,
    activeRide,
    getGlobalRideId,
    setInitialCoordinates,
    setGlobalCoordinates,
    setGlobalVehicle,
    setGlobalLabours,
    setAttachPicture,
    myCurrentRideStatus,
    setRideRequestId,
    setGlobalRideId,
    getRideDetails,
    setDriverBiddingList,
    setBiddingAmount,
    setHasBid,
    setIsBidding,
  } = useContext(GlobalContext);

  const {t, i18n} = useTranslation();
  const feedback = useRef(null);
  const rideCount = route?.params?.rideCount;
  const [getProfileRating, setProfileRating] = useState(0);
  const [getBehaviorRating, setBehaviorRating] = useState(0);
  const [getLaborRating, setLaborRating] = useState(0);
  const [disInfoDropDown, setdisInfoDropDown] = useState(true);
  const [getLoader, setLoader] = useState(false);
  const [driverInfo, setDriverInfo] = useState(route?.params?.driverInfo);
  
  const reviewSubmit = () => {
    if(getProfileRating < 1){
      toastService.shortToast('Please rate your mover');
      return;
    }
    const getFeedBack = feedback?.current?.value;
    setLoader(true);
    let data = {
      rating: getProfileRating,
      ride_id: getGlobalRideId,
      driver_rating: getBehaviorRating,
      labour_rating: getLaborRating,
      feedback: getFeedBack,
    };

    InVoiceService.reviewSubmit(data)
      .then(async ({data}) => {
        if(rideCount > 1){
          await analytics().logEvent('secondrideBooked');
        }
        await analytics().logEvent('rideReview', {
          additional_comments: getFeedBack,
          drivers_rating: getBehaviorRating,
          labours_rating : getLaborRating,
        });
        toastService.shortToast(data?.message);
        setInitialCoordinates(null);
        setGlobalCoordinates(null);
        setGlobalVehicle(null);
        setGlobalLabours(0);
        setAttachPicture([]);
        myCurrentRideStatus(false);
        setRideRequestId(null);
        setGlobalRideId(null);
        setIsBidding(0);
        setHasBid(0);
        setBiddingAmount(null);
        setDriverBiddingList([]);
        setMarkers([]);
        navigation.navigate('Home');
        setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        toastService.shortToast(error?.response?.data?.message);
      });
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
     
        <View style={styles.mainContainer}>
          {getLoader && <LoaderModal load={getLoader} />}
          <NewHeader
            title={t('feedback')}
            titleStyle={{
              fontSize: i18n.language === 'urdu' ? scale(32) : scale(20),
              fontFamily:
                i18n.language === 'urdu' ? jameelNooriNastaleeq : latoSemiBold,
              paddingTop:
                Platform.OS === 'ios'
                  ? moderateVerticalScale(5)
                  : moderateVerticalScale(0),
              lineHeight:
                i18n.language === 'urdu'
                  ? moderateVerticalScale(45)
                  : moderateVerticalScale(25),
            }}
          />
     
     <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'android' ? undefined : 'height'} enabled>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.mainView}>
     
            <View style={styles.feedbackTitleView}>
              <Text
                style={{
                  color: color0F0F0F,
                  fontFamily:
                    i18n?.language === 'urdu'
                      ? jameelNooriNastaleeq
                      : latoMedium,
                  fontSize: i18n?.language === 'urdu' ? scale(26) : scale(16),
                  textAlign: 'center',
                  lineHeight:
                    i18n.language === 'urdu'
                      ? moderateVerticalScale(37)
                      : moderateVerticalScale(20),
                  paddingTop:
                    i18n?.language === 'urdu'
                      ? moderateScale(4)
                      : moderateScale(0),
                }}>
                {t('feedback_body_title')}
              </Text>
            </View>

            <View style={styles.profileContainer}>
              <View style={styles.profileImageView}>
                <Image
                  source={
                    driverInfo && driverInfo?.avatar != null
                      ? {uri: driverInfo?.avatar}
                      : require('../../assets/icons/men1.png')
                  }
                  style={styles.profileImage}
                />
              </View>

              <Text style={styles.profileName}>{driverInfo?.name}</Text>

              <View style={styles.profileRatingView}>
                <RatingStars
                  size={34}
                  initRating={getProfileRating}
                  onRatingChanged={newRating => {
                    setProfileRating(newRating);
                  }}
                />
              </View>
            </View>

            <View style={styles.dropDownContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setdisInfoDropDown(!disInfoDropDown)}>
                <View style={styles.dropDownHeader}>
                  <View
                    style={{
                      flexDirection:
                        i18n.language === 'urdu' ? 'row-reverse' : 'row',
                      marginHorizontal: moderateScale(12),
                      padding:
                        i18n.language === 'urdu'
                          ? moderateScale(7)
                          : moderateScale(13),
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        alignSelf: 'stretch',
                        //fontsize - (fontsize * 0.75) for use only urdu font
                        paddingTop:
                          i18n.language === 'urdu' ? 22 - 22 * 0.75 : 0,
                        lineHeight:
                          i18n.language === 'urdu'
                            ? moderateVerticalScale(34)
                            : moderateVerticalScale(20),
                        fontSize:
                          i18n.language === 'urdu' ? scale(22) : scale(16),
                        fontFamily:
                          i18n.language === 'urdu'
                            ? jameelNooriNastaleeq
                            : latoSemiBold,
                        color: color0F0F0F,
                      }}>
                      {t('more_details')}
                    </Text>
                    <AntIcon
                      name={disInfoDropDown ? 'up' : 'down'}
                      size={18}
                      color={colorBlack}
                      style={{alignSelf: 'center'}}
                    />
                  </View>
                </View>
              </TouchableOpacity>
                <View style={styles.dropDownInfoContainer}>
                  {disInfoDropDown && (
                    <>
                      <Text
                        style={{
                          textAlign:
                            i18n.language === 'urdu' ? 'right' : 'left',
                          fontSize:
                            i18n.language === 'urdu' ? scale(24) : scale(14),
                          fontFamily:
                            i18n.language === 'urdu'
                              ? jameelNooriNastaleeq
                              : latoRegular,
                          color: colorBlack,
                          lineHeight:
                            i18n.language === 'urdu'
                              ? moderateVerticalScale(34)
                              : moderateVerticalScale(18),
                        }}>
                        {t('additional_comments')}
                      </Text>

                      <TextInput
                        ref={feedback}
                        placeholder={'We’d love to hear your experience....'}
                        returnKeyType='done'
                        maxLength={500}
                        multiline={true}
                        numberOfLines={10}
                        onChangeText={text => (feedback.current.value = text)}
                        style={styles.feedback}
                      />

                      <View
                        style={{
                          flexDirection:
                            i18n.language === 'urdu' ? 'row-reverse' : 'row',
                          marginVertical: moderateVerticalScale(20),
                        }}>
                        <View style={styles.behaviorTextView}>
                          <Text
                            style={{
                              textAlign:
                                i18n.language === 'urdu' ? 'right' : 'left',
                              lineHeight:
                                i18n.language === 'urdu'
                                  ? moderateVerticalScale(25)
                                  : moderateVerticalScale(18),
                              fontSize:
                                i18n.language === 'urdu'
                                  ? scale(18)
                                  : scale(14),
                              fontFamily:
                                i18n.language === 'urdu'
                                  ? jameelNooriNastaleeq
                                  : latoRegular,
                              color: grayTxtColor,
                            }}>
                            {t('driver_behavior_rating')}
                          </Text>
                        </View>

                        <View style={styles.behaviorRatingView}>
                          <RatingStars
                            size={26}
                            initRating={getBehaviorRating}
                            onRatingChanged={newRating => {
                              setBehaviorRating(newRating);
                            }}
                          />
                        </View>
                      </View>

                      {getRideDetails?.is_labour_required != 0 && (
                        <View
                          style={{
                            flexDirection:
                              i18n.language === 'urdu' ? 'row-reverse' : 'row',
                          }}>
                          <View
                            style={[
                              styles.serviceTextView,
                              {
                                flexDirection:
                                  i18n.language === 'urdu'
                                    ? 'row-reverse'
                                    : 'column',
                              },
                            ]}>
                            <Text
                              style={{
                                lineHeight:
                                  i18n.language === 'urdu'
                                    ? moderateVerticalScale(25)
                                    : moderateVerticalScale(18),
                                fontSize:
                                  i18n.language === 'urdu'
                                    ? scale(18)
                                    : scale(14),
                                fontFamily:
                                  i18n.language === 'urdu'
                                    ? jameelNooriNastaleeq
                                    : latoRegular,
                                color: grayTxtColor,
                              }}>
                              {t('mover_service_rating')}
                            </Text>
                          </View>
                          <View style={styles.serviceRatingView}>
                            <RatingStars
                              size={26}
                              initRating={getLaborRating}
                              onRatingChanged={newRating => {
                                setLaborRating(newRating);
                              }}
                            />
                          </View>
                        </View>
                      )}
                    </>
                  )}
                </View>
                <View style={styles.buttonContainer}>
                  <ButtonComponent
                    disabled={false}
                    icon={{
                      name: 'arrow-right',
                      color: colorWhite,
                      size: scale(30),
                    }}
                    btnStyle={{
                      backgroundColor: color4E008A,
                    }}
                    onPress={() => {
                      reviewSubmit();
                    }}
                  />
                </View>
            
            </View>
           
          </View>
          </ScrollView>
          </KeyboardAvoidingView>
        </View>
        
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  mainView: {
    flex: 1,
  },
  feedbackTitleView: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: moderateScale(10),
  },
  profileContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: moderateVerticalScale(25),
  },
  profileImageView: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(500),
    borderWidth: 3,
    borderColor: BorderColor,
    overflow: 'hidden',
  },
  profileImage: {
    height: moderateScale(100),
    width: moderateScale(100),
    borderRadius: moderateScale(500),
  },
  profileName: {
    fontSize: scale(16),
    color: colorBlack,
    fontFamily: latoSemiBold,
    textAlign: 'center',
    marginTop: moderateScale(10),
  },
  profileRatingView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: moderateScale(9),
    marginBottom: moderateScale(11),
  },
  behaviorTextView: {
    flex: 1,
  },
  behaviorRatingView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  dropDownContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  feedback: {
    height: moderateScale(150),
    textAlignVertical: 'top',
    borderWidth: 1,
    borderRadius: moderateScale(10),
    borderColor: colorBorder,
    marginTop: moderateVerticalScale(10),
    paddingBottom: 0,
    paddingHorizontal: moderateScale(12),
    paddingTop: moderateScale(12),
  },
  serviceTextView: {
    flex: 1,
  },
  serviceRatingView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    // flex: 1,
    // backgroundColor:"pink",
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: moderateScale(33),
    marginBottom: moderateScale(18),
    marginTop: moderateScale(30),
  },
  dropDownHeader: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: moderateVerticalScale(15),
    backgroundColor: colorF8F8F8,
    borderColor: colorE5E5E5,
  },
  dropDownInfoContainer: {
    flex: 1,
    marginHorizontal: moderateScale(35),
  },
});
