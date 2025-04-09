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
import { TaskCalendar, TaskPayload } from '@/app/_types';
import TaskModal from '@/app/_components/tasks/TaskModal';

export default function Weekly() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectEvent, setSelectEvent] = useState<TaskCalendar | null>(null);
  const [mockData] = useState<TaskPayload[]>([
    {
      task_id: 1,
      title: '일어나기',
      memo: '',
      start_time: '2025-04-07T08:00:00',
      end_time: '2025-04-07T10:00:00',
      address: '경기도 수원시 ...',
      place_name: 'Cafe ABC',
      location: { lat: '', lng: '' },
      is_completed: true,
    },
    {
      task_id: 2,
      title: 'Team meeting',
      memo: '주간 회의',
      start_time: '2025-04-11T15:00:00',
      end_time: '',
      address: '경기도 수원시 ...',
      place_name: 'Zep 4번 룸',
      location: { lat: '127.1086228', lng: '37.4012191' },
      is_completed: false,
    },
    {
      task_id: 3,
      title: '구현하기',
      memo: '수요일까지 구현해요',
      start_time: '2025-04-11T13:00:00',
      end_time: '2025-04-13T14:00:00',
      address: '경기도 수원시 ...',
      place_name: 'Cafe DEF',
      location: { lat: '127.1086228', lng: '37.4012191' },
      is_completed: false,
    },
  ]);
  const finishedTaskCount = mockData
    ? mockData.filter(task => task.is_completed).length
    : 0;

  const { formats, components, events, localizer } = useMemo(
    () => ({
      events: mockData.map(task => {
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
    [mockData],
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
              totalTaskCount={mockData.length}
            />
          </BoardTitle>
          <CalendarContainer>
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
      />
    </div>
  );
}
