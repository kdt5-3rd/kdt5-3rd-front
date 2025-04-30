'use client';

import BoardTitle from '@/app/_components/common/BoardTitle';
import Navigation from '@/app/_components/nav/Navigation';
import { ko } from 'date-fns/locale';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import './monthlyCalendar.css';
import { TaskCalendar } from '@/app/_types';
import CalendarType from '../_components/CalendarType';
import Progress from '../_components/Progress';
import CalendarContainer from '../_components/CalendarContainer';
import TaskModal from '@/app/_components/tasks/TaskModal';
import useGetTaskQuery from '@/app/_hooks/useGetTaskQuery';

export default function Monthly() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectEvent, setSelectEvent] = useState<TaskCalendar | null>(null);
  const [finishedTaskCount, setFinishedTaskCount] = useState(0);
  const [calendarMockData, setCalendarMockData] = useState<TaskCalendar[]>([]);

  const { data: taskList = [] } = useGetTaskQuery('month');

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: { ko },
  });

  const onSelectEvent = useCallback((event: TaskCalendar) => {
    setIsOpen(true);
    setSelectEvent(event);
  }, []);

  useEffect(() => {
    if (taskList && taskList.length > 0) {
      const formattedData = taskList.map(task => ({
        ...task,
        start_time: new Date(task.start_time),
        end_time: new Date(task.end_time || task.start_time),
      }));

      setCalendarMockData(formattedData);
    }

    setFinishedTaskCount(taskList.filter(task => task.is_completed).length);
  }, [taskList]);

  return (
    <div className='text-secondary-500 flex flex-col sm:inline-flex sm:flex-row h-full min-h-screen w-full bg-[#FAFAFA]'>
      <Navigation />
      <div className='bg-primary-0 h-full w-full sm:min-w-[752px]'>
        <div className='flex flex-col'>
          <BoardTitle title='일정 관리'>
            <CalendarType />
            <Progress
              finishedTaskCount={finishedTaskCount}
              totalTaskCount={taskList.length}
            />
          </BoardTitle>
          <CalendarContainer type='month'>
            <div className='h-[937px] min-w-[335px]'>
              <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                startAccessor='start_time'
                endAccessor='end_time'
                toolbar={false}
                events={calendarMockData}
                views={['month']}
                onSelectEvent={onSelectEvent}
              ></Calendar>
            </div>
          </CalendarContainer>
        </div>
      </div>
      <TaskModal
        mode='detail'
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        task={selectEvent}
        type='month'
      />
    </div>
  );
}
