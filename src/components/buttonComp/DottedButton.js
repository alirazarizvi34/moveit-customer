import React from 'react';
import {TouchableOpacity,View,Image,Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {AppImages} from '../../constants/AppImages';
import { getStyles } from './DottedButtonStyle';

const DottedButton = ({
  text,
  disabled = true,
  icon,
 
  pressStatus,
  onPress = () => {},
}) => {
  const {t, i18n} = useTranslation();
  const styles = getStyles(i18n.language);
  return (
    <TouchableOpacity
      disabled={disabled || pressStatus}
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.9}>
      <View style={styles.btnView}>
        <Image source={AppImages.plus} style={styles.btnImage} />
        {text&&<Text style={styles.iconText}>{text}</Text>}
      </View>
    </TouchableOpacity>
  );
};
export default DottedButton;
