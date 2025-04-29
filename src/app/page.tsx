'use client';

import Navigation from '@/app/_components/nav/Navigation';
import ProgressBar from '@/app/_components/tasks/ProgressBar';
import TaskListItem from '@/app/_components/tasks/TaskListItem';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import TaskModal from './_components/tasks/TaskModal';
import useGetTaskQuery from './_hooks/useGetTaskQuery';
import { rehydrateAuthStore, useAuthStore } from './store/authStore';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [today, setToday] = useState('');
  const [finishedTaskCount, setFinishedTaskCount] = useState(0);

  const router = useRouter();
  const { data: taskList = [] } = useGetTaskQuery('day');

  const getCurrentTime = () => {
    const currentDate = new Date();
    const timeString = Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(currentDate);

    setCurrentTime(timeString);
  };

  const addTask = () => setIsOpen(true);

  useEffect(() => {
    rehydrateAuthStore();
    
    const { accessToken } = useAuthStore.getState();
    if (accessToken === null) {
      router.push('/login');
    }

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
    setFinishedTaskCount(taskList.filter(task => task.is_completed).length);
  }, [taskList]);

  return (
    <div className='text-secondary-500 flex h-full min-h-screen flex-col bg-[#F5F5F7] sm:min-w-[1440px] sm:flex-row'>
      <Navigation />
      <div className='w-full min-w-[400px] bg-[#FAFAFA] sm:min-w-[752px]'>
        <div className='p-[32px]'>
          <div className='flex justify-between'>
            <div>
              <p className='text-secondary-500 text-[30px] font-semibold sm:text-[34px]'>
                오늘의 일정
              </p>
              <span className='text-primary-500 text-[22px] font-semibold sm:text-[30px]'>
                {today}
              </span>
            </div>
            <div className='flex items-end'>
              <button
                onClick={addTask}
                className='bg-primary-400 hover:bg-primary-500 h-[50px] w-[50px] cursor-pointer rounded-[10px] bg-[url(/assets/plus-big.png)] bg-center bg-no-repeat'
              ></button>
            </div>
          </div>
          <div className='text-secondary-500 mt-[35px] mb-[12px] flex justify-between text-[20px] font-semibold'>
            <span>Task Done</span>
            <span>{`${finishedTaskCount} / ${taskList.length}`}</span>
          </div>
          <ProgressBar
            finishedTaskCount={finishedTaskCount}
            totalTaskCount={taskList.length}
          />
          <div className='text-secondary-500 mt-[14px]'>
            {taskList.length === 0 ? (
              <div className='mt-30 text-center'>일정이 없습니다</div>
            ) : (
              <ul className='flex flex-col gap-y-[10px]'>
                {taskList.map(task => {
                  return <TaskListItem task={task} key={task.task_id} />;
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className='min-w-[400px] shrink-0 sm:w-[436px]'>
        <div className='px-[32px] py-[49px]'>
          <div className='text-secondary-500 text-[24px] font-medium sm:text-[40px]'>
            {currentTime}
          </div>
          <div className='text-secondary-500 bg-primary-0 border-primary-100 mt-[26px] w-full rounded-[10px] border-1 px-[22px] py-[17px]'>
            <div className='flex items-center text-[20px] font-medium sm:text-[24px]'>
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
                <span className='block text-[32px] font-medium sm:text-[36px]'>
                  10°C
                </span>
                <span className='block text-[20px] font-medium sm:text-[24px]'>
                  맑음
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TaskModal
        mode='add'
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        task={null}
        type='day'
      />
    </div>
  );
}
