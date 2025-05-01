import { TaskWithDuration } from '@/app/_types';

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
    </div>
  );
}

export default RouteInfo;
