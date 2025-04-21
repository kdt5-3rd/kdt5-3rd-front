import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTask } from '../_apis/tasks';
import { format } from 'date-fns';

const useAddTaskMutation = (type: 'day' | 'week' | 'month') => {
  const queryClient = useQueryClient();
  const date = format(new Date(), 'yyyy-MM-dd');

  return useMutation({
    mutationKey: ['addTask'],
    mutationFn: postTask,
    onError: error => console.error('일정 추가 실패:', error),
    onSuccess: () => {
      // TODO: useQuery 생성 시 invalidateQueries로 쿼리 무효화 => get 요청 다시 실행
      queryClient.invalidateQueries({ queryKey: ['getTask', type, date] });
    },
  });
};

export default useAddTaskMutation;
