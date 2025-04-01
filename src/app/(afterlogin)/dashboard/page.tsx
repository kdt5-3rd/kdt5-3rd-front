'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Dashboard() {
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mockData, setMockData] = useState([
    {
      task_id: 1,
      title: '일어나기',
      memo: '',
      start_time: '2025-03-11T13:00:00',
      end_time: '',
      address: '경기도 수원시 ...',
      place_name: 'Cafe ABC',
      location: null,
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
    setMockData(prev => {
      return prev.map(task => {
        if (task.task_id === taskId) {
          return {
            ...task,
            is_completed: !task.is_completed,
          };
        }
        return task;
      });
    });
  };

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
                2025. 04. 01 Tuesday
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
                  <li className='flex' key={index}>
                    <div
                      className={`bg-primary-0 flex min-h-[76px] w-full items-center rounded-l-[10px] border-1 px-[23px] py-[18px] ${task.is_completed ? 'bg-primary-300 border-primary-300' : 'bg-primary-0 border-primary-100'}`}
                    >
                      <div className='flex w-full items-start'>
                        <input
                          type='checkbox'
                          checked={task.is_completed}
                          onChange={() => handleCheckClick(task.task_id)}
                          className={
                            'bg-primary-100 checked:bg-primary-0 h-[30px] w-[30px] cursor-pointer appearance-none rounded-[10px] bg-[auto_26px] checked:bg-[url(/assets/check.png)] checked:bg-center checked:bg-no-repeat'
                          }
                        />
                        <div
                          className={`flex w-full justify-between ${task.is_completed ? 'text-primary-100' : 'text-secondary-500'}`}
                        >
                          <div
                            className={`ml-[19px] text-[20px] font-semibold ${task.is_completed && 'line-through'}`}
                          >
                            <span>{task.title}</span>
                            {task.location && (
                              <div className='mt-[10px] mb-[10px] flex text-[16px] font-medium'>
                                <div className='mr-[5px] h-[20px] w-[20px]'>
                                  <Image
                                    src='/assets/location.png'
                                    width={20}
                                    height={20}
                                    alt='location icon'
                                  />
                                </div>
                                {task.place_name}
                              </div>
                            )}
                            {task.memo && (
                              <ul className='flex list-disc flex-col gap-y-[6px] text-[16px] font-medium'>
                                <li className='ml-[20px]'>{task.memo}</li>
                              </ul>
                            )}
                          </div>
                          <div className='text-right text-[20px] font-medium'>
                            {task.start_time && (
                              <span>
                                {new Intl.DateTimeFormat('en-US', {
                                  hour: 'numeric',
                                  minute: '2-digit',
                                  hour12: true,
                                }).format(new Date(task.start_time))}
                              </span>
                            )}
                            {task.end_time && (
                              <>
                                <span className='block'>~</span>
                                <span>
                                  {new Intl.DateTimeFormat('en-US', {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true,
                                  }).format(new Date(task.end_time))}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`group relative min-h-[76px] w-[10px] rounded-r-[10px] transition-all duration-300 hover:w-[97px] hover:cursor-pointer ${task.is_completed ? 'bg-primary-100' : 'bg-primary-300'}`}
                    >
                      <div className='text-primary-0 invisible absolute top-0 left-0 flex h-full flex-col text-[18px] font-medium group-hover:visible'>
                        <button className='bg-primary-500 hover:bg-primary-600 h-full w-0 cursor-pointer overflow-hidden text-ellipsis transition-all duration-300 group-hover:w-[75px]'>
                          <span className='transform opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100'>
                            수정
                          </span>
                        </button>
                        <button className='bg-error-600 hover:bg-error-700 h-full w-0 cursor-pointer overflow-hidden text-ellipsis transition-all duration-300 group-hover:w-[75px]'>
                          <span className='transform opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100'>
                            삭제
                          </span>
                        </button>
                      </div>
                    </div>
                  </li>
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
