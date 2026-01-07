import React, {useEffect, useContext} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../../../../shared/theme';
import { colorTheme } from '../../../../constants/ColorConstants';
import ButtonComponent from '../../../buttonComp/ButtonComponent';
import { GlobalContext } from '../../../../../context/GlobalState';

const {lightGrayBackground,placeholderText} = colorTheme;
const {latoSemiBold, latoBold} = THEME.fonts;

export default OtherPropertyType = ({discriptionRef,value,setEnable , handleOtherDiscription}) => {
  const {
    p_prop_details,
  } = useContext(GlobalContext);
  const {t, i18n} = useTranslation();
  const styles = getStyles(i18n.language);

  useEffect(()=> {
    if(value){
      setEnable(true);
    }
  },[value]);

  return (
    <React.Fragment>
        <TextInput
          ref={discriptionRef}
          placeholder={'Please add brief description of the type of property you want to make the move from e.g warehouse, store, office, dorm room etc'}
          placeholderTextColor={placeholderText}
          multiline={true}
          numberOfLines={10}
          value={value}
          // defaultValue={value}
          onChangeText={text => handleOtherDiscription(text)}
          // onChangeText={text => (discriptionRef.current.value = text)}
          style={styles.otherTextInput}
        />
    </React.Fragment>
  );
};

const getStyles = language =>
  StyleSheet.create({
      otherTextInput: {
        height: moderateScale(135),
        textAlignVertical: 'top',
        backgroundColor:lightGrayBackground,
        borderRadius: 8,
        paddingBottom: moderateVerticalScale(0),
        paddingTop: moderateVerticalScale(10),
        paddingHorizontal: moderateScale(19),
      },
  });
