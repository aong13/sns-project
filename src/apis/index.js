import axios from 'axios';

const baseURL = 'http://13.209.27.220:8080';

const API  = axios.create({
  baseURL,
//   timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
