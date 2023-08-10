import { AxiosPromise } from 'axios';
import { apiClient } from '../utils/axios';

type JWTToken = { access_token: string };

export const signin = async (data: Record<string, string>): AxiosPromise<JWTToken> => {
  return await apiClient.post('/auth/signin', data);
};

export const signup = async (data: Record<string, string>) => {
  const res = await apiClient.post('/auth/signup', data);
  return res.status;
};
