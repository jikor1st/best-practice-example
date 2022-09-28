import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: '/',
  withCredentials: true,
  timeout: 60 * 1000,
  headers: {
    ContentType: 'application/json',
  },
};

const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(async config => {
  // do something before request
  return config;
});

axiosInstance.interceptors.response.use(async response => {
  // do something before response
  return response;
});

const axiosController = axiosInstance;

export { axiosController };
