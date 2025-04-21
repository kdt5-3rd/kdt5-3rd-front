'use client';

import Navigation from '@/app/_components/nav/Navigation';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { ko } from 'date-fns/locale';
import './weeklyCalendar.css';
import { Calendar, dateFnsLocalizer, DateLocalizer } from 'react-big-calendar';
import { useCallback, useMemo, useState } from 'react';
import BoardTitle from '@/app/_components/common/BoardTitle';
import { isEqual } from 'date-fns';
import CustomWeekEvent from './CustomWeekEvent';
import { Formats } from 'react-big-calendar';
import CalendarType from '../_components/CalendarType';
import Progress from '../_components/Progress';
import CalendarContainer from '../_components/CalendarContainer';
import { TaskCalendar } from '@/app/_types';
import TaskModal from '@/app/_components/tasks/TaskModal';
import useGetTaskQuery from '@/app/_hooks/useGetTaskQuery';

export default function Weekly() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectEvent, setSelectEvent] = useState<TaskCalendar | null>(null);

  const { data: taskList = [] } = useGetTaskQuery('week');

  const finishedTaskCount = taskList
    ? taskList.filter(task => task.is_completed).length
    : 0;

  const { formats, components, events, localizer } = useMemo(
    () => ({
      events: taskList.map(task => {
        const start = new Date(task.start_time);
        const end = new Date(task.end_time || task.start_time);

        return {
          ...task,
          start_time: start,
          end_time: end,
          allDay: isEqual(start, end) ? true : false,
        };
      }),
      localizer: dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales: { ko },
      }),
      formats: {
        timeGutterFormat: (
          date: Date,
          culture: string,
          localizer: DateLocalizer,
        ) => localizer.format(date, 'haa', culture),
        dayFormat: (date: Date, culture: string, localizer: DateLocalizer) =>
          localizer.format(date, 'eee dd', culture),
      } as Formats,
      components: {
        week: {
          event: CustomWeekEvent,
        },
      },
    }),
    [taskList],
  );

  const onSelectEvent = useCallback((event: TaskCalendar) => {
    setIsOpen(true);
    setSelectEvent(event);
  }, []);

  return (
    <div className='text-secondary-500 inline-flex h-full min-h-screen w-full bg-[#FAFAFA]'>
      <Navigation />
      <div className='bg-primary-0 h-full w-full min-w-[752px]'>
        <div className='flex flex-col'>
          <BoardTitle title='일정 관리'>
            <CalendarType />
            <Progress
              finishedTaskCount={finishedTaskCount}
              totalTaskCount={taskList.length}
            />
          </BoardTitle>
          <CalendarContainer type='week'>
            <Calendar
              localizer={localizer}
              events={events}
              defaultView='week'
              views={['week']}
              startAccessor='start_time'
              endAccessor='end_time'
              toolbar={false}
              formats={formats}
              components={components}
              onSelectEvent={onSelectEvent}
            />
          </CalendarContainer>
        </div>
      </div>
      <TaskModal
        mode='detail'
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        task={selectEvent}
        type='week'
      />
    </div>
  );
}
