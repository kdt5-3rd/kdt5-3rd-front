import { useQuery } from '@tanstack/react-query';
import { getDailyTask, getMonthlyTask, getWeeklyTask } from '../_apis/tasks';

type TaskType = 'day' | 'week' | 'month';

const useGetTaskQuery = (type: TaskType, date: string) => {
  return useQuery({
    queryKey: ['getTask', type, date],
    queryFn: () => {
      const parsedDate = new Date(date);

      if (type === 'day') {
        return getDailyTask(parsedDate);
      }
      if (type === 'week') {
        return getWeeklyTask(parsedDate);
      }
      return getMonthlyTask(parsedDate);
    },
  });
};

export default useGetTaskQuery;
