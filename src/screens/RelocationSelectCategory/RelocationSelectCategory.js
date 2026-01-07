import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import {colorTheme} from '../../constants/ColorConstants';
import {AppImages} from '../../constants/AppImages';
import NewHeader from '../../components/Header/NewHeader';
import {AppConstants} from '../../constants/AppConstants';
import {useTranslation} from 'react-i18next';
import { GlobalContext } from '../../../context/GlobalState';
import DatePickerDrawerModal from '../../components/DatePickerDrawerModal/DatePickerDrawerModal';
import useRelocationDates from '../../hooks/useRelocationDates';
import TimeSlotSelectDrawerModal from '../../components/TimeSlotSelectDrawerModal/TimeSlotSelectDrawerModal';
import moment from 'moment';
import relocationService from '../../services/relocation-service';
import useMergn from '../../hooks/useMergn';

const {latoSemiBold, latoRegular, latoMedium} = THEME.fonts;
const {primaryText, lightPurpleBackground, defaultText, infoText} = colorTheme;

const RelocationSelectCategory = ({navigation}) => {
  const {i18n, t} = useTranslation();
  const {eventHandler, attributeHandler, uniqueIdentifierHandler} = useMergn();
  const {
    setRelocationSpaces,
    setRelocationRequest,
    relocationRequest,
    setSurveyId,
    setMarkers,
    setSelectedRelocationItems,
    setSelectedPropertyType,
    setPropertyType,
    setPickupPproTypeindex,
    setDropoffPproTypeindex,
    setEnableSegmentTab
  } = useContext(GlobalContext);
  const {
    onDatePickHandler,
    setTimeSlotModal,
    showTimeSlotModal,
    timeSlots,
    timeZone,
    selectedSlot,
    date,
    setDate,
    setSelectedDay,
    onSlotPickHandler,
  } = useRelocationDates();
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [getLoader, setLoader] = useState(false);
  

  const bookSurvey = () => {
    setShowDatePickerModal(true);
    // navigation.navigate('RelocationSurveyForm');
  };

  const moveFewItemsHandler = async() => {
    setRelocationSpaces(AppConstants?.relocationSpaces);
    setRelocationRequest(pre => ({
      ...pre,
      moving_type: null
    }));
    navigation.navigate('RelocationItemCategories');
    if(Platform.OS == 'android'){
    const eventMessage = await eventHandler('Move Type','move-type','Move a Few Items');
    const attributeMessage = await attributeHandler('Move Type', 'Move a Few Items');
    }
  };

  const moveEverythingHandler = async() => {
    navigation.navigate('RelocationSpaces');
    if(Platform.OS == 'android'){
    const eventMessage = await eventHandler('Move Type','move-type','Move Everything');
    const attributeMessage = await attributeHandler('Move Type', 'Move Everything');
    }
  };

  const onDatePickerHandler = selectedDate => {
    setDate(selectedDate);
    onDatePickHandler(selectedDate, 'survey', 'survey');
    setShowDatePickerModal(false);
  };

  const postRequestHandler = () => {
    const relocationObject = {
      datetime:
        moment(date).format('YYYY-MM-DD') +
        ' ' +
        selectedSlot?.startTime +
        '' +
        timeZone,
      data_type: 'finalization',
      tagged_city: relocationRequest?.tagged_city,
      request_type: 'survey',
    };
    setLoader(true);

      relocationService
        .selfEstimatedMove(relocationObject, AppConstants.imageHeader)
        .then(res => {
          setLoader(false);
          if (res?.data?.success) {
            setRelocationRequest(pre => ({
              ...pre,
              status: res?.data?.data?.status,
            }));
            setSurveyId(res?.data?.data?.id);
            setMarkers([]);
            setSelectedRelocationItems([]);
            setSelectedPropertyType(null);
            setPropertyType(null);
            setPickupPproTypeindex(null);
            setDropoffPproTypeindex(null);
            setEnableSegmentTab(false);
            navigation.popToTop();
            //popToTop remove all screen in the existing stack except the first one
            navigation.navigate(
              'SurveySubmitted',
              (response = {
                response: {
                  survey_date: res?.data?.data?.survey_date,
                  survey_time: res?.data?.data?.survey_time,
                },
              }),
            );
          }
        })
        .catch(err => {
          toastService.shortToast(err?.response?.data?.message);
          setLoader(false);
        });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <NewHeader
          title
          navigation={navigation}
          screenName={'RelocationSelectCategory'}
        />
        <View style={styles.mainView}>
          <View style={styles.titleView}>
            <Text style={styles.title}>Tell us what you want to move</Text>
          </View>

          <ScrollView>
            <View style={styles.cardMainContainer}>
              <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.cardView} activeOpacity={AppConstants.buttonActiveOpacity} onPress={moveEverythingHandler}>
                  <Image
                    resizeMode="contain"
                    style={styles.moveEveryThingImage}
                    source={AppImages.moveEveryThing}
                  />
                  <Text style={styles.cardTitle}>Move Everything</Text>
                  <Text style={styles.cardSubTitle}>
                    Homes, Shops, Offices & more
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.cardView}  activeOpacity={AppConstants.buttonActiveOpacity} onPress={moveFewItemsHandler}>
                  <Image
                    resizeMode="contain"
                    style={styles.cardImage}
                    source={AppImages.moveFewItems}
                  />
                  <Text style={styles.cardTitle}>Move a Few Items</Text>
                  <Text style={styles.cardSubTitle}>
                    Furniture, Appliances, Home Goods & more
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footerContainer}>
            <Text style={styles.footerTitle}>{t('estimate_modal_title')}</Text>
            <View style={styles.footerLinkView}>
              <TouchableOpacity
                activeOpacity={AppConstants.buttonActiveOpacity}
                onPress={bookSurvey}>
                <Text style={styles.footerLinkText}>{t('book_a_survey')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {showTimeSlotModal && (
          <TimeSlotSelectDrawerModal
            setSelectedSlot={onSlotPickHandler}
            loadingState={getLoader}
            selectedSlot={selectedSlot}
            mode={'default'}
            type={'survey'}
            currentRequestType={'survey'}
            onClose={() => setTimeSlotModal(false)}
            draggable
            selectedDate={date}
            onDateEdit={() => {
              setTimeSlotModal(false);
              setShowDatePickerModal(true);
            }}
            timeSlots={timeSlots}
            visible={showTimeSlotModal}
            onContinuePress={postRequestHandler}
          />
        )}
      {showDatePickerModal && (
          <DatePickerDrawerModal
            type={'survey'}
            currentRequestType={'survey'}
            mode={'default'}
            onClose={() => setShowDatePickerModal(false)}
            draggable
            visible={showDatePickerModal}
            currentDate={date}
            onPress={onDatePickerHandler}
            minDate={`${date}`}
            onDaySelect={day => setSelectedDay(day)}
          />
        )}
    </SafeAreaView>
  );
};

