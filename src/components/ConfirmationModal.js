import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Image,
  Linking,
} from 'react-native';
// import { Calendar } from 'react-native-calendars';
import {useTranslation} from 'react-i18next';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../shared/theme';
import ButtonComponent from './buttonComp/ButtonComponent';

const {
  colorFFBE50,
  color207DFD,
  colorFFA100,
  colorFAF9F5,
  colorWhite,
  color4E008A,
  colorBlack,
  colorF6F6F6,
  validateColor,
  colorF0F0F0,
  color0F0F0F,
  colorB0B0C3,
  colorRed,
  colorGray,
  colorBorder,
} = THEME.colors;
const {
  latoBlack,
  jameelNooriNastaleeq,
  latoRegular,
  latoMedium,
  latoSemiBold,
  latoBold,
} = THEME.fonts;
export default function ConfirmationModal({
  modalVisible = false,
  title = {},
  number,
  paragraph,
  button = {},
  centeredView = {},
  modalView = {},
  imageView = {},
  imageStyle = {},
  titleTextStyle = {},
  paragraphTextStyle = {},
  contactStyle = {},
  buttonView = {},
  btnStyleOne = {},
  btnStyleTwo = {},
  btnTextStyleOne = {},
  btnTextStyleTwo = {},
  image,
  onClose = () => {},
  onAccept = () => {},
  ...props
}) {
  const {t, i18n} = useTranslation();
  const callHandler = () => {
    const tell = Platform.OS == 'android' ? `tel: ${number}` : `tel:// ${number}` ;
    Linking.openURL(tell);
  }
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={{...Styles.centeredView, ...centeredView}}>
        <View style={{...Styles.modalView, ...modalView}}>
          {image && (
            <View style={{...Styles.imageView, ...imageView}}>
              <Image
                style={{...Styles.imageStyle, ...imageStyle}}
                source={image}
              />
            </View>
          )}

          <Text style={{...Styles.titleTextStyle, ...titleTextStyle}}>
            {title}
          </Text>

          <TouchableOpacity
            onPress={() => callHandler()}
            activeOpacity={0.8}>
            <Text style={{...Styles.paragraphTextStyle, ...paragraphTextStyle}}>
              {paragraph}:
              {number && (
                <Text style={{...Styles.contactStyle, ...contactStyle}}>
                  {' '}
                  {number}
                </Text>
              )}
            </Text>
          </TouchableOpacity>

          <View style={{...Styles.buttonView, ...buttonView}}>
            <ButtonComponent
              disabled={false}
              // pressStatus={btnPress}
              text={button?.btn2}
              btnStyle={{...Styles.btnStyleOne, ...btnStyleOne}}
              textStyle={{...Styles.btnTextStyleOne, ...btnTextStyleOne}}
              onPress={onClose}
            />

            <ButtonComponent
              disabled={false}
              // pressStatus={btnPress}
              text={button?.btn1}
              btnStyle={{...Styles.btnStyleTwo, ...btnStyleTwo}}
              textStyle={{...Styles.btnTextStyleTwo, ...btnTextStyleTwo}}
              onPress={onAccept}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const Styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: colorWhite,
    borderRadius: moderateScale(6),
    // padding: 35,
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(20),
  },
  imageStyle: {
    width: moderateScale(64),
    height: moderateScale(64),
  },
  titleTextStyle: {
    fontFamily: latoRegular,
    fontSize: scale(20),
    marginTop: moderateScale(5),
    textAlign: 'center',
  },
  paragraphTextStyle: {
    fontFamily: latoRegular,
    fontSize: scale(12),
    marginTop: moderateScale(8),
  },
  contactStyle: {
    fontFamily: latoRegular,
    fontSize: scale(12),
    color: color207DFD,
  },
  buttonView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: moderateVerticalScale(20),
  },
  btnStyleOne: {
    width: '45%',
    height: moderateScale(45),
    backgroundColor: colorWhite,
    borderWidth: moderateScale(1.5),
    borderRadius: moderateScale(4),
    borderColor: color4E008A,
  },
  btnTextStyleOne: {
    // This will remove after testing
    // fontSize: i18n?.language === 'urdu' ? scale(32) : scale(20),
    // fontFamily: i18n?.language === 'urdu' ? jameelNooriNastaleeq : latoRegular,
    // bottom: i18n?.language === 'urdu' ? moderateVerticalScale(5) : moderateVerticalScale(0),
    textAlign: 'center',
    color: color4E008A,
  },
  btnStyleTwo: {
    width: '45%',
    height: moderateScale(45),
    borderRadius: moderateScale(4),
  },
  btnTextStyleTwo: {
    // This will remove after testing
    // fontSize: i18n?.language === 'urdu' ? scale(32) : scale(20),
    // fontFamily: i18n?.language === 'urdu' ? jameelNooriNastaleeq : latoRegular,
    //bottom: i18n?.language === 'urdu' ? moderateVerticalScale(5) : moderateVerticalScale(0)
    textAlign: 'center',
  },
});
