import { TaskCalendarAllDay } from '@/app/_types';
import { format } from 'date-fns';

interface CustomWeekEventProps {
  event: TaskCalendarAllDay;
}

function CustomWeekEvent({ event }: CustomWeekEventProps) {
  return (
    <div className='flex flex-col gap-[2px] p-[4px]'>
      <div className='text-[8px] font-semibold text-nowrap sm:text-[12px]'>
        {event.title}
      </div>
      {!event.allDay && (
        <div className='text-[6px] font-normal sm:text-[8px]'>{`${format(event.start_time, 'h:mma')} - ${format(event.end_time, 'h:mma')}`}</div>
      )}
    </div>
  );
}

export default CustomWeekEvent;
