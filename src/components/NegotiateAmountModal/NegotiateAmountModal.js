import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useContext} from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {AppImages} from '../../constants/AppImages';
import ButtonComponent from '../buttonComp/ButtonComponent';
import {THEME} from '../../shared/theme';
import {useTranslation} from 'react-i18next';
import {colorTheme} from '../../constants/ColorConstants';
import {GlobalContext} from '../../../context/GlobalState';

const NegotiateAmountModal = ({visible, onModalClose, onClosePress,data}) => {
  const {auth, bootMeUpData, relocationRequest} = useContext(GlobalContext);

  const {invoice} = data;

  const {t} = useTranslation();

  const openWhastappHandler = () => {
    const name = auth?.name;
    const phone = auth?.phone;

    const additionalCost = invoice?.additional_cost;
    const assemblingCost = invoice?.assembling_cost;
    const discountType = invoice?.discount_type;
    const discountAmount = invoice?.discounted_amount;
    const labourCost = invoice?.labour_cost;
    const packageCost = invoice?.package_cost;
    const protectionCost = invoice?.protection_cost;
    const serviceCost = invoice?.service_cost;
    const Tax = invoice?.tax;
    const totalAmount = invoice?.total_amount;
    const transportCost = invoice?.transport_cost;

    const message = `*Name*: ${name} \n*Phone Number*: ${phone} \n*Additional Cost*: ${
      additionalCost ?? 0
    } \n*Assembling Cost*: ${assemblingCost ?? 0} \n*Discount*: ${
      discountAmount ?? 0
    } \n*Labour Cost*: ${labourCost ?? 0} \n*Package Cost*: ${
      packageCost ?? 0
    } \n*Protection Cost:* ${packageCost ?? 0} \n*Service Cost:* ${
      serviceCost ?? 0
    } \n*Protection Cost:* ${protectionCost ?? 0} \n*Tax:* ${
      Tax ?? 0
    } \n*Total Amount:* ${totalAmount ?? 0} \n*Transport Cost:* ${
      transportCost ?? 0
    }`;
    const supportNo = bootMeUpData?.support_no;
    Linking.openURL(`whatsapp://send?text=${message}&phone=${supportNo}`);
    // const
  };
  return (
    <Modal
      transparent
      style={styles.modalContainer}
      visible={visible}
      onRequestClose={onModalClose}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.crossContainer}>
            <TouchableOpacity onPress={onModalClose}>
              <Image source={AppImages.crossBtn} style={styles.crossIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={AppImages.sadEmoji}
              resizeMode="contain"
              style={styles.chatContainer}
            />
          </View>
          <View style={styles.headingsContainer}>
            <Text style={styles.heading}>{t('sorryToSeeyougo')}</Text>
            <Text style={styles.description}>{t('letsTalk')}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <ButtonComponent
              onPress={onClosePress}
              disabled={false}
              textStyle={styles.cancelTxt}
              text={t('cancelAnyway')}
              btnStyle={styles.cancelBtn}
            />
            <ButtonComponent
              onPress={openWhastappHandler}
              textStyle={styles.chatTxt}
              disabled={false}
              text={t('chatWithMoveit')}
              btnStyle={styles.chatBtn}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NegotiateAmountModal;

const {latoSemiBold, latoRegular, latoBold, latoHeavy} = THEME.fonts;
const {
  defaultBackground,
  primaryBorder,
  primaryText,
  defaultText,
  whiteText,
  secondaryBackground,
  drawerPinkBackground,
  primaryBackground,
} = colorTheme;

const styles = StyleSheet.create({
  modalContainer: {flex: 1},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  innerContainer: {
    backgroundColor: drawerPinkBackground,
    borderWidth: 3,
    borderColor: primaryBorder,
    borderRadius: moderateScale(8),
    height: moderateScale(281),
    width: moderateScale(321),
    // paddingHorizontal: moderateScale(12),
    // paddingVertical: moderateScale(30),
  },
  headingsContainer: {
    paddingHorizontal: moderateScale(60),
  },
  crossContainer: {
    paddingHorizontal: moderateScale(10),
    marginTop: moderateVerticalScale(14),
    alignItems: 'flex-end',
  },
  crossIcon: {
    height: moderateScale(24),
    width: moderateScale(24),
  },
  chatContainer: {
    height: moderateScale(50),
    width: moderateScale(50),
    alignSelf: 'center',
  },
  heading: {
    fontSize: scale(20),
    fontFamily: latoHeavy,
    color: primaryText,
    textAlign: 'center',
    // marginTop: moderateScale(10),
    paddingVertical: moderateScale(12),
  },
  description: {
    fontFamily: latoRegular,
    color: primaryText,
    fontSize: scale(15),
    textAlign: 'center',
  },
  buttonContainer: {
    paddingVertical: moderateVerticalScale(16),
    paddingHorizontal: moderateScale(22),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: moderateVerticalScale(20),
    gap: 10,
  },
  chatBtn: {
    borderRadius: moderateScale(50),
    width: moderateScale(129),
    height: moderateScale(40),
    backgroundColor: primaryBackground,
  },
  cancelBtn: {
    borderWidth: 1,
    backgroundColor: drawerPinkBackground,
    width: moderateScale(116),
    borderRadius: moderateScale(100),
    height: moderateScale(40),

    borderColor: primaryBorder,
  },
  cancelTxt: {
    fontSize: scale(11),
    color: primaryText,
    fontFamily: latoBold,
  },
  chatTxt: {
    fontSize: scale(11),
    color: whiteText,
    fontFamily: latoHeavy,
  },
});
