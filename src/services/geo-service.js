import APIClient from "./api-client";

class GeoService {

    autoComplete(params){
        const apiClient = new APIClient('/map/autocomplete');
        return apiClient.get(params, {}, urlType='geo_service');  
    }
    mapPlace(params){
        const apiClient = new APIClient(`/map/place/${params}`);
        return apiClient.get({},{}, urlType='geo_service');  
    }
    distanceMatrix(data){
        const apiClient = new APIClient('/map/distancematrix');
        return apiClient.post(data, {}, urlType='geo_service');   
    }

    reverseGeocode(getData,cancelAxiosToken){
        const apiClient = new APIClient(`/map/reverse-geoCode?lat=${getData?.latitude}&lng=${getData?.longitude}&lang=en&serviceType=${getData?.serviceType}`);
        return apiClient.get({}, {}, urlType='geo_service',cancelAxiosToken); 
    }
    
}

export default new GeoService();