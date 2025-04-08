'use client';

import BoardTitle from '@/app/_components/common/BoardTitle';
import Navigation from '@/app/_components/nav/Navigation';
import { ko } from 'date-fns/locale';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import './monthlyCalendar.css';
import { TaskCalendar } from '@/app/_types';
import CalendarType from '../_components/CalendarType';
import Progress from '../_components/Progress';
import CalendarContainer from '../_components/CalendarContainer';

export default function Monthly() {
  const [mockData] = useState([
    {
      task_id: 1,
      title: '일어나기',
      memo: '',
      start_time: '2025-04-11T09:00:00',
      end_time: '',
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
  const [finishedTaskCount, setFinishedTaskCount] = useState(0);
  const [calendarMockData, setCalendarMockData] = useState<TaskCalendar[]>([]);

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: { ko },
  });

  useEffect(() => {
    if (mockData && mockData.length > 0) {
      const formattedData = mockData.map(task => ({
        ...task,
        start_time: new Date(task.start_time),
        end_time: new Date(task.end_time || task.start_time),
      }));

      setCalendarMockData(formattedData);
    }

    setFinishedTaskCount(mockData.filter(task => task.is_completed).length);
  }, [mockData]);

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
            <div className='h-[937px]'>
              <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                startAccessor='start_time'
                endAccessor='end_time'
                toolbar={false}
                events={calendarMockData}
                views={['month']}
              ></Calendar>
            </div>
          </CalendarContainer>
        </div>
      </div>
    </div>
  );
}
