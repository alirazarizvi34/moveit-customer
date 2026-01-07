import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import BottomModal from '../Modal/BottomModal';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import ButtonComponent from '../buttonComp/ButtonComponent';
import {useTranslation} from 'react-i18next';
import {colorTheme} from '../../constants/ColorConstants';
import {THEME} from '../../shared/theme';
import {GlobalContext} from '../../../context/GlobalState';
import useDateTimeManager from '../../hooks/useDateTimeManager';

const RelocationSurveyUpdatedModal = ({
  navigation,
  onPress,
  visible,
  onClose,
  showButton,
  data,
}) => {
  const {setSurveyScheduleUpdated, surveyScheduleUpdated} =
    useContext(GlobalContext);
  const {t} = useTranslation();
  const {convertToLocal} = useDateTimeManager();
  const navigationHandler = () => {
    onPress(data);
    setSurveyScheduleUpdated(null);
  };
  return (
    <BottomModal
      visible={visible}
      onClose={onClose}
      draggable
      onModalClose={onClose}>
      <View style={styles.container}>
        <View style={styles.headingsContainer}>
          <Text style={styles.heading}>
            {data?.status == 'new'
              ? t('surveySheduleUpdated')
              : t('moveSheduleUpdated')}
          </Text>
          <Text style={styles.description}>
            {data?.status == 'new'
              ? t('surveryScheduleUpdatedDescription')
              : t('moveScheduleUpdatedDescription')}
          </Text>
        </View>

        <View style={styles.relocationDateView}>
          <Text style={styles.dateText}>
            {data?.status == 'new'
              ? convertToLocal(data?.survey_date + ' ' + data?.survey_time)
              : convertToLocal(data?.moving_date + ' ' + data?.moving_time)}
          </Text>
        </View>

        {showButton ?? (
          <View style={styles.buttonContainer}>
            <ButtonComponent
              text={t('viewNow')}
              btnStyle={styles.btn}
              disabled={false}
              onPress={() => navigationHandler()}
            />
          </View>
        )}
      </View>
    </BottomModal>
  );
};

export default RelocationSurveyUpdatedModal;

const {
  defaultText,
  primaryBackground,
  drawerPinkBackground,
  primaryText,
  secondaryBackground,
} = colorTheme;
const {latoHeavy, latoSemiBold} = THEME.fonts;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: moderateScale(50),
    paddingHorizontal: moderateScale(20),
    backgroundColor: drawerPinkBackground,
    borderTopRightRadius: moderateScale(28),
    borderTopLeftRadius: moderateScale(28),
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(35),
  },
  headingsContainer: {
    paddingHorizontal: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: scale(16),
    fontFamily: latoSemiBold,
    textAlign: 'center',
  },
  heading: {
    color: defaultText,
    fontSize: scale(18),
    fontFamily: latoHeavy,
    color: primaryText,
    textAlign: 'center',
  },
  description: {
    color: defaultText,
    fontSize: scale(12),
    marginTop: moderateScale(12),
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  btn: {
    width: moderateScale(150),
    borderRadius: moderateScale(100),
  },
  relocationDateView: {
    alignSelf: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    borderRadius: moderateScale(6),
    marginTop: moderateVerticalScale(20),
    paddingHorizontal: moderateScale(22),
    paddingVertical: moderateScale(10),
    backgroundColor: secondaryBackground,
    // borderColor: primaryBackground,
    paddingVertical: moderateVerticalScale(5),
  },
  relocationDate: {
    fontSize: scale(20),
    fontFamily: latoSemiBold,
    textAlign: 'center',
  },
});
