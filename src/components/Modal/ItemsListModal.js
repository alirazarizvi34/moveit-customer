import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';

import BottomModal from './BottomModal';
import {AppImages} from '../../constants/AppImages';
import ButtonComponent from '../buttonComp/ButtonComponent';
import {colorTheme} from '../../constants/ColorConstants';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import CustomCheckBox from '../CustomCheckBox/CustomCheckBox';
import {GlobalContext} from '../../../context/GlobalState';
import {AppConstants} from '../../constants/AppConstants';

const deviceHeight = Dimensions.get('window').height;
const {latoSemiBold, latoBold, latoMedium} = THEME.fonts;
const {
  defaultText,
  defaultBackground,
  lightGrayBorder,
  primaryText,
  placeholderText,
  lightPurpleBackground,
  drawerPinkBackground,
  darkGrayBorder,
  defaultBorder,
} = colorTheme;

const ItemsListModal = ({
  visible,
  onClose,
  onPressItem,
  onPress,
  acceptPress,
  title,
  titleColor,
  loader,
  loadingState,
  items,
}) => {
  const {
    auth,
    relocationRequest,
    setRelocationRequest,
    shouldCallRelocationRequest,
    setShouldCallRelocationRequest,
    selectedRelocationItems,
    setSelectedRelocationItems,
    isUpdateItemsApiCall,
    setUpdateItemsApiCall,
    hasModalOpened,
  } = useContext(GlobalContext);
  const {i18n, t} = useTranslation();

  const styles = getStyles(i18n.language, titleColor);

  const isPackingRequiredSame = (items, selectedRelocationItems) => {
    // Ensure both arrays are of the same length
    if (items.length !== selectedRelocationItems.length) return false;

    // Compare each item's `is_packing_required` in both arrays
    return items.every(
      (item, index) =>
        item?.is_packing_required ===
        selectedRelocationItems[index]?.is_packing_required,
    );
  };
  const buttonText = useMemo(() => {
    return isPackingRequiredSame(items, selectedRelocationItems) ? false : true;
  }, [items, selectedRelocationItems]);

  const apiHandler = () => {
    const checkk = isPackingRequiredSame(items, selectedRelocationItems)
      ? false
      : true;
    onPress(checkk);
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      style={styles.modalStyle}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <ScrollView>
            <View style={styles.itemListContainer}>
              {items &&
                items?.map((item, index) => (
                  <React.Fragment key={index}>
                    {item?.is_fragile === 0 && (
                      <View key={index} style={styles.itemsListView}>
                        <TouchableOpacity
                          style={{flexDirection: 'row'}}
                          activeOpacity={0.9}
                          onPress={() => {
                            onPressItem(item?.item_id, item?.item_cat_id);
                          }}>
                          <CustomCheckBox
                            isChecked={item?.is_packing_required ? true : false}
                          />
                          <View style={{gap: Platform.OS === 'ios' ? 2 : 0}}>
                            <Text style={styles.itemName}>
                              {item?.item_name}
                            </Text>
                            <Text style={styles.itemCategory}>
                              ({item?.item_cat_name})
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
                  </React.Fragment>
                ))}
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <ButtonComponent
              btnStyle={styles.btnStyle}
              textStyle={styles.btnText}
              disabled={false}
              pressStatus={loader}
              onPress={apiHandler}
              text={buttonText ? t('Continue') : t('Skip')}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ItemsListModal;

const getStyles = (language, titleColor) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: moderateScale(22),
      paddingTop: moderateVerticalScale(15),
      paddingBottom: moderateVerticalScale(30),
      flex: 1,
      height: moderateScale(428),
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      marginTop: moderateVerticalScale(15),
    },
    title: {
      color: titleColor ? titleColor : defaultText,
      fontSize: scale(12),
      fontFamily: latoMedium,
    },
    itemName: {
      fontSize: scale(11),
      fontFamily: latoBold,
      color: primaryText,
      lineHeight: 13,
    },
    itemCategory: {
      fontSize: scale(8),
      fontFamily: latoSemiBold,
      color: primaryText,
    },
    titleContainer: {
      marginTop: moderateVerticalScale(15),
      paddingBottom: moderateVerticalScale(10),
      marginRight: moderateScale(34),
    },
    itemListContainer: {
      marginTop: moderateVerticalScale(10),
      gap: 25,
      paddingVertical: moderateVerticalScale(5),
    },
    itemsListView: {
      flexDirection: 'row',
    },
    btnStyle: {
      borderRadius: moderateScale(10),
    },
    btnText: {
      fontSize: scale(18),
      fontFamily: latoSemiBold,
    },
    modalStyle: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: '#000000AA',
      justifyContent: 'flex-end',
    },
    modalView: {
      backgroundColor: defaultBackground,
      width: '100%',
      maxHeight: deviceHeight * 0.5,
      borderTopRightRadius: moderateScale(28),
      borderTopLeftRadius: moderateScale(28),
      paddingHorizontal: moderateScale(22),
      paddingTop: moderateVerticalScale(15),
      paddingBottom: moderateVerticalScale(30),
    },
  });