export default RelocationSelectCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    marginHorizontal: moderateScale(47),
  },
  titleView: {
    marginHorizontal: moderateScale(18),
    marginBottom: moderateVerticalScale(4),
  },
  title: {
    fontSize: scale(20),
    fontFamily: latoSemiBold,
    textAlign: 'center',
    color: primaryText,
  },
  cardMainContainer: {
    marginTop: moderateVerticalScale(43),
    gap: 38,
  },
  cardContainer: {
    overflow: 'hidden',
    paddingBottom: 4,
    paddingRight: 5,
    borderRadius: 12,
  },
  cardView: {
    height: moderateScale(190),
    backgroundColor: lightPurpleBackground,
    paddingVertical: moderateVerticalScale(28),
    alignItems: 'center',
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 12,
  },
  cardImage: {
    width: moderateScale(117),
    height: moderateScale(78),
  },
  moveEveryThingImage: {
    width: moderateScale(115),
    height: moderateScale(64),
  },
  cardTitle: {
    fontSize: scale(20),
    fontFamily: latoSemiBold,
    color: primaryText,
    marginTop: moderateVerticalScale(7),
  },
  cardSubTitle: {
    fontSize: scale(10),
    fontFamily: latoRegular,
    color: primaryText,
    marginTop: moderateVerticalScale(4),
  },
  footerContainer: {
    marginTop: moderateVerticalScale(10),
    marginBottom: moderateVerticalScale(20),
    paddingHorizontal: moderateVerticalScale(22),
  },
  footerTitle: {
    fontSize: scale(14),
    fontFamily: latoRegular,
    color: defaultText,
    textAlign: 'center',
  },
  footerLinkView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerLinkText: {
    fontSize: scale(18),
    fontFamily: latoMedium,
    color: infoText,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
