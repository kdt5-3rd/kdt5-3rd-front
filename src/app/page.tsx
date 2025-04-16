'use client';

import Navigation from '@/app/_components/nav/Navigation';
import ProgressBar from '@/app/_components/tasks/ProgressBar';
import TaskListItem from '@/app/_components/tasks/TaskListItem';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchDailyTask } from './_apis/fetchTasks';
import { TaskPayload } from './_types';

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState('');
  const [today, setToday] = useState('');
  const [taskList, setTaskList] = useState<TaskPayload[]>([]);
  const [finishedTaskCount, setFinishedTaskCount] = useState(0);

  const getTodayTask = async (todayDate: Date) => {
    try {
      const result = await fetchDailyTask(todayDate);
      setTaskList(result);
    } catch (error) {
      console.error('오늘의 일정을 불러오는 중 에러가 발생했습니다. ', error);
    }
  };

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
    setTaskList(prev =>
      prev.map(task =>
        task.task_id === taskId
          ? { ...task, is_completed: !task.is_completed }
          : task,
      ),
    );
  };

  useEffect(() => {
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
    getTodayTask(todayDate);
  }, []);

  useEffect(() => {
    setFinishedTaskCount(taskList.filter(task => task.is_completed).length);
  }, [taskList]);

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
            <span>{`${finishedTaskCount} / ${taskList.length}`}</span>
          </div>
          <ProgressBar
            finishedTaskCount={finishedTaskCount}
            totalTaskCount={taskList.length}
          />
          <div className='text-secondary-500 mt-[14px]'>
            <ul className='flex flex-col gap-y-[10px]'>
              {taskList.map((task, index) => {
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
