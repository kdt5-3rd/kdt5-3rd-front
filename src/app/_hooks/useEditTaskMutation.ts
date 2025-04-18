import { useMutation } from '@tanstack/react-query';
import { patchTask } from '../_apis/tasks';

const useEditTaskMutation = () => {
  return useMutation({
    mutationKey: ['editTask'],
    mutationFn: patchTask,
    onError: error => console.error('일정 수정 실패:', error),
  });
};

export default useEditTaskMutation;
