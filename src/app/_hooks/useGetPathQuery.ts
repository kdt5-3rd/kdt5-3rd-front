import { useQuery } from '@tanstack/react-query';
import { getTaskPath } from '../_apis/tasks';

const useGetPathQuery = (taskId: number, enabled: boolean) => {
  return useQuery({
    queryKey: [taskId],
    queryFn: () => {
      return getTaskPath(taskId);
    },
    enabled,
  });
};

export default useGetPathQuery;
