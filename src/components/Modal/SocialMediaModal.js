import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useContext, useState } from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';
import ButtonComponent from '../buttonComp';
import { GlobalContext } from '../../../context/GlobalState';
import { THEME } from '../../shared/theme';
import { colorTheme } from '../../constants/ColorConstants';
import { AppImages } from '../../constants/AppImages';

const socialMediaName = [
  {
    title: 'LinkedIn',
    image: AppImages?.linkedin,
  },
  {
    title: 'Facebook',
    image: AppImages?.facebook,
  },
  {
    title: 'Instagram',
    image: AppImages?.instagram,
  },
  {
    title: 'Family/Friends',
    image: AppImages?.heart,
  },
];

const SocialMediaModal = ({ visible, onSubmitPress, onClose, loadingState }) => {
  const { t } = useTranslation();
  const { bootMeUpData } = useContext(GlobalContext);

  const [selectedSurveyIndex, setSelectedSurveyIndex] = useState(null);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  

  const handleCardPress = (title,index) => {
    setSelectedSurveyIndex(index);
    setSelectedSurvey(title);
  };

  return (
    <Modal
      transparent
      style={styles.modalContainer}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.scrollContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.titleContainer}>
                <Text style={styles.heading}>
                  {t('Where did you hear about us?')}
                </Text>
              </View>

              <View style={styles.socialMediaContainer}>
                {socialMediaName.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.card,
                      selectedSurveyIndex === index && styles.selectedCard,
                    ]}
                    onPress={() => handleCardPress(item?.title,index)}>
                    <Image source={item?.image} style={styles.icons} />
                    <Text style={[styles.title,selectedSurveyIndex === index && styles.selectedtitle]}>{item?.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.buttonContainer}>
                <ButtonComponent
                  pressStatus={loadingState}
                  disabled={selectedSurveyIndex === null}
                  text={t('submit')}
                  onPress={() => onSubmitPress(selectedSurvey)}
                  btnStyle={
                    selectedSurveyIndex !== null
                      ? styles.submitBtn
                      : styles.disabledBtn
                  }
                  textStyle={styles.btnText}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SocialMediaModal;

const {
  primaryBorder,
  primaryText,
  defaultBackground,
  lightPurpleBackground,
  disableBackground,
  thistleLightBorder,
  defaultText,
  placeholderText
} = colorTheme;
const { latoHeavy, latoRegular,latoMedium } = THEME.fonts;

const styles = StyleSheet.create({
  modalContainer: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.60)',
  },
  titleContainer: {
    marginHorizontal: moderateScale(25),
  },
  title: {
    fontSize: scale(12),
    fontFamily:latoRegular, 
    color: placeholderText
  },
  selectedtitle: {
    fontSize: scale(12),
    fontFamily:latoMedium, 
    color: defaultText
  },
  disabledBtn: {
    width: moderateScale(119),
    height: moderateScale(44),
    borderRadius: moderateScale(100),
    backgroundColor: disableBackground,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    backgroundColor: defaultBackground,
    borderColor: primaryBorder,
    borderRadius: moderateScale(19),
    width: moderateScale(318),
  },
  scrollContainer: {
    paddingVertical: moderateVerticalScale(27),
  },
  heading: {
    fontSize: scale(16),
    textAlign: 'center',
    color: primaryText,
    fontFamily: latoHeavy,
    letterSpacing: 0.5,
  },
  socialMediaContainer: {
    paddingVertical: moderateVerticalScale(27),
    paddingHorizontal: moderateScale(45),
    gap: 10,
  },
  submitBtn: {
    width: moderateScale(119),
    height: moderateScale(44),
    borderRadius: moderateScale(100),
  },
  btnText: {
    fontSize: scale(14),
    alignSelf: 'center',
  },
  icons: {
    height: moderateScale(15),
    width: moderateScale(15),
    marginHorizontal: moderateScale(12),
  },
  card: {
    borderWidth: 1,
    height: moderateScale(39),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: thistleLightBorder,
  },
  selectedCard: {
    backgroundColor: lightPurpleBackground, // Change to your desired selected color
  },
});
