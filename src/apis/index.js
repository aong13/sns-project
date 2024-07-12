import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://13.209.27.220:8080';

const API  = axios.create({
  baseURL,
//   timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

//로그인 유지를 위한 interceptors
API.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default API;
