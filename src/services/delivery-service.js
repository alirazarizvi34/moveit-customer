import APIClient from './api-client';

class DeliveryService {
  selfEstimatedMove(data, headers) {
    const formData = new FormData();
    Object.keys(data).map(objValue => {
      formData.append(objValue, data[objValue]);
    });
    const apiClient = new APIClient('/relocation/request/delivery');
    return apiClient.post(data, headers);
  }

  applyPromoCode(data,id) {
    const apiClient = new APIClient(`/relocation/request/apply-coupon/${id}`);
    return apiClient.post(data);
  }
}

export default new DeliveryService();
