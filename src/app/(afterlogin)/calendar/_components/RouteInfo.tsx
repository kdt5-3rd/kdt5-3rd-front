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
        <span className='mr-[10px] text-[20px] font-bold'>{label}</span>
        <span className='text-[20px] font-semibold'>
          {label === '출발' ? task.from_place_name : task.place_name}
        </span>
      </div>
      <span className='font-medium whitespace-nowrap'>
        {label === '출발'
          ? formatTime(task.start_time)
          : formatTime(task.end_time)}
      </span>
    </div>
  );
}

export default RouteInfo;
