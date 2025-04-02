'use client';

import Navigation from '@/app/_components/nav/Navigation';
import ProgressBar from '@/app/_components/tasks/ProgressBar';
import TaskListItem from '@/app/_components/tasks/TaskListItem';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState('');
  const [today, setToday] = useState('');
  const [mockData, setMockData] = useState([
    {
      task_id: 1,
      title: '일어나기',
      memo: '',
      start_time: '2025-03-11T13:00:00',
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
      start_time: '2025-03-11T13:00:00',
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
      start_time: '2025-03-11T13:00:00',
      end_time: '2025-03-11T14:00:00',
      address: '경기도 수원시 ...',
      place_name: 'Cafe ABC',
      location: { lat: '127.1086228', lng: '37.4012191' },
      is_completed: false,
    },
  ]);
  const [finishedTaskCount, setFinishedTaskCount] = useState(0);

  const getCurrentTime = () => {
    const currentDate = new Date();
    const timeString = Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(currentDate);

    setCurrentTime(timeString);
  };

  const handleCheckClick = (taskId: number) => {
    setMockData(prev =>
      prev.map(task =>
        task.task_id === taskId
          ? { ...task, is_completed: !task.is_completed }
          : task,
      ),
    );
  };

  useEffect(() => {
    getCurrentTime();
    const interval = setInterval(() => {
      getCurrentTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const todayDate = new Date();
    const weekday = todayDate.toLocaleString('en-US', { weekday: 'long' });
    setToday(
      Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(todayDate) +
        ' ' +
        weekday,
    );
  }, []);

  useEffect(() => {
    setFinishedTaskCount(mockData.filter(task => task.is_completed).length);
  }, [mockData]);

  return (
    <div className='flex h-full min-h-screen min-w-[1440px] bg-[#FAFAFA]'>
      <Navigation />
      <div className='w-full min-w-[752px]'>
        <div className='p-[32px]'>
          <div className='flex justify-between'>
            <div>
              <p className='text-secondary-500 text-[34px] font-semibold'>
                오늘의 일정
              </p>
              <span className='text-primary-500 text-[30px] font-semibold'>
                {today}
              </span>
            </div>
            <div className='flex items-end'>
              <button className='bg-primary-400 hover:bg-primary-500 h-[50px] w-[50px] cursor-pointer rounded-[10px] bg-[url(/assets/plus-big.png)] bg-center bg-no-repeat'></button>
            </div>
          </div>
          <div className='text-secondary-500 mt-[35px] mb-[12px] flex justify-between text-[20px] font-semibold'>
            <span>Task Done</span>
            <span>{`${finishedTaskCount} / ${mockData.length}`}</span>
          </div>
          <ProgressBar
            finishedTaskCount={finishedTaskCount}
            totalTaskCount={mockData.length}
          />
          <div className='text-secondary-500 mt-[14px]'>
            <ul className='flex flex-col gap-y-[10px]'>
              {mockData.map((task, index) => {
                return (
                  <TaskListItem
                    task={task}
                    index={index}
                    key={task.task_id}
                    handleCheckClick={handleCheckClick}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className='w-[436px] shrink-0 bg-[#F5F5F7]'>
        <div className='px-[32px] pt-[49px]'>
          <div className='text-secondary-500 text-[40px] font-medium'>
            {currentTime}
          </div>
          <div className='text-secondary-500 bg-primary-0 border-primary-100 mt-[26px] w-full rounded-[10px] border-1 px-[22px] py-[17px]'>
            <div className='flex items-center text-[24px] font-medium'>
              <div className='mr-[5px]'>
                <Image
                  src='/assets/location-big.png'
                  width={30}
                  height={30}
                  alt='location icon'
                />
              </div>
              수원시 영통구
            </div>
            <div className='flex py-[14px]'>
              <div className='bg-primary-100 h-[100px] w-[100px] rounded-[10px]'></div>
              <div className='ml-[30px]'>
                <span className='block text-[36px] font-medium'>10°C</span>
                <span className='block text-[24px] font-medium'>맑음</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
