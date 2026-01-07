import {APICONSTANTS} from '../constants/ApiConstants';
import APIClient from './api-client';

class TripServices {
  getTruckBooking(params) {
    const apiClient = new APIClient(APICONSTANTS.customerRideHistory);
    return apiClient.get(params);
  }
  uploadMedia(fileData,headers) {
    const apiClient = new APIClient(APICONSTANTS.uploadMedia);
    return apiClient.post(fileData,headers);
  }
  deleteMedia(fileData,headers){
    const apiClient = new APIClient(APICONSTANTS.deleteMedia);
    return apiClient.post(fileData,headers)
  }
}

export default new TripServices();
