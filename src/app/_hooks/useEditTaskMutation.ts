import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchTask } from '../_apis/tasks';
import { format } from 'date-fns';

const useEditTaskMutation = (
  type: 'day' | 'week' | 'month',
  taskId: number | undefined,
) => {
  const queryClient = useQueryClient();
  const date = format(new Date(), 'yyyy-MM-dd');

  return useMutation({
    mutationKey: ['editTask'],
    mutationFn: patchTask,
    onError: error => console.error('일정 수정 실패:', error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTask', type, date] });
      if (taskId !== undefined) {
        queryClient.invalidateQueries({ queryKey: [taskId] });
      }
    },
  });
};

export default useEditTaskMutation;
