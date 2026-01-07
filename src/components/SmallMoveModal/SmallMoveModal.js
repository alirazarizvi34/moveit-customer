import {
  View,
  Text,
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
import {colorTheme} from '../../constants/ColorConstants';

const {primaryText, primaryBackground, defaultBackground, secondaryBackground} = colorTheme;
const {jameelNooriNastaleeq,latoHeavy} = THEME.fonts;

const smallMoveBtnTitle = [
  {
    title: 'move_now',
    image: AppImages?.clockPin,
  },
  {
    title: 'move_later',
    image: AppImages?.calenderClock,
  },
];
const SmallMoveModal = ({visible, small, onClose, onPress, mode}) => {
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
    <BottomModal onClose={onClose} draggable={true} visible={visible}>
      <View style={styles.modalView}>
        {smallMoveBtnTitle.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={()=> {onPress(item?.title)}}
              activeOpacity={1}
              style={styles.mainContainer}>
              <View style={styles.imageContainer}>
                <View style={styles.innerImageContainer}>
                  <Image
                    source={item?.image}
                    resizeMode="contain"
                    style={styles.logo}
                  />
                </View>
              </View>

              <View style={styles.textContainer}>
                <View style={styles.sideTextView} />
                <View style={styles.textInnerContainer}>
                  <Text style={styles.buttonSubTitle}>{t(item?.title)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </BottomModal>
  );
};

export default memo(SmallMoveModal);

const getStyles = (language, small, bgColorHandler) =>
  StyleSheet.create({
    modalView: {
      backgroundColor: bgColorHandler(),
      borderTopRightRadius: 12,
      borderTopLeftRadius: 12,
      alignItems: 'center',
      paddingBottom: moderateVerticalScale(20),
      paddingTop: moderateVerticalScale(40),
    },
    mainContainer: {
      flex: 1,
      height: moderateScale(100),
      alignItems: 'center',
      flexDirection: language == 'urdu' ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      right: language == 'urdu' ? moderateScale(-10) : moderateScale(10),
      marginHorizontal: moderateScale(43),
    },
    sideTextView: {
      position: 'absolute',
      height: 82,
      width: 82,
      marginLeft: 55,
      right: language == 'urdu' ? -54 : undefined,
      left: language == 'urdu' ? undefined : -110,
      top: -3.5,
      backgroundColor: primaryBackground,
      borderRadius: 200,
    },
    buttonSubTitle: {
      color: primaryText,
      fontSize: language === 'urdu' ? scale(24) : scale(16),
      fontFamily: language === 'urdu' ? jameelNooriNastaleeq : latoHeavy,
      marginBottom:
        language === 'urdu'
          ? moderateVerticalScale(0)
          : moderateVerticalScale(5),
      textAlign: language == 'urdu' ? 'right' : 'left',
    },
    textInnerContainer: {
      alignSelf: 'center',
      paddingHorizontal: 10,
      marginLeft: moderateScale(35),
    },
    logo: {
      height: moderateScale(37),
      width: moderateScale(45),
    },
    imageContainer: {
      width: moderateScale(70),
      height: moderateScale(90),
      justifyContent: 'center',
      zIndex: 999999,
      borderBottomRightRadius: 200,
      borderTopRightRadius: 200,
      backgroundColor: primaryBackground,
      left: 5,
    },
    textContainer: {
      flex: 1,
      overflow: 'hidden',
      flexDirection: 'row',
      height: 75,
      justifyContent: language == 'urdu' ? 'center' : 'flex-start',
      borderRadius:8,
      borderLeftWidth: 0,
      backgroundColor: defaultBackground,
    },
    innerImageContainer: {
      backgroundColor: secondaryBackground,
      padding: 10,
      alignSelf: 'center',
      height: moderateScale(75),
      left: language == 'urdu'? undefined : 10,
      right: language == 'urdu' ? 10 : undefined,
      position: 'absolute',
      width: moderateScale(75),
      zIndex: 30,
      borderRadius: moderateScale(100),
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },
  });
