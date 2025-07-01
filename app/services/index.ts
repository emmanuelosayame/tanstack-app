import {
  QueryClient,
  QueryOptions,
  MutationOptions,
} from '@tanstack/react-query';
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

/**
 * Calls a mutation function (like useMutation's mutationFn) with variables, then invalidates the mutationKey from the endpoint definition.
 * @param input - Must include mutationFn, variables, and mutationKey
 */
type MutateAndAutoInvalidateInput<T = any, TVariables = any> = {
  mutationFn: (variables: TVariables) => Promise<T>;
  variables: TVariables;
  mutationKey?: any[];
  onSuccess?: (result: T) => void;
};

async function mutationLoader<T = any, TVariables = any>(
  input: MutateAndAutoInvalidateInput<T, TVariables>
): Promise<T> {
  const { mutationFn, variables, onSuccess } = input;
  const result = await mutationFn(variables);

  if (onSuccess) {
    onSuccess(result);
  }
  return result;
}

export const invalidate = (invalidateKeys: any[][]) => {
  invalidateKeys.forEach((key) => {
    appQueryClient.invalidateQueries({ queryKey: key });
  });
};

export { appQueryClient, fetcher, queryLoader, mutationLoader };
export type { FetcherConfig, MutateAndAutoInvalidateInput };
