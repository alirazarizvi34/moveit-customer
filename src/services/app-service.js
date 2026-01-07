import APIClient from './api-client';

class AppService {
  bootMeUp(config) {
    const apiClient = new APIClient('/boot-me-up');
    return apiClient.get(null, config);
  }
  getvehicles(params) {
    const apiClient = new APIClient('/get-vehicles');
    return apiClient.get(params);
  }
  currentRide() {
    const apiClient = new APIClient('/current-ride');
    return apiClient.get();
  }
  fcmToken(data) {
    const apiClient = new APIClient('/store-fcm');
    return apiClient.post(data);
  }
  multiRides(config) {
    const apiClient = new APIClient('/active-rides');
    return apiClient.get(null,config);
  }
  rideDetails(id) {
    const apiClient = new APIClient(`/ride/${id}`);
    return apiClient.get();
  }
  banners(config) {
    const apiClient = new APIClient(`/banners`);
    return apiClient.get(null,config);
  }
}

export default new AppService();
