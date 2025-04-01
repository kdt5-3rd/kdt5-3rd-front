'use client';

import TaskListItem from '@/app/_components/tasks/TaskListItem';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const handleNavClick = (index: number) => {
    setActiveNavIndex(index);
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

    console.log(today);
  }, [today]);

  return (
    <div className='flex h-full min-h-screen min-w-[1440px] bg-[#FAFAFA]'>
      <div className='bg-primary-0 relative w-[252px] shrink-0 px-[32px]'>
        <div className='text-primary-900 mt-[44px] text-center text-[24px] font-bold'>
          똘개비
        </div>
        <ul className='text-secondary-300 mt-[52px] flex flex-col gap-y-[24px]'>
          <li
            className={`flex cursor-pointer items-center px-[20px] py-[10px] hover:rounded-[10px] ${activeNavIndex === 0 ? 'text-secondary-500 rounded-[10px] bg-[#F5F5F7]' : 'hover:bg-[#F5F5F7]'}`}
            onClick={() => handleNavClick(0)}
          >
            <Image
              src={`${activeNavIndex === 0 ? '/assets/category-dark.png' : '/assets/category.png'}`}
              width={24}
              height={24}
              alt='category icon'
            />
            <span className='ml-[12px] text-[14px] font-semibold'>Home</span>
          </li>
          <li
            className={`flex cursor-pointer items-center px-[20px] py-[10px] hover:rounded-[10px] ${activeNavIndex === 1 ? 'text-secondary-500 rounded-[10px] bg-[#F5F5F7]' : 'hover:bg-[#F5F5F7]'}`}
            onClick={() => handleNavClick(1)}
          >
            <Image
              src={`${activeNavIndex === 1 ? '/assets/book-dark.png' : '/assets/book.png'}`}
              width={24}
              height={24}
              alt='book icon'
            />
            <span className='ml-[12px] text-[14px] font-semibold'>
              일정 관리
            </span>
          </li>
        </ul>

        <div className='text-secondary-300 hover:text-secondary-500 absolute bottom-[24px] flex cursor-pointer items-center px-[20px] py-[10px] hover:rounded-[10px]'>
          <Image
            src={isLoggedIn ? '/assets/logout.png' : '/assets/login.png'}
            width={24}
            height={24}
            alt='logout icon'
          />

          {isLoggedIn ? (
            <span className='ml-[12px] text-[14px] font-semibold'>
              로그아웃
            </span>
          ) : (
            <span className='ml-[12px] text-[14px] font-semibold'>로그인</span>
          )}
        </div>
      </div>
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
            <span>1/5</span>
          </div>
          <div className='relative h-[8px] rounded-[8px] bg-[#546fff47]'>
            <div className='bg-primary-500 h-[8px] w-[140px] rounded-[8px]'></div>
            <div className='bg-primary-500 border-primary-0 absolute top-[-4px] left-[132px] h-[16px] w-[16px] rounded-[16px] border-2'></div>
          </div>
          <div className='text-secondary-500 mt-[14px]'>
            <ul className='flex flex-col gap-y-[10px]'>
              {mockData.map((task, index) => {
                return (
                  <TaskListItem
                    task={task}
                    index={index}
                    key={index}
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
            7:10 AM
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
