import { useQuery } from '@tanstack/react-query';
import { getDailyTask, getMonthlyTask, getWeeklyTask } from '../_apis/tasks';
import { format } from 'date-fns';

type TaskType = 'day' | 'week' | 'month';

const useGetTaskQuery = (type: TaskType) => {
  const date = format(new Date(), 'yyyy-MM-dd');

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
