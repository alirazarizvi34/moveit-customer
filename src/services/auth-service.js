import {APICONSTANTS} from '../constants/ApiConstants';
import APIClient from './api-client';

class AuthServices {
  sendOtp(data) {
    const apiClient = new APIClient(APICONSTANTS.sendOtp);
    return apiClient.post(data);
  }

  socialSurvey(data) {
    const apiClient = new APIClient(APICONSTANTS.surveySubmit);
    return apiClient.post(data);
  }

  authenticateUser(data) {
    const apiClient = new APIClient(APICONSTANTS.authenticateUser);
    return apiClient.post(data);
  }
}

export default new AuthServices();
