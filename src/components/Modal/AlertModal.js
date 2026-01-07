import {View, Text, Image} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';

import BottomModal from './BottomModal';
import {getStyles} from './AlertModalStyles';
import {AppImages} from '../../constants/AppImages';
import ButtonComponent from '../buttonComp/ButtonComponent';
import { colorTheme } from '../../constants/ColorConstants';

const AlertModal = ({
  visible,
  onClose,
  acceptPress,
  rejectPress,
  title,
  description,
  titleColor,
  loader,
  loadingState,
}) => {
  const {i18n, t} = useTranslation();
  const {defaultBorder} = colorTheme

  const styles = getStyles(i18n.language, titleColor);

  return (
    <BottomModal type={"pink"} small visible={visible} onModalClose={!loadingState && onClose}>
      <View style={styles.container}>
        <View>
          <Image style={styles.alertIcon} source={AppImages.AlertTriangle} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>{description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonComponent
            disabled={false}
            pressStatus={loadingState}
            indicatorColor={defaultBorder}
            textStyle={styles.rejectText}
            btnStyle={styles.rejectBtn}
            onPress={acceptPress}
            text={t('yes')}
          />
          <ButtonComponent
            btnStyle={styles.acceptBtn}
            textStyle={styles.acceptText}
            disabled={loadingState ? true : false}
            onPress={rejectPress}
            text={t('no')}
          />
        </View>
      </View>
    </BottomModal>
  );
};

export default AlertModal;
