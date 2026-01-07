import React, {memo, useContext, useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import DropDownPickerComponent from '../../../DropDownPicker/DropDownPickerComponent';
import {THEME} from '../../../../shared/theme';
import ButtonComponent from '../../../buttonComp';
import {colorTheme} from '../../../../constants/ColorConstants';
import {GlobalContext} from '../../../../../context/GlobalState';

const {
  primaryText,
  lightGrayBackground,
  secondaryBackground,
  placeholderText,
} = colorTheme;
const {latoHeavy, latoBold} = THEME.fonts;

const HousePropertyType = ({
  handleHouseType,
  selectedHouseType,
  roomsCount,
  decrement,
  increment,
  onChangeValue,
  selectedHouseSize,
  setEnable,
  onOpenHandler,
}) => {
  const {p_prop_details} = useContext(GlobalContext);
  const {t, i18n} = useTranslation();
  const styles = getStyles(i18n.language);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(
    selectedHouseSize ? selectedHouseSize : null,
  );
  const [items, setItems] = useState([
    {label: '3 Marla House', value: '3 Marla House'},
    {label: '5 Marla House', value: '5 Marla House'},
    {label: '7 Marla House', value: '7 Marla House'},
    {label: '10 Marla House', value: '10 Marla House'},
    {label: '1 Kanal & More', value: '1 Kanal & More'},
  ]);

  const houseType = [
    {
      title: 'Full House',
    },
    {
      title: 'Portion',
    },
  ];

  useEffect(() => {
    if (selectedHouseType && selectedHouseSize) {
      setEnable(true);
    }
  }, [selectedHouseType, selectedHouseSize]);

  return (
    <React.Fragment>
      <View style={styles.buttonView}>
        {houseType.map((item, index) => {
          return (
            <ButtonComponent
              key={index}
              disabled={false}
              pressStatus={false}
              text={t(item?.title)}
              btnStyle={
                selectedHouseType == item?.title
                  ? styles.selectedHouseTypeBtn
                  : styles.houseTypeBtnStyle
              }
              textStyle={
                selectedHouseType == item?.title
                  ? styles.selectedBtnText
                  : styles.housebtnTextStyle
              }
              onPress={() => handleHouseType(item?.title)}
            />
          );
        })}
      </View>

      <DropDownPickerComponent
        value={value}
        setValue={setValue}
        setOpen={val => {
          setOpen(val);
          onOpenHandler();
        }}
        setItems={setItems}
        onChangeValue={onChangeValue}
        items={items}
        open={open}
        placeholder={'What is the size of your house?'}
      />
    </React.Fragment>
  );
};

export default memo(HousePropertyType);

const getStyles = language =>
  StyleSheet.create({
    buttonView: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginTop: moderateVerticalScale(5),
      marginBottom: moderateVerticalScale(20),
    },
    houseTypeBtnStyle: {
      backgroundColor: lightGrayBackground,
      width: moderateScale(100),
      height: moderateScale(34),
      borderRadius: moderateScale(8),
    },
    housebtnTextStyle: {
      fontSize: scale(12),
      fontFamily: latoBold,
      textAlign: 'center',
      color: placeholderText,
    },
    selectedHouseTypeBtn: {
      backgroundColor: secondaryBackground,
      width: moderateScale(100),
      height: moderateScale(34),
      borderRadius: moderateScale(8),
    },
    selectedBtnText: {
      fontSize: scale(12),
      fontFamily: latoHeavy,
      textAlign: 'center',
      color: primaryText,
    },
  });
