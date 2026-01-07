import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import BottomModal from '../Modal/BottomModal';
import {moderateScale, scale} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import InputText from '../InputText';
import ButtonComponent from '../buttonComp/ButtonComponent';
import {useTranslation} from 'react-i18next';
import {AppImages} from '../../constants/AppImages';
import {AppConstants} from '../../constants/AppConstants';
import InputTextComponent from '../inputTextComp';
import {Form, Formik, useFormik} from 'formik';
import * as Yup from 'yup';
import {colorTheme} from '../../constants/ColorConstants';
import useCommonFunction from '../../hooks/useCommonFunction';

const AddCoverageModal = ({
  visible,
  onClose,
  protectionCharges,
  onAddCoverage,
  loadingState,
  currentCoverageValue,
}) => {
  const {t} = useTranslation();
  const {percentage} = useCommonFunction();
  const [coverage, setCoverage] = useState(4_050_000);
  const [percentAmount, setPercentAmount] = useState(
    percentage(protectionCharges, 4_050_000),
  );

  const initialValues = {
    coverage: currentCoverageValue > 0 ? currentCoverageValue : 4050000, // Default value
  };

  const onSubmit = (values, {setFieldError}) => {
    onAddCoverage(values);
  };

  const validationSchema = Yup.object().shape({
    coverage: Yup.number()
      .min(100, 'Coverage must be at least 100')
      .max(999_999_999_9, 'Coverage must be at max 9,999,999,999')
      .required('Coverage is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const {values, errors, handleChange, handleSubmit} = formik;

  const onCoverageChangeHandler = coverageText => {
    const coveragePercent = percentage(protectionCharges, coverageText);
    handleChange('coverage')(coverageText);
    setPercentAmount(coveragePercent);
  };
  return (
    <BottomModal
      draggable
      visible={visible}
      onClose={onClose}
      onModalClose={onClose}>
      <View style={styles.container}>
        <View style={styles.closeContainer}>
          <TouchableOpacity
            activeOpacity={AppConstants.buttonActiveOpacity}
            onPress={onClose}>
            <Image source={AppImages.crossBtn} style={styles.crossBtn} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputHeadingsContainer}>
          <Text style={styles.addCoverageHeading}>{t('addCoverage')}</Text>
          <Text style={styles.addCoverageDescription}>
            {t('howManyCoverage')}
          </Text>
          <View style={styles.inputContainer}>
            <InputTextComponent
              hasBorder
              style={styles.input}
              value={`${values.coverage}`}
              defaultValue={`${values.coverage}`}
              onChangeText={onCoverageChangeHandler}
              keyboardType="decimal-pad"
            />
            {errors.coverage && (
              <Text style={styles.errorText}>{errors.coverage}</Text>
            )}

            {!isNaN(percentAmount) && percentAmount > 1 && (
              <Text style={styles.addText}>
                +PKR {percentAmount.toLocaleString('en-US')}
              </Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <ButtonComponent
              pressStatus={loadingState}
              onPress={handleSubmit}
              btnStyle={styles.btn}
              disabled={false}
              text={t('add')}
            />
          </View>
        </View>
      </View>
    </BottomModal>
  );
};

export default AddCoverageModal;

const {latoHeavy, latoMedium} = THEME.fonts;

const {defaultText, primaryText, errorText,drawerPinkBackground} = colorTheme;

const styles = StyleSheet.create({
  container: {
    paddingVertical: moderateScale(15),
    backgroundColor:drawerPinkBackground,
    borderTopRightRadius: moderateScale(28),
    borderTopLeftRadius: moderateScale(28),
  },
  errorText: {
    color: errorText,
    fontFamily: latoMedium,
    fontSize: scale(10),
    paddingVertical: moderateScale(5),
  },
  closeContainer: {
    paddingHorizontal: moderateScale(20),
    top: 10,
    alignItems: 'flex-end',
  },
  crossBtn: {
    height: moderateScale(24),
    width: moderateScale(24),
  },
  inputHeadingsContainer: {
    paddingHorizontal: moderateScale(22),
    paddingVertical: moderateScale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    // marginTop: moderateScale(12),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: moderateScale(150),
    marginTop: moderateScale(20),
  },
  addText: {
    fontSize: scale(15),
    color: primaryText,
    fontFamily: latoHeavy,
    textAlign: 'right',
    marginTop: moderateScale(8),
  },
  input: {
    height: moderateScale(32),
    borderRadius: moderateScale(6),
    fontSize: scale(10),
    width: moderateScale(140),
    fontFamily: latoMedium,
    // backgroundColor:"red",
    padding: 0,
  },
  addCoverageHeading: {
    fontSize: scale(18),
    color: defaultText,
    fontFamily: latoHeavy,
    textAlign: 'center',
  },
  addCoverageDescription: {
    marginTop: moderateScale(18),
    fontSize: scale(12),
    fontFamily: latoMedium,
    color: defaultText,
    textAlign: 'center',
  },
  btn: {
    width: moderateScale(150),
    borderRadius: moderateScale(50),
  },
});
