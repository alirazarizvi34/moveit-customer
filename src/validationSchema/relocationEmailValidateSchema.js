import * as Yup from 'yup';

export default Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('valid_email')
    .required('validate_email'),
});