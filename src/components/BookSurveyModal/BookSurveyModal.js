import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import BottomModal from '../Modal/BottomModal';
import ButtonComponent from '../buttonComp/ButtonComponent';
import {moderateScale, scale} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import {useTranslation} from 'react-i18next';
import {colorTheme} from '../../constants/ColorConstants';

const BookSurveyModal = ({visible, onModalClose, onBookPress}) => {
  const {t} = useTranslation();
  return (
    <BottomModal
      draggable
      onClose={onModalClose}
      visible={visible}
      onModalClose={onModalClose}>
      <View style={styles.container}>
        <View style={styles.headingsContainer}>
          <Text style={styles.heading}>{t('bookASurvey')}</Text>
          <Text style={styles.description}>{t('bookASurveyDescription')} </Text>
          <Text style={styles.noteText}>{t('bookASurveyNote')}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonComponent
            btnStyle={styles.discardBtn}
            onPress={onModalClose}
            disabled={false}
            textStyle={styles.discardText}
            text={t('discard')}
          />
          <ButtonComponent
            disabled={false}
            onPress={onBookPress}
            btnStyle={styles.bookNowBtn}
            text={t('bookNow')}
          />
        </View>
      </View>
    </BottomModal>
  );
};

export default BookSurveyModal;

const {
  defaultText,
  errorText,
  errorBorder,
  defaultBackground,
  lightPurpleBackground,
  drawerPinkBackground,
  primaryText,
} = colorTheme;
const {latoHeavy, latoRegular} = THEME.fonts;

const styles = StyleSheet.create({
  container: {
    paddingVertical: moderateScale(25),
    paddingHorizontal: moderateScale(22),
    backgroundColor: drawerPinkBackground,
    borderTopRightRadius: moderateScale(28),
    borderTopLeftRadius: moderateScale(28),
  },
  headingsContainer: {
    paddingVertical: moderateScale(10),
    marginTop: moderateScale(12),
  },
  heading: {
    textAlign: 'center',
    fontSize: scale(18),
    color: primaryText,
    fontFamily: latoHeavy,
  },
  description: {
    fontSize: scale(12),
    fontFamily: latoRegular,
    color: defaultText,
    textAlign: 'center',
    marginTop: moderateScale(12),
  },
  noteText: {
    fontSize: scale(10),
    fontFamily: latoRegular,
    textAlign: 'center',
    color: errorText,
    marginTop: moderateScale(12),
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: moderateScale(18),
    paddingVertical: moderateScale(10),
    justifyContent: 'center',
  },
  discardBtn: {
    width: moderateScale(140),
    borderWidth: 1,
    borderColor: errorBorder,
    borderRadius: moderateScale(100),
    backgroundColor: drawerPinkBackground,
  },
  discardText: {
    color: errorText,
  },
  bookNowBtn: {
    width: moderateScale(140),
    borderRadius: moderateScale(100),
  },
});
