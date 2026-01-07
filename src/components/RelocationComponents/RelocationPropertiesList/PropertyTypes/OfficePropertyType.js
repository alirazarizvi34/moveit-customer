import React, {useState,useRef,useEffect} from 'react';
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
import InputTextComponent from '../../../inputTextComp';
import {colorTheme} from '../../../../constants/ColorConstants';

const {
  defaultText,
  darkGrayText,
  defaultBorder,
  lightGrayBackground,
  primaryBackground,
  whiteText,
} = colorTheme;
const {latoSemiBold, latoBold, latoHeavy} = THEME.fonts;

export default OfficePropertyType = ({
  cargoLiftButtonsHandler,
  cargoAvailable,
  floor_no,
  decrement,
  increment,
  handleArea,
  setEnable,
  areaValue
}) => {
  const {t, i18n} = useTranslation();
  const styles = getStyles(i18n.language);
  const area = useRef(null);

  const officeCargo = [
    {
      title: 'Yes',
    },
    {
      title: 'No',
    },
  ];


  useEffect(()=> {
    if(cargoAvailable && areaValue){
      setEnable(true);
    }
  },[cargoAvailable,areaValue]);

  return (
    <React.Fragment>
      <View style={styles.areaView}>
        <Text style={styles.areaText}>Area (Sqft)</Text>

        <InputTextComponent
          bgColor={lightGrayBackground}
          width={122}
          height={34}
          borderRadius={6}
          maxLength={11}
          keyboardType="numeric"
          onChangeText={text => handleArea(text)}
          value={areaValue}
        />
      </View>

      <View style={styles.cargoLiftView}>
        <Text style={styles.cargoLiftText}>Cargo Lift Available</Text>

        <View style={styles.cargoLiftBtnView}>
          {officeCargo.map((item, index) => {
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

        {cargoAvailable == 'No' && 
          <View style={styles.floorView}>
        <Text style={styles.floorText}>What is your floor number?</Text>
        <ItemCounter
          count={floor_no}
          onDecreaseCount={decrement}
          onIncreaseCount={increment}
        />
      </View>
        }
      
    </React.Fragment>
  );
};

const getStyles = language =>
  StyleSheet.create({
    areaView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: moderateVerticalScale(20),
      alignItems: 'center',
    },
    areaText: {
      fontSize: scale(12),
      fontFamily: latoBold,
      textAlign: 'center',
      color: defaultText,
    },
    cargoLiftText: {
      fontSize: scale(12),
      fontFamily: latoBold,
      textAlign: 'center',
      color: defaultText,
    },
    cargoLiftView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: moderateVerticalScale(20),
      alignItems: 'center',
    },
    cargoLiftBtnView: {
      flexDirection: 'row',
      gap: 6,
    },
    slectedCargoBtnStyle: {
      backgroundColor: primaryBackground,
      width: moderateScale(64),
      height: moderateScale(27),
      borderRadius: moderateScale(17),
    },
    selectedCargoBtnText: {
      fontSize: scale(12),
      fontFamily: latoHeavy,
      textAlign: 'center',
      color: whiteText,
    },
    cargoBtnStyle: {
      backgroundColor: lightGrayBackground,
      width: moderateScale(64),
      height: moderateScale(27),
      borderRadius: moderateScale(17),
    },
    cargoBtnText: {
      fontSize: scale(12),
      fontFamily: latoBold,
      textAlign: 'center',
      color: defaultText,
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
