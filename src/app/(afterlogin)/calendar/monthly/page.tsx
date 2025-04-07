'use client';

import BoardTitle from '@/app/_components/common/BoardTitle';
import Navigation from '@/app/_components/nav/Navigation';
import ProgressBar from '@/app/_components/tasks/ProgressBar';
import { ko } from 'date-fns/locale';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import '../calendar.css';
import { Task } from '@/app/_types';

interface ScheduleItem {
  id: number;
  title: string;
}

export default function Monthly() {
  const scheduleTypes: ScheduleItem[] = [
    { id: 0, title: 'Day' },
    { id: 1, title: 'Week' },
    { id: 2, title: 'Month' },
  ];
  const [activeScheduleIndex, setActiveScheduleIndex] = useState(0);
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
  const [calendarMockData, setCalendarMockData] = useState<Task[]>([]);

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: { ko },
  });

  const handleScheduleTypeClick = (index: number) => {
    setActiveScheduleIndex(index);
  };

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
            <div className='flex gap-[20px]'>
              {scheduleTypes.map(type => (
                <button
                  key={type.id}
                  className={`border-primary-200 cursor-pointer rounded-[10px] border-1 px-[44px] py-[8px] text-[20px] font-semibold ${activeScheduleIndex === type.id && 'bg-primary-400 text-primary-0'}`}
                  onClick={() => handleScheduleTypeClick(type.id)}
                >
                  {type.title}
                </button>
              ))}
            </div>
            <div className='flex max-w-[752px] items-center justify-between gap-[20px] text-[20px] font-semibold'>
              <span className='whitespace-nowrap'>달성률</span>
              <div className='w-full'>
                <ProgressBar
                  finishedTaskCount={finishedTaskCount}
                  totalTaskCount={mockData.length}
                />
              </div>
              <span className='whitespace-nowrap'>{`${finishedTaskCount} / ${mockData.length}`}</span>
            </div>
          </BoardTitle>
          <div className='bg-[#FAFAFA] px-[32px] py-[24px]'>
            <div className='mb-[24px] flex items-center justify-between'>
              <span className='text-[24px] font-semibold'>Todos</span>
              <button className='bg-primary-400 hover:bg-primary-500 h-[40px] w-[40px] cursor-pointer rounded-[10px] bg-[url(/assets/plus-small.png)] bg-center bg-no-repeat'></button>
            </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
