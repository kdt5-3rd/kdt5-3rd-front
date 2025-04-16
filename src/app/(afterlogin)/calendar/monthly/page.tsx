'use client';

import BoardTitle from '@/app/_components/common/BoardTitle';
import Navigation from '@/app/_components/nav/Navigation';
import { ko } from 'date-fns/locale';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import './monthlyCalendar.css';
import { TaskCalendar, TaskPayload } from '@/app/_types';
import CalendarType from '../_components/CalendarType';
import Progress from '../_components/Progress';
import CalendarContainer from '../_components/CalendarContainer';
import TaskModal from '@/app/_components/tasks/TaskModal';
import { fetchMonthlyTask } from '@/app/_apis/fetchTasks';

export default function Monthly() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectEvent, setSelectEvent] = useState<TaskCalendar | null>(null);
  const [taskList, setTaskList] = useState<TaskPayload[]>([]);
  const [finishedTaskCount, setFinishedTaskCount] = useState(0);
  const [calendarMockData, setCalendarMockData] = useState<TaskCalendar[]>([]);

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

  const getMonthlyTask = async (todayDate: Date) => {
    try {
      const result = await fetchMonthlyTask(todayDate);
      setTaskList(result);
    } catch (error) {
      console.error('오늘의 일정을 불러오는 중 에러가 발생했습니다. ', error);
    }
  }

  useEffect(() => {
    getMonthlyTask(new Date());
  }, [])

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
          <CalendarContainer>
            <div className='h-[937px]'>
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
      />
    </div>
  );
}
