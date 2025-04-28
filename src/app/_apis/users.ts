import axios from 'axios';
import { LoginParams, RegisterParams } from '../_types/users';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

export const register = async (registerData: RegisterParams) => {
  const response = await api.post('/join', registerData);

  return response;
};

export const login = async (loginData: LoginParams) => {
  const response = await api.post('/users/login', loginData);

  return response;
};
