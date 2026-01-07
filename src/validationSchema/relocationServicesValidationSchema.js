import * as Yup from 'yup';

export default Yup.object().shape({
  pickup_location: Yup.string().label('Pickup').required('validate_pickup'),

  dropoff_location: Yup.string().label('Dropoff').required('validate_dropoff'),

  name: Yup.string().label('fullname').required('validate_full_name'),

  relocation_category_id: Yup.string()
    .label('category')
    .required('validate_category'),

  phone: Yup.string()
    .label('Phone')
    .required('validation_phone')
    .min(11, 'validation_number'),

  // survey_date: Yup.string()
  // .label('date')
  // .required('Survey Date is required')
});
