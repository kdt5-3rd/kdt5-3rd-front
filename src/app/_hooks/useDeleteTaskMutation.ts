import { useMutation } from '@tanstack/react-query';
import { deleteTask } from '../_apis/tasks';

const useDeleteTaskMutation = () => {
  return useMutation({
    mutationKey: ['deleteTask'],
    mutationFn: deleteTask,
    onError: error => console.error('일정 삭제 실패:', error),
  });
};

export default useDeleteTaskMutation;
