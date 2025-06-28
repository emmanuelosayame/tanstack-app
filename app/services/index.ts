import { QueryClient, QueryOptions } from '@tanstack/react-query';
import axios, { AxiosRequestConfig, AxiosRequestHeaders, Method } from 'axios';

export interface PostRes {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const appQueryClient = new QueryClient();

// Create an axios instance with the JSONPlaceholder base URL
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

// fetcher supports all HTTP methods via config
interface FetcherConfig extends AxiosRequestConfig {
  method?: Method;
  url: string;
  data?: any;
  params?: any;
  headers?: AxiosRequestHeaders;
}

async function fetcher<T = any>(config: FetcherConfig): Promise<T> {
  const finalConfig = { method: 'get', ...config };
  const response = await axiosInstance.request<T>(finalConfig);
  return response.data;
}

const queryLoader = (query: QueryOptions) =>
  appQueryClient.fetchQuery(query as any);

export { appQueryClient, fetcher, queryLoader };
export type { FetcherConfig };
