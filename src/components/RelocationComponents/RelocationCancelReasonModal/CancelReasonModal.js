import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {colorTheme} from '../../../constants/ColorConstants';
import {GlobalContext} from '../../../../context/GlobalState';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {useTranslation} from 'react-i18next';
import {THEME} from '../../../shared/theme';
import ButtonComponent from '../../buttonComp';
import {AppImages} from '../../../constants/AppImages';

const CancelReasonModal = ({visible, onSubmitPress, onClose, loadingState}) => {
  const {t} = useTranslation();
  const {bootMeUpData} = useContext(GlobalContext);

  const [selectedReason, setSelectedReason] = useState(-1);
  const cancelReasons = bootMeUpData?.relocation_cancellation_reasons ?? [];
  return (
    <Modal
      transparent
      style={styles.modalContainer}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.crossContainer}>
            <TouchableOpacity onPress={onClose}>
              <Image source={AppImages.crossBtn} style={styles.crossIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.scrollContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.headingContainer}>
                <Text style={styles.heading}>{t('chooseCancelReason')}</Text>
              </View>

              <View style={styles.cancelReasonsContainer}>
                {cancelReasons.map((reason, index) => (
                  <TouchableOpacity
                    onPress={() => setSelectedReason(index)}
                    style={styles.reasonContainer}
                    activeOpacity={1}
                    key={index}>
                    <View
                      style={
                        index == selectedReason
                          ? styles.selected
                          : styles.unselected
                      }>
                      {index == selectedReason && (
                        <View style={styles.selectedView} />
                      )}
                    </View>
                    <Text style={styles.reasonText}>{reason}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.buttonContainer}>
                <ButtonComponent
                  pressStatus={loadingState}
                  disabled={selectedReason !== -1 ? false : true}
                  text={t('submit')}
                  onPress={() => onSubmitPress(selectedReason)}
                  btnStyle={
                    selectedReason !== -1
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

export default CancelReasonModal;

const {
  drawerPinkBackground,
  primaryBorder,
  primaryText,
  darkBlackBorder,
  primaryBackground,
  defaultBorder,
  disableBackground,
} = colorTheme;
const {latoHeavy, latoRegular} = THEME.fonts;

const styles = StyleSheet.create({
  modalContainer: {flex: 1},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  reasonContainer: {
    flexDirection: 'row',
    gap: 8,
    // backgroundColor:"red",
    // flex:1,
    marginVertical: moderateScale(12),
    alignItems: 'center',
  },
  disabledBtn: {
    width: moderateScale(112),
    height: moderateScale(40),
    borderRadius: moderateScale(40),
    backgroundColor: disableBackground,
  },

  unselected: {
    height: moderateScale(18),
    width: moderateScale(18),
    borderWidth: 2,
    borderColor: defaultBorder,
    borderRadius: moderateScale(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    height: moderateScale(18),
    width: moderateScale(18),
    borderWidth: 2.5,
    borderColor: primaryBorder,
    borderRadius: moderateScale(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedView: {
    height: moderateScale(8),
    width: moderateScale(8),
    borderRadius: moderateScale(8),
    backgroundColor: primaryBackground,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    backgroundColor: drawerPinkBackground,
    borderWidth: 3,
    borderColor: primaryBorder,
    borderRadius: moderateScale(8),
    // paddingVertical: moderateVerticalScale(26),
    // paddingHorizontal: moderateScale(36),
    height: moderateScale(430),
    width: moderateScale(321),
  },
  scrollContainer: {
    paddingVertical: moderateVerticalScale(10),
    paddingHorizontal: moderateScale(36),
  },
  heading: {
    fontSize: scale(18),
    textAlign: 'center',
    color: primaryText,
    fontFamily: latoHeavy,
    letterSpacing: 0.5,
  },
  cancelReasonsContainer: {
    paddingVertical: moderateVerticalScale(27),
  },
  submitBtn: {
    width: moderateScale(112),
    height: moderateScale(40),
    borderRadius: moderateScale(40),
  },
  btnText: {
    fontSize: scale(11),
    alignSelf: 'center',
  },
  reasonText: {
    fontSize: scale(12),
    flex: 1,
    // marginLeft: moderateScale(13),
    fontFamily: latoRegular,
    letterSpacing: 0.3,
  },
  crossContainer: {
    paddingHorizontal: moderateScale(10),

    marginTop: moderateVerticalScale(14),
    alignItems: 'flex-end',
  },
  crossIcon: {
    height: moderateScale(24),
    width: moderateScale(24),

    // tintColor:"red"
  },
});
