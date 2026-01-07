import {View, Text} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';

import BottomModal from './BottomModal';
import {getStyles} from './ScheduleCancelReasonModalStyles';
import ButtonComponent from '../buttonComp/ButtonComponent';
import {colorTheme} from '../../constants/ColorConstants';
import MultiLineInput from '../MultiLineInput/MultiLineInput';

const ScheduleCancelReasonModal = ({
  visible,
  onClose,
  acceptPress,
  rejectPress,
  title,
  description,
  titleColor,
  loader,
  loadingState,
  inPutValue,
  onChangeInputValue,
  isText,
}) => {
  const {i18n, t} = useTranslation();
  const {defaultBorder, lightGrayBackground} = colorTheme;
  const styles = getStyles(i18n.language, titleColor);

  return (
    <BottomModal type={'pink'} medium visible={visible} onModalClose={onClose}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={{width: '100%', marginTop: 25}}>
          <MultiLineInput
            bgColor={lightGrayBackground}
            value={inPutValue}
            onChangeText={text => {
              onChangeInputValue(text);
            }}
            placeholder={t('Please type here...')}
          />
          {isText && (
            <Text style={styles.errorText}>{t('Please enter the reason')}</Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <ButtonComponent
            pressStatus={loadingState}
            btnStyle={styles.acceptBtn}
            textStyle={styles.acceptText}
            disabled={false}
            onPress={acceptPress}
            text={t('submit')}
          />
        </View>
      </View>
    </BottomModal>
  );
};

export default ScheduleCancelReasonModal;
