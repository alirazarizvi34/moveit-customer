import {
  View,
  Text,
  ScrollView,
  Switch,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Platform,
  Modal,
  StyleSheet,
} from 'react-native';
import React, {useState, useContext, useCallback, useEffect} from 'react';
import {colorTheme} from '../../constants/ColorConstants';
import {THEME} from '../../shared/theme';
import {useTranslation} from 'react-i18next';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import ButtonComponent from '../buttonComp';
import ItemCounter from '../ItemCounter/ItemCounter';

const apartmentCargo = [
  {
    title: 'Yes',
  },
  {
    title: 'No',
  },
];

const {
  darkGrayBackgrounud,
  lightGrayBackground,
  primaryBackground,
  secondaryBackground,
  lightPurpleBackground,
  primaryText,
  whiteText,
} = colorTheme;

const {latoBold, latoHeavy, latoMedium} = THEME.fonts;

const TitleWithButton = ({
  title,
  onPress,
  counter,
  onIncreaseCount,
  onDecreaseCount,
  btnSelect,
}) => {
  const {t} = useTranslation();
  const styles = getStyles();

  return (
    <View style={{flex: 1}}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.cargoLiftBtnView}>
        {apartmentCargo.map((item, index) => {
          return (
            <ButtonComponent
              key={index}
              disabled={false}
              pressStatus={false}
              text={t(item?.title)}
              btnStyle={
                item?.title === btnSelect
                  ? styles.slectedBtnStyle
                  : styles.btnStyle
              }
              textStyle={
                item?.title === btnSelect
                  ? styles.selectedBtnText
                  : styles.btnText
              }
              onPress={() => onPress(item?.title)}
            />
          );
        })}

        {counter > 0 ? (
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <ItemCounter
              count={counter}
              onDecreaseCount={onDecreaseCount}
              onIncreaseCount={onIncreaseCount}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default TitleWithButton;

const getStyles = () =>
  StyleSheet.create({
    cargoLiftBtnView: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
      marginTop: moderateVerticalScale(15),
    },
    slectedBtnStyle: {
      backgroundColor: secondaryBackground,
      width: moderateScale(61),
      height: moderateScale(24),
      borderRadius: moderateScale(12),
    },
    title: {
      fontSize: scale(12),
      fontFamily: latoMedium,
    },

    btnStyle: {
      backgroundColor: lightPurpleBackground,
      width: moderateScale(61),
      height: moderateScale(24),
      borderRadius: moderateScale(12),
    },
    selectedBtnText: {
      fontSize: scale(10),
      fontFamily: latoHeavy,
      textAlign: 'center',
      color: primaryText,
    },
    btnText: {
      fontSize: scale(10),
      fontFamily: latoBold,
      textAlign: 'center',
      color: primaryText,
    },
  });
