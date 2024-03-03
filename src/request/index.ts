import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASEURL,
  timeout: 10000,
});

// axios实例拦截请求
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// axios实例拦截响应
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      const data = response.data;
      if (data.code !== 0) {
        return Promise.reject(data);
      } else {
        return data;
      }
    }
    return response;
  },
  // 请求失败
  (error: AxiosError) => {
    const { response } = error;
    if (response) {
      return Promise.reject(response.data);
    }
  },
);
export default service;
