import * as Yup from 'yup';

export default Yup.object().shape({

  name: Yup.string()
    .label('Name')
    .required('validate_name'),
  // .min(2, 'Must have at least 2 characters'),
  senderName: Yup.string()
  .label('Name')
  .required('validate_name'),

    contactNo: Yup.string()
    .label('ContactNo')
    .matches(/^((0))(3)([0-9]{9})$/, {
      message: ('validation_receiver_number'),
      excludeEmptyString: false,
    })
    .required('validation_phone')
    .min(11, 'validation_number'),

    senderContactNo: Yup.string()
    .label('senderContactNo')
    .matches(/^((0))(3)([0-9]{9})$/, {
      message: ('validation_sender_number'),
      excludeEmptyString: false,
    })
    .required('validation_phone')
    .min(11, 'validation_number'),
});
