import * as Yup from 'yup';

export default Yup.object().shape({
  fullName: Yup.string()
    .label('Name')
    .required('validate_full_name'),

  email: Yup.string()
    .label('Email')
    .email('valid_email')
    .required('validate_email'),

  referralCode: Yup.string()
    .label('Referral Code')
    .min(11, 'validation_number'),

});