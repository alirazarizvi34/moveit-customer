import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import DetailRow from './DetailRow';
import {moderateScale} from 'react-native-size-matters';
import {useTranslation} from 'react-i18next';
import {colorTheme} from '../../constants/ColorConstants';

const RelocationQuoteDetailCard = ({value}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <DetailRow
        label={t('transportCharges')}
        description={t('asPerEstimatedDistance')}
        amount={value?.transport_cost}
      />
      <DetailRow
        label={t('loadingCharges')}
        amount={value?.labour_cost}
        description={t('loadingLabourIncluded')}
      />
      <DetailRow
        label={t('packingCharges')}
        amount={value?.package_cost}
        description={t('packingLabourIncluded')}
      />
      <DetailRow
        label={t('additionalServices')}
        amount={value?.additional_cost}
        description={t('acInstallation')}
      />
      <DetailRow
        label={t('assemblingServices')}
        amount={value?.assembling_cost}
        description={t('assemblingandisassembling')}
      />
      <DetailRow
        label={t('serviceCharges')}
        amount={value?.service_cost}
        description={t('moveitServiceCharges')}
      />
      <DetailRow
        label={t('taxAmount')}
        amount={value?.tax}
        description={t('legalTaxAmount')}
      />
      {value?.discounted_amount != null  && (
        <DetailRow
          label={t('discountedAmount')}
          amount={value?.discounted_amount}
          description={t('discountApplied')}
        />
      )}
    </View>
  );
};

export default RelocationQuoteDetailCard;

const {defaultBackground} = colorTheme;
const styles = StyleSheet.create({
  container: {
    elevation: 5,
    backgroundColor: defaultBackground,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(22),
    borderRadius: 8,
    shadowColor: 'rgba(78, 0, 138, 0.8)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
});
