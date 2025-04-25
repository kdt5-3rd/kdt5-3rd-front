import { TaskWithDuration } from '@/app/_types';
import { formatTime } from '@/app/_utils/dateTimeUtil';

interface RouteInfoProps {
  label: string;
  task: TaskWithDuration;
}

function RouteInfo({ label, task }: RouteInfoProps) {
  return (
    <div className='mb-[10px] flex items-center justify-between'>
      <div className='truncate overflow-hidden text-ellipsis'>
        <span className='mr-[10px] text-[16px] font-bold sm:text-[20px]'>
          {label}
        </span>
        <span className='text-[16px] font-semibold sm:text-[20px]'>
          {label === '출발' ? task.from_place_name : task.place_name}
        </span>
      </div>
      <span className='text-[14px] font-medium whitespace-nowrap sm:text-[16px]'>
        {label === '출발'
          ? formatTime(task.start_time)
          : formatTime(task.end_time)}
      </span>
    </div>
  );
}

export default RouteInfo;
