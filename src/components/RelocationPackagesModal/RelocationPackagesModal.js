import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {memo} from 'react';
import {moderateScale, scale} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import {AppConstants} from '../../constants/AppConstants';

const RelocationPackagesModal = ({visible, onClose, onPackagePress}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
      style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.contentContainer}>
          <ScrollView>
            {AppConstants.packageType.map((_package, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onPackagePress(_package.label)}
                activeOpacity={AppConstants.buttonActiveOpacity}
                style={styles.packageContainer}>
                <Text style={styles.label}>{_package.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default memo(RelocationPackagesModal);

const {colorWhite, colorE8E8E8, color626262} = THEME.colors;
const {latoRegular} = THEME.fonts;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: moderateScale(30),
  },
  contentContainer: {
    // paddingVertical: moderateScale(3),
    borderWidth: 1,
    borderColor: colorE8E8E8,
    // height: moderateScale(150),
    borderRadius: moderateScale(6),
    backgroundColor: colorWhite,
    width: '100%',
  },
  label: {
    color: color626262,
    fontSize: scale(12),
    fontFamily: latoRegular,
  },
  packageContainer: {
    paddingHorizontal: moderateScale(22),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(6),

    borderBottomWidth: 1,
    borderColor: colorE8E8E8,
  },
});
