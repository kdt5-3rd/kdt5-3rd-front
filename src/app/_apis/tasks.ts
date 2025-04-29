import axios, { isAxiosError } from 'axios';
import { TaskPayload, TaskWithDuration } from '../_types';
import { getWeekOfMonth } from 'date-fns';
import { useAuthStore } from '../store/authStore';
import { refreshAccessToken, validateToken } from './users';

type TaskParams = {
  year: number;
  month: number;
  day?: number;
  week?: number;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

api.interceptors.request.use(
  async config => {
    const { accessToken, refreshToken, clearTokens, setTokens } =
      useAuthStore.getState();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      return config;
    }

    try {
      await validateToken();
      return config;
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        if (!refreshToken) {
          clearTokens();
          window.location.href = '/login';
          return Promise.reject(new Error('리프레시 토큰이 없습니다.'));
        }

        try {
          const response = await refreshAccessToken(refreshToken);
          const newAccessToken = response.data.accessToken;

          setTokens(newAccessToken, refreshToken);
          config.headers.Authorization = `Bearer ${newAccessToken}`;

          return config;
        } catch (refreshError) {
          clearTokens();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  },
  error => {
    return Promise.reject(error);
  },
);

const formatDateParams = (date: Date, type: 'day' | 'week' | 'month') => {
  const dateParams: TaskParams = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };

  if (type === 'day') {
    dateParams.day = date.getDate();
  }
  if (type === 'week') {
    dateParams.week = getWeekOfMonth(date, { weekStartsOn: 0 });
  }

  return dateParams;
};

const getTasks = async (
  endpoint: string,
  params: TaskParams,
): Promise<TaskWithDuration[]> => {
  const response = await api.get(endpoint, { params });

  return response.data.data;
};

export const getDailyTask = (date: Date): Promise<TaskWithDuration[]> => {
  const params = formatDateParams(date, 'day');

  return getTasks('/tasks/day', params);
};

export const getWeeklyTask = (date: Date): Promise<TaskWithDuration[]> => {
  const params = formatDateParams(date, 'week');

  return getTasks('/tasks/week', params);
};

export const getMonthlyTask = (date: Date): Promise<TaskWithDuration[]> => {
  const params = formatDateParams(date, 'month');

  return getTasks('/tasks/month', params);
};

export const getTaskPath = async (
  taskId: number,
): Promise<[number, number][]> => {
  const response = await api.get(`/tasks/${taskId}/path`);

  return response.data.data.path;
};

export const postTask = async (task: TaskPayload) => {
  const response = await api.post('/tasks', task);

  return response;
};

export const patchTask = async (task: TaskPayload) => {
  const response = await api.patch(`/tasks/${task.task_id}`, task);

  return response;
};

export const deleteTask = async (task_id: number) => {
  const response = await api.delete(`/tasks/${task_id}`);

  return response;
};
