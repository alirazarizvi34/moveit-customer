import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';

class BiddingValidation {
    constructor(minAmount){
        this.minAmount = minAmount;
        this.language = this.getCurrentLanguage();
    }


  getCurrentLanguage() {
    const { i18n } = useTranslation();;
    return i18n.language;
  }


    validationSchema = () => Yup.object().shape ({
        biddingAmount: Yup.number()
        .label('Amount')
        .min(this.minAmount, this.language == 'urdu' ? `براہ کرم  PKR ${this.minAmount - 1} سے زیادہ رقم درج کریں۔` : `Please enter amount greater than ${this.minAmount - 1}`)
        .required('validation_biddingAmount'),
    })
}
export default BiddingValidation;