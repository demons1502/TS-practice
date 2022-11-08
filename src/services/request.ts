import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import queryString from 'query-string';

const baseApiConfig = {
  baseURL: 'http://localhost:3000/api/v1/todos',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60s
  paramsSerializer: {
    encode: (params: Record<string, any>) => queryString.stringify(params),
  },
};

const baseApiClient = axios.create(baseApiConfig);

const request = <T = any>({ ...options }: AxiosRequestConfig<any>) => {
  const onSuccess = (response: AxiosResponse<T, any>) => response;
  const onError = (error: { response: { status: number } }) => {
    return Promise.reject(error.response);
  };

  return baseApiClient(options).then(onSuccess).catch(onError);
};

export default request;
