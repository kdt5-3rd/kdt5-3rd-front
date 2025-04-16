import axios from 'axios';
import { TaskPayload } from '../_types';
import { getWeekOfMonth } from 'date-fns';

type TaskParams = {
  year: number;
  month: number;
  day?: number;
  week?: number;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

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

const fetchTasks = async (
  endpoint: string,
  params: TaskParams,
): Promise<TaskPayload[]> => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data.data;
  } catch (error) {
    console.error('API 호출 중 에러가 발생했습니다.', error);
    return [];
  }
};

export const fetchDailyTask = (date: Date): Promise<TaskPayload[]> => {
  const params = formatDateParams(date, 'day');

  return fetchTasks('/tasks/day', params);
};

export const fetchWeeklyTask = (date: Date): Promise<TaskPayload[]> => {
  const params = formatDateParams(date, 'week');

  return fetchTasks('/tasks/week', params);
};

export const fetchMonthlyTask = (date: Date): Promise<TaskPayload[]> => {
  const params = formatDateParams(date, 'month');
  
  return fetchTasks('/tasks/month', params);
};
