import {storage, StorageKeys} from "@/lib/storage";
import axios, {AxiosResponse} from "axios";

type Headers = {[key: string]: string};

const defaultHeaders = {
  'Content-Type': 'application/json',
}

export const getAuthHeaders = async (headers: Headers = defaultHeaders) => {
  const token = await storage.get(StorageKeys.ACCESS_TOKEN);
  return {
    ...headers,
    'Authorization': `Bearer ${token}`
  }
}

const retryIfAuthError = <Result>(headers: Headers, callback: () => Promise<Result>) => {
  if(!headers.Authorization) return callback();
  return callback();
}

const parseAxiosCallback = <Result>(callback: () => Promise<AxiosResponse<Result>>) => {
  return async () => (await callback()).data as Result;
}

export const httpClientBuilder = (prefix = "", headers: Headers = defaultHeaders) =>  ({
  get: async <Result>(url: string) => {
    const axiosCall = () => axios.get<Result>(`${prefix}${url}`, {headers});
    return retryIfAuthError(headers, parseAxiosCallback(axiosCall));
  },
  post: async <Result, Body>(url: string, body: Body) => {
    const axiosCall = () => axios.post<Result>(`${prefix}${url}`, {body, headers});
    return retryIfAuthError(headers, parseAxiosCallback(axiosCall));
  },
  patch: async <Result, Body>(url: string, body: Body) => {
    const axiosCall = () => axios.patch<Result>(`${prefix}${url}`, {body, headers});
    return retryIfAuthError(headers, parseAxiosCallback(axiosCall));
  },
  delete: async <Result>(url: string) => {
    const axiosCall = () => axios.delete<Result>(`${prefix}${url}`, {headers});
    return retryIfAuthError(headers, parseAxiosCallback(axiosCall));
  },
})
