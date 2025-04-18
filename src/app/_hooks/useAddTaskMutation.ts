import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTask } from '../_apis/tasks';

const useAddTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['addTask'],
    mutationFn: postTask,
    onError: error => console.error('일정 추가 실패:', error),
    onSuccess: () => {
      // TODO: useQuery 생성 시 invalidateQueries로 쿼리 무효화 => get 요청 다시 실행
      queryClient.invalidateQueries({ queryKey: [''] });
    },
  });
};

export default useAddTaskMutation;
