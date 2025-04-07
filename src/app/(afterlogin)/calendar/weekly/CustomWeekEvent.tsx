import { TaskCalendarAllDay } from '@/app/_types';
import { format } from 'date-fns';

interface CustomWeekEventProps {
  event: TaskCalendarAllDay;
}

function CustomWeekEvent({ event }: CustomWeekEventProps) {
  return (
    <div className='flex flex-col gap-[2px] p-[4px]'>
      <div className='text-[12px] font-semibold'>{event.title}</div>
      {!event.allDay && (
        <div className='text-[8px] font-normal'>{`${format(event.start_time, 'h:mma')} - ${format(event.end_time, 'h:mma')}`}</div>
      )}
    </div>
  );
}

export default CustomWeekEvent;
