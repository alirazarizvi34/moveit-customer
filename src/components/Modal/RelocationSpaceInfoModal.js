import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import BottomModal from './BottomModal';
import {colorTheme} from '../../constants/ColorConstants';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';

const {latoHeavyItalic, latoRegular} = THEME.fonts;
const {defaultText, primaryText} = colorTheme;

const RelocationSpaceInfoModal = ({
  visible,
  onClose,
  acceptPress,
  rejectPress,
  title,
  description,
  titleColor,
  loader,
  loadingState,
}) => {
  const {i18n, t} = useTranslation();

  const styles = getStyles(i18n.language, titleColor);

  const formatTitle = text => {
    if (!text) return null; // Handle cases where the title might be undefined or null
    const words = text.split(' ');
    const firstWord = words[0] || ''; // Safeguard for first word
    const secondWord = words[1] || ''; // Safeguard for second word
    const thirdWord = words[2] || ''; // Safeguard for third word
    const restOfText = words.slice(3).join(' '); // Remaining text after the third word

    return (
      <Text style={styles.title}>
        {firstWord} <Text style={styles.highlight}>{secondWord}</Text>{' '}
        {thirdWord === 'room' ? (
          <Text style={styles.highlight}>{thirdWord}</Text>
        ) : (
          thirdWord
        )}{' '}
        {restOfText}
      </Text>
    );
  };

  return (
    <BottomModal onClose={onClose} draggable={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>{formatTitle(title)}</View>
      </View>
    </BottomModal>
  );
};

export default RelocationSpaceInfoModal;

const getStyles = (language, titleColor) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: moderateScale(30),
      paddingTop: moderateVerticalScale(15),
      paddingBottom: moderateVerticalScale(30),
      flex: 1,
    },
    alertIcon: {
      height: moderateVerticalScale(30),
      width: moderateScale(30),
    },
    title: {
      color: titleColor ? titleColor : defaultText,
      fontSize: scale(16),
      fontFamily: latoRegular,
    },
    subTitle: {
      fontSize: language == 'urdu' ? scale(16) : scale(12),
      textAlign: 'center',
    },
    titleContainer: {
      marginTop: moderateVerticalScale(25),
      marginBottom: moderateVerticalScale(15),
    },
    subTitleContainer: {
      marginTop: moderateVerticalScale(5),
    },
    highlight: {
      fontSize: scale(16), // Larger size for emphasis
      fontFamily: latoHeavyItalic,
      color: primaryText, // Custom highlight color
    },
  });
