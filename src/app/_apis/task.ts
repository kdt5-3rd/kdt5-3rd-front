import axios from 'axios';
import { TaskPayload } from '../_types';

const API_BASE_URL = 'http://3.37.123.28:3000/api';

export const postTask = async (task: TaskPayload) => {
  const response = await axios.post(`${API_BASE_URL}/tasks`, task);

  return response;
};

export const patchTask = async (task: TaskPayload) => {
  const response = await axios.patch(
    `${API_BASE_URL}/tasks/${task.task_id}`,
    task,
  );

  return response;
};

export const deleteTask = async (task_id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/tasks/${task_id}`);

  return response;
};
