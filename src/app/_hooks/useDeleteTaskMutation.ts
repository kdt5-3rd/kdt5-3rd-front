import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '../_apis/tasks';

const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteTask'],
    mutationFn: deleteTask,
    onError: error => console.error('일정 삭제 실패:', error),
    onSuccess: () => {
      // TODO: useQuery 생성 시 invalidateQueries로 쿼리 무효화 => get 요청 다시 실행
      queryClient.invalidateQueries({ queryKey: [''] });
    },
  });
};

export default useDeleteTaskMutation;
