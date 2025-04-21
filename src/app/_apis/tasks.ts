import axios from 'axios';
import { TaskPayload } from '../_types';
import { getWeekOfMonth } from 'date-fns';

type TaskParams = {
  year: number;
  month: number;
  day?: number;
  week?: number;
};

export const api = axios.create({
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

const getTasks = async (
  endpoint: string,
  params: TaskParams,
): Promise<TaskPayload[]> => {
  const response = await api.get(endpoint, { params });

  return response.data.data;
};

export const getDailyTask = (date: Date): Promise<TaskPayload[]> => {
  const params = formatDateParams(date, 'day');

  return getTasks('/tasks/day', params);
};

export const getWeeklyTask = (date: Date): Promise<TaskPayload[]> => {
  const params = formatDateParams(date, 'week');

  return getTasks('/tasks/week', params);
};

export const getMonthlyTask = (date: Date): Promise<TaskPayload[]> => {
  const params = formatDateParams(date, 'month');

  return getTasks('/tasks/month', params);
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
