import axios from 'axios';
import {baseURL} from '../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EventRegister} from 'react-native-event-listeners';

const BaseUrl = {
  main_server: baseURL,
};

export const axiosInstance = async (config = {}, urlType) => {

  let storage_auth = await AsyncStorage.getItem('auth');
  let headers = {
    Authorization: `Bearer ${JSON.parse(storage_auth)?.accessToken}`,
    'Content-Type': 'application/json',
  };

  headers = Object.assign(headers,config); //for merging two objects
  const endUrl = BaseUrl[urlType];

  // Create the axios instance
  const instance = axios.create({
    baseURL: endUrl,
    headers: headers,
  });

  // Request interceptor
  instance.interceptors.request.use(
    requestConfig => {
      // Modify the request config here, if needed
      // For example, you can add additional headers, tokens, etc.
      return requestConfig;
    },
    error => {
      // Handle request error
      return Promise.reject(error);
    },
  );

  // Response interceptor
  instance.interceptors.response.use(
    response => {
      // Modify the response data here, if needed
      return response;
    },
    error => {
      // Handle response error
      if (error && error?.response && error?.response?.status === 401) {
        EventRegister.emit('clearAuth');
        return new Promise(() => {});
      } else {
        // this promise will return error on axios catch.
        return Promise.reject(error);
      }
    },
  );

  return instance;
};

class APIClient {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  post(data, config, urlType = 'main_server') {
    return axiosInstance(config, urlType).then(res =>
      res.post(this.endpoint, data),
    );
  }

  get(params = {}, config, urlType = 'main_server') {
    return axiosInstance(config, urlType,cancelAxiosToken).then(res =>
      res.get(this.endpoint, {params}),
    );
  }
}

export default APIClient;
