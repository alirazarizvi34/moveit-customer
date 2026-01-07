import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import BottomModal from '../Modal/BottomModal';
import ButtonComponent from '../buttonComp/ButtonComponent';
import {AppImages} from '../../constants/AppImages';
import {colorTheme} from '../../constants/ColorConstants';
import moment from 'moment';
import LoaderModal from '../Modal/LoaderModal';

const {
  lightGrayBackground,
  defaultText,
  defaultBackground,
  defaultBorder,
  primaryBackground,
  primaryText,
  secondaryBackground,
  errorText,
  lightPurpleBackground,
  disableText,
  darkGrayText,
  drawerPinkBackground
} = colorTheme
const {latoBold, latoSemiBold, latoHeavy,jameelNooriNastaleeq} = THEME.fonts;

const TimeSlotSelectDrawerModal = ({
  children,
  visible,
  onModalClose,
  draggable,
  onClose,
  onPress,
  mode,
  selectedDate,
  timeSlots = [],
  onDateEdit,
  type,
  selectedSlot,
  setSelectedSlot,
  loadingState,
  onContinuePress,
  currentRequestType,
  requestType=null,
  ...props
}) => {
  const {i18n, t} = useTranslation();

  const bgColorHandler = () => {
    if (!mode || mode == 'dark') {
      return primaryBackground;
    } else {
      return drawerPinkBackground;
    }
  };

  const styles = getStyles(i18n.language, bgColorHandler);

  return (
    <BottomModal onClose={onClose} draggable={true} visible={visible}>
      {loadingState && <LoaderModal load={loadingState} textShow={false} />}
      <View style={styles.modalView}>
        <View style={styles.labelView}>
          <Text style={styles.label}>
            When do you want to schedule{' '}
            {requestType ? requestType : currentRequestType == 'survey' ? currentRequestType : type}?
          </Text>
        </View>

        <View style={styles.horizontalLineView}>
          <View style={styles.horizontalLine} />
        </View>

        <View style={styles.dateLabelView}>
          <Text style={styles.dateLabel}>
            {moment(selectedDate).format('MMM DD , YYYY')}
          </Text>
          <TouchableOpacity onPress={onDateEdit}>
            <Image style={styles.editImage} source={AppImages.editIcon2} />
          </TouchableOpacity>
        </View>

        <View style={styles.boxContainer}>
          {Array.isArray(timeSlots) && timeSlots.length > 0 ? (
            timeSlots.map((time, index) => (
              <TouchableOpacity
                onPress={() => setSelectedSlot(time)}
                style={time.selected ? styles.selectedBoxView : styles.boxView}
                key={index}>
                <Text
                  style={
                    time.selected ? styles.selectedBoxText : styles.boxText
                  }>
                  {moment(
                    new Date(`${selectedDate} ${time?.startTime}`),
                  ).format(`hh:mm [\n]a`)}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noSlotsText}>No Slots found for this date</Text>
          )}
        </View>

        <View style={styles.buttonView}>
          <ButtonComponent
            disabled={selectedSlot ? false : true}
            pressStatus={loadingState}
            text={t('continue')}
            textStyle={styles.buttonTitle}
            onPress={onContinuePress}
          />
        </View>
      </View>
    </BottomModal>
  );
};
export default TimeSlotSelectDrawerModal;

const getStyles = (language, bgColorHandler) =>
  StyleSheet.create({
    modalView: {
      backgroundColor: bgColorHandler(),
      borderTopRightRadius: 12,
      borderTopLeftRadius: 12,
      paddingBottom: moderateVerticalScale(20),
      paddingTop: moderateVerticalScale(35),
    },
    dateLabelView: {
      marginHorizontal: moderateScale(33),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dateLabel: {
      fontSize: scale(20),
      fontFamily: latoHeavy,
      color: primaryText,
    },
    labelView: {
      marginHorizontal: moderateScale(33),
    },
    label: {
      fontSize: scale(16),
      fontFamily: latoBold,
      color: defaultText,
    },
    editImage: {
      width: moderateScale(24),
      height: moderateScale(24),
    },
    boxContainer: {
      marginTop: moderateVerticalScale(16),
      flexDirection: 'row',
      marginHorizontal: moderateScale(26),
      flexWrap: 'wrap', // Allow boxes to wrap to the next line
      justifyContent: 'center',
      alignItems: 'center',
    },
    boxView: {
      width: moderateScale(60),
      height: moderateScale(50),
      margin: 5,
      justifyContent: 'center',
      backgroundColor: lightGrayBackground,
      alignItems: 'center',
      borderRadius: 8,
    },
    selectedBoxView: {
      width: moderateScale(60),
      height: moderateScale(50),
      margin: 5,
      justifyContent: 'center',
      backgroundColor: secondaryBackground,
      alignItems: 'center',
      borderRadius: 8,
    },
    boxText: {
      fontSize: scale(14),
      fontFamily: latoSemiBold,
      textAlign: 'center',
      color: darkGrayText,
    },
    selectedBoxText: {
      fontSize: scale(14),
      fontFamily: latoBold,
      textAlign: 'center',
      color: primaryText,
    },
    horizontalLineView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: moderateVerticalScale(25),
    },
    horizontalLine: {
      flex: 1,
      height: moderateScale(1),
      backgroundColor: defaultBorder,
    },
    buttonView: {
      marginTop: moderateVerticalScale(16),
      marginBottom: moderateVerticalScale(10),
      paddingHorizontal: moderateScale(22),
    },
    buttonTitle: {
      // fontSize: scale(20),
      // fontFamily: latoSemiBold,
      fontSize: language === 'urdu' ? scale(16) : scale(20),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoSemiBold,
      textAlign: 'center',
    },
    noSlotsText: {
      fontSize: scale(15),
      fontFamily: latoSemiBold,
      color: errorText,
    },
  });
