import axios from 'axios';
import { TaskPayload } from '../_types';

const API_BASE_URL = 'http://3.37.123.28:3000/api';

export const postTask = async (task: TaskPayload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tasks`, task);

    return response;
  } catch (error) {
    console.error('일정 추가를 실패했습니다.', error);
  }
};

export const patchTask = async (task: TaskPayload) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/tasks/${task.task_id}`,
      task,
    );

    return response;
  } catch (error) {
    console.error('일정 수정을 실패했습니다.', error);
  }
};

export const deleteTask = async (task_id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/tasks/${task_id}`);

    return response;
  } catch (error) {
    console.error('일정 삭제를 실패했습니다.', error);
  }
};
