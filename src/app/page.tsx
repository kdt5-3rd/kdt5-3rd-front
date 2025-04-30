'use client';

import Navigation from '@/app/_components/nav/Navigation';
import ProgressBar from '@/app/_components/tasks/ProgressBar';
import TaskListItem from '@/app/_components/tasks/TaskListItem';
import { useEffect, useState } from 'react';
import TaskModal from './_components/tasks/TaskModal';
import useGetTaskQuery from './_hooks/useGetTaskQuery';
import { rehydrateAuthStore, useAuthStore } from './store/authStore';
import { useRouter } from 'next/navigation';
import CurrentWeather from './(afterlogin)/weather/CurrentWeather';
import useGetLocationName from './_hooks/useGetLocationName';
import useGetWeatherQuery from './_hooks/useGetWeatherQuery';
import { getWeatherInfo } from './_utils/getWeatherInfo';
import DashBoardTopNews from './(afterlogin)/news/DashBoardTopNews';

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [today, setToday] = useState('');
  const [finishedTaskCount, setFinishedTaskCount] = useState(0);

  const router = useRouter();
  const { data: taskList = [] } = useGetTaskQuery('day');
  const { locationName } = useGetLocationName();
  const { data: weatherData } = useGetWeatherQuery();

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

  if (!weatherData) {
    return;
  }

  return (
    <div className='text-secondary-500 flex h-full min-h-screen flex-col sm:min-w-[1440px] sm:flex-row'>
      <Navigation />
      <div className='w-full min-w-[375px] bg-[#FAFAFA] sm:min-w-[752px]'>
        <div className='p-[24px] sm:p-[32px]'>
          <div className='flex justify-between'>
            <div>
              <p className='text-secondary-500 text-[30px] font-semibold sm:text-[34px]'>
                오늘의 일정
              </p>
              <span className='text-primary-500 text-[22px] font-semibold sm:text-[30px]'>
                {today}
              </span>
              <span className='block text-[24px] font-medium sm:hidden'>
                {currentTime}
              </span>
            </div>
            <div className='flex items-end'>
              <button
                onClick={addTask}
                className='bg-primary-400 hover:bg-primary-500 h-[30px] w-[30px] cursor-pointer rounded-[10px] bg-[url(/assets/plus-big.png)] bg-center bg-no-repeat sm:h-[50px] sm:w-[50px]'
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
      <div className='min-w-[375px] shrink-0 bg-[#F5F5F7] sm:w-[436px]'>
        <div className='flex flex-col gap-[20px] px-[24px] py-[20px] sm:gap-[26px] sm:px-[32px] sm:py-[49px]'>
          <div className='text-secondary-500 hidden text-[24px] font-medium sm:block sm:text-[40px]'>
            {currentTime}
          </div>
          <CurrentWeather
            location={locationName}
            temperature={`${weatherData.current?.temperature}°`}
            weatherInfo={getWeatherInfo(weatherData.current.weathercode)}
          />
          <DashBoardTopNews />
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
