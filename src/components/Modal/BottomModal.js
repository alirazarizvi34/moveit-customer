import {
  View,
  ScrollView,
  Text,
  Modal,
  Image,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import {AppImages} from '../../constants/AppImages';
import {Modalize} from 'react-native-modalize';
import {colorTheme} from '../../constants/ColorConstants';

const {colorWhite, color000000AA, color8D5AAD} = THEME.colors;

const {lightPurpleBackground, drawerPinkBackground} = colorTheme;

const deviceHeight = Dimensions.get('window').height;

const BottomModal = ({
  children,
  visible,
  onModalClose,
  small,
  draggable,
  onClose,
  onPress,
  type,
}) => {
  const {i18n} = useTranslation();
  const styles = getStyles(i18n.language, small, type);
  const modalRef = useRef(null);

  useEffect(() => {
    if (visible) {
      modalRef?.current?.open();
    }
    return () => {
      modalRef.current = null;
    };
  }, [visible]);
  return (
    <React.Fragment>
      {draggable ? (
        <Modalize
          ref={modalRef}
          onOpen={onPress}
          onClose={onClose}
          adjustToContentHeight={true}
          keyboardAvoidingBehavior="positin"
          modalStyle={{borderTopRightRadius: 28, borderTopLeftRadius: 28}}
          overlayStyle={styles.modalOverlayStyle}
          handleStyle={styles.modalHandleStyle}>
          <KeyboardAvoidingView behavior="height" style={styles.modalContent}>
            {children}
          </KeyboardAvoidingView>
        </Modalize>
      ) : (
        <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
          onRequestClose={onModalClose}
          style={styles.modal}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{flex: 1}}>
            <View style={styles.modalView}>
              <View style={styles.modalSubView}>
              <View style={styles.lineContainer}>
                        {/* <Image style={styles.horizontalLine} source={AppImages.HorizontalLineNew} /> */}
                    </View>
                <ScrollView>{children}</ScrollView>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default BottomModal;

const getStyles = (language, small, type) =>
  StyleSheet.create({
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalView: {
      flex: 1,
      height: small ? deviceHeight * 0.4 : deviceHeight * 0.5,
      backgroundColor: type == 'dark' ? 'red' : color000000AA,
      justifyContent: 'flex-end',
    },
    modalSubView: {
      backgroundColor: type == 'pink' ? drawerPinkBackground : colorWhite,
      width: '100%',
      height: small ? deviceHeight * 0.4 : deviceHeight * 0.5,
      borderTopRightRadius: moderateScale(28),
      borderTopLeftRadius: moderateScale(28),
    },
    horizontalLine: {
      height: moderateScale(4),
      width: moderateScale(32),
    },
    lineContainer: {
      width: '100%',
      marginVertical: moderateVerticalScale(16),
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    modalOverlayStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalHandleStyle: {
      backgroundColor: color8D5AAD,
      height: moderateVerticalScale(4),
      width: moderateScale(32),
      marginTop: moderateVerticalScale(25),
    },
  });
