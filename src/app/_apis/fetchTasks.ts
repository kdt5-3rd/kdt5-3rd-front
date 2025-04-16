import axios from 'axios';
import { TaskPayload } from '../_types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

export const fetchDailyTask = async (date: Date): Promise<TaskPayload[]> => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  try {
    const response = await api.get('/tasks/day', {
      params: { year, month, day },
    });

    return response.data.data;
  } catch (error) {
    console.error('API 호출 중 에러가 발생했습니다.', error);
    return [];
  }
};

export const fetchWeeklyTask = async (date: Date): Promise<TaskPayload[]> => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfWeek = firstDay.getDay();
  const week = Math.ceil((date.getDate() + firstDayOfWeek) / 7);

  try {
    const response = await api.get('/tasks/week', {
      params: { year, month, week },
    });

    return response.data.data;
  } catch (error) {
    console.error('API 호출 중 에러가 발생했습니다.', error);
    return [];
  }
};

export const fetchMonthlyTask = async (date: Date): Promise<TaskPayload[]> => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  try {
    const response = await api.get('/tasks/month', {
      params: { year, month },
    });

    return response.data.data;
  } catch (error) {
    console.error('API 호출 중 에러가 발생했습니다.', error);
    return [];
  }
};
