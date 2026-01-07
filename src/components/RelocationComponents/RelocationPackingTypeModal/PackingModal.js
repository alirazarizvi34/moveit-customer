import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import BottomModal from '../../Modal/BottomModal';
import {colorTheme} from '../../../constants/ColorConstants';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../../../shared/theme';

const {drawerPinkBackground, primaryText,darkGrayText} = colorTheme;
const {latoHeavy,latoRegular} = THEME.fonts;
const PackingModal = ({visible, onClose, packingTypes}) => {
  return (
    <BottomModal
      draggable
      onClose={onClose}
      onModalClose={onClose}
      visible={visible}>
      <View style={styles.container}>
        {Array.isArray(packingTypes) &&
          packingTypes.map((type, index) => (
            <View key={index}>
              <View style={styles.headingContainer}>
                <Image style={styles.icon} source={type.Icon} />
                <Text style={styles.heading}>{type.heading}</Text>
              </View>
              <Text style={styles.description}>{type.description}</Text>
            </View>
          ))}
      </View>
    </BottomModal>
  );
};

export default PackingModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: drawerPinkBackground,
    borderTopLeftRadius: moderateScale(28),
    borderTopRightRadius: moderateScale(28),
    paddingVertical: moderateVerticalScale(28),
    paddingHorizontal: moderateScale(26),
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateVerticalScale(6),
  },
  icon: {
    height: moderateScale(26),
    width: moderateScale(26),
  },
  heading: {
    fontFamily: latoHeavy,
    fontSize: scale(18),
    marginLeft: moderateScale(10),
    color: primaryText,
    letterSpacing:0.3

  },
  description:{
    fontSize:scale(12),
    color:darkGrayText,
    fontFamily:latoRegular,
    letterSpacing:0.3,
    marginBottom:moderateVerticalScale(12)
  }
});
