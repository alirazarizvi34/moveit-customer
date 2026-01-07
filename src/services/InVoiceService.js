import APIClient, { axiosInstance } from "./api-client";

class InVoiceService {
   
    reviewSubmit(data){
        const apiClient = new APIClient('/ride/review');
        return apiClient.post(data);
    }

    InvoiceDetail(params){
        const apiClient = new APIClient('/get-invoice');
        return apiClient.get(params); 
    }
}

export default new InVoiceService();