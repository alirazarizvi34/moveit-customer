import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import DropDownPickerComponent from '../../../DropDownPicker/DropDownPickerComponent';
import {THEME} from '../../../../shared/theme';
import ItemCounter from '../../../ItemCounter/ItemCounter';
import ButtonComponent from '../../../buttonComp';
import {colorTheme} from '../../../../constants/ColorConstants';
import {GlobalContext} from '../../../../../context/GlobalState';

const {defaultText, primaryBackground,secondaryBackground, lightPurpleBackground, whiteText, primaryText} =
  colorTheme;
const {latoBold, latoHeavy} = THEME.fonts;

const apartmentCargo = [
  {
    title: 'Yes',
  },
  {
    title: 'No',
  },
];

export default ApartmentPropertyType = ({
  cargoAvailable,
  cargoLiftButtonsHandler,
  decrement,
  increment,
  floor_no,
  onChangeValue,
  selectedApartmentSize,
  setEnable,
  onOpenHandler,
  apartmentSize = true,
}) => {
  const {p_prop_details} = useContext(GlobalContext);
  const {t, i18n} = useTranslation();
  const styles = getStyles(i18n.language);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(
    selectedApartmentSize ? selectedApartmentSize : null,
  );
  const [FloorNo, setFloorNo] = useState(1);
  const [items, setItems] = useState([
    {
      label: '1 Bed room Apartment -- 500 - 700 sq ft.',
      value: '1 Bed room Apartment -- 500 - 700 sq ft.',
    },
    {
      label: '2 Bed room Apartment -- 800 - 1200 sq ft.',
      value: '2 Bed room Apartment -- 800 - 1200 sq ft.',
    },
    {
      label: '3 Bed room Apartment -- 1000 - 1400 sq ft.',
      value: '3 Bed room Apartment -- 1000 - 1400 sq ft.',
    },
    {
      label: '4 Bed room Apartment -- 1200 - 1600 sq ft.',
      value: '4 Bed room Apartment -- 1200 - 1600 sq ft.',
    },
    {
      label: 'Penthouse -- 1200 - 2000 sq ft.',
      value: 'Penthouse -- 1200 - 2000 sq ft.',
    },
  ]);

  useEffect(() => {
    if(apartmentSize){
      if (selectedApartmentSize && cargoAvailable) {
        setEnable(true);
      }
    }else{
      if(cargoAvailable){
        setEnable(true);
      }
    }
  }, [selectedApartmentSize, cargoAvailable,apartmentSize]);

  return (
    <React.Fragment>

      {apartmentSize && 
      <DropDownPickerComponent
        value={value}
        setValue={setValue}
        setOpen={val => {
          onOpenHandler();
          setOpen(val);
        }}
        setItems={setItems}
        onChangeValue={onChangeValue}
        items={items}
        open={open}
        placeholder={'What is the size of your appartment?'}
      />
      }

      <View style={styles.cargoLiftView}>
        <Text style={styles.cargoLiftText}>Cargo Lift Available</Text>
        <View style={styles.cargoLiftBtnView}>
          {apartmentCargo.map((item, index) => {
            return (
              <ButtonComponent
                key={index}
                disabled={false}
                pressStatus={false}
                text={t(item?.title)}
                btnStyle={
                  cargoAvailable == item?.title
                    ? styles.slectedCargoBtnStyle
                    : styles.cargoBtnStyle
                }
                textStyle={
                  cargoAvailable == item?.title
                    ? styles.selectedCargoBtnText
                    : styles.cargoBtnText
                }
                onPress={() => cargoLiftButtonsHandler(item?.title)}
              />
            );
          })}
        </View>
      </View>

      {cargoAvailable == 'No' && (
        <View style={styles.floorView}>
          <Text style={styles.floorText}>What is your floor number?</Text>
          <ItemCounter
            count={floor_no}
            onDecreaseCount={decrement}
            onIncreaseCount={increment}
          />
        </View>
      )}
    </React.Fragment>
  );
};

const getStyles = language =>
  StyleSheet.create({
    cargoLiftView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: moderateVerticalScale(20),
      alignItems: 'center',
    },
    cargoLiftText: {
      fontSize: scale(12),
      fontFamily: latoBold,
      textAlign: 'center',
      color: defaultText,
    },
    cargoLiftBtnView: {
      flexDirection: 'row',
      gap: 6,
    },
    slectedCargoBtnStyle: {
      backgroundColor: secondaryBackground,
      width: moderateScale(64),
      height: moderateScale(27),
      borderRadius: moderateScale(17),
    },
    cargoBtnStyle: {
      backgroundColor: lightPurpleBackground,
      width: moderateScale(64),
      height: moderateScale(27),
      borderRadius: moderateScale(17),
    },
    selectedCargoBtnText: {
      fontSize: scale(12),
      fontFamily: latoHeavy,
      textAlign: 'center',
      color: primaryText,
    },
    cargoBtnText: {
      fontSize: scale(12),
      fontFamily: latoBold,
      textAlign: 'center',
      color: primaryText,
    },
    floorView: {
      flexDirection: 'row',
      marginTop: moderateVerticalScale(20),
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    floorText: {
      fontSize: scale(12),
      fontFamily: latoBold,
      textAlign: 'center',
      color: defaultText,
    },
  });
