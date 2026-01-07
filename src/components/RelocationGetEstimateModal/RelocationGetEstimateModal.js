import {
  View,
  Text,
  Modal,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import {AppImages} from '../../constants/AppImages';
import BottomModal from '../Modal/BottomModal';
import {AppConstants} from '../../constants/AppConstants';
import { colorTheme } from '../../constants/ColorConstants';

const {secondaryText,primaryText,primaryBackground,defaultBackground,whiteText} = colorTheme;
const {latoSemiBold, latoBold, latoThin, latoRegular,latoHeavy} = THEME.fonts;

const RelocationGetEstimateModal = ({
  children,
  visible,
  onModalClose,
  small,
  draggable,
  onClose,
  onPressEstimate,
  onPressSurvey,
  mode,
}) => {
  const {i18n, t} = useTranslation();

  const bgColorHandler = () => {
    if (!mode || mode == 'dark') {
      return primaryBackground;
    } else {
      return defaultBackground;
    }
  };
  const styles = getStyles(i18n.language, small, bgColorHandler);

  return (
    <BottomModal
      size={'small'}
      transparent
      onClose={onClose}
      draggable={true}
      visible={visible}>
      <View style={styles.modalView}>
        <TouchableOpacity
          activeOpacity={AppConstants.buttonActiveOpacity}
          style={styles.buttonView}
          onPress={onPressEstimate}>
          <View style={styles.leftImageView}>
            <Image source={AppImages.calculate} style={styles.leftImage} />
          </View>

          <View style={styles.buttonTitleView}>
            <Text style={styles.buttonTitle}>{t('estimate_button_title')}</Text>
            <Text style={styles.buttonSubTitle}>
              {t('estimate_button_subTitle')}
            </Text>
          </View>
          <View style={styles.rightImageView}>
            <Image source={AppImages.rightArrow} style={styles.rightImage} />
          </View>
        </TouchableOpacity>
        <View style={styles.modalTitleView}>
            <Text style={styles.title}>{t('estimate_modal_title')}</Text>
          <View style={{alignItems:"center",justifyContent:"center"}}>
            <TouchableOpacity activeOpacity={AppConstants.buttonActiveOpacity} onPress={onPressSurvey}>
              <Text style={styles.bookSurvey}>{t('book_a_survey')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BottomModal>
  );
};

export default memo(RelocationGetEstimateModal);

const getStyles = (language, small, bgColorHandler) =>
  StyleSheet.create({
    modalView: {
      backgroundColor: bgColorHandler(),
      borderTopRightRadius: 12,
      borderTopLeftRadius: 12,
      alignItems:'center'
    },
    buttonView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 12,
      height: moderateScale(82),
      maxWidth:moderateScale(300),
      backgroundColor: defaultBackground,
      marginHorizontal: moderateScale(44),
      marginTop: moderateVerticalScale(45),
      marginBottom: moderateVerticalScale(20),
      paddingHorizontal: moderateScale(14),
      paddingVertical: moderateVerticalScale(15),
    },
    leftImageView: {
      flex: 0.5,
    },
    leftImage: {
      width: moderateScale(45),
      height: moderateScale(45),
    },
    buttonTitleView: {
      flex: 1,
    },
    buttonTitle: {
      fontSize: scale(15),
      fontFamily: latoHeavy,
      color: primaryText,
    },
    buttonSubTitle: {
      fontSize: scale(10),
      fontFamily: latoRegular,
      color: primaryText,
    },
    rightImageView: {
      flex: 0.5,
      alignItems: 'flex-end',
    },
    rightImage: {
      width: moderateScale(18),
      height: moderateScale(16),
    },
    modalTitleView: {
      marginBottom: moderateVerticalScale(40),
    },
    title: {
      fontSize: scale(14),
      fontFamily: latoThin,
      color: whiteText,
      textAlign: 'center',
    },
    bookSurvey: {
      fontSize: scale(15),
      fontFamily: latoSemiBold,
      color: secondaryText,
      textAlign: 'center',
      textDecorationLine: 'underline',
    },
  });
