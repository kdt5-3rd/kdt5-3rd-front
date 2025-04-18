import { useMutation } from '@tanstack/react-query';
import { postTask } from '../_apis/tasks';

const useAddTaskMutation = () => {
  return useMutation({
    mutationKey: ['addTask'],
    mutationFn: postTask,
    onError: error => console.error('일정 추가 실패:', error),
  });
};

export default useAddTaskMutation;
