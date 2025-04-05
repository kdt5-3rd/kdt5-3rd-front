'use client';

import BoardTitle from '@/app/_components/common/BoardTitle';
import Navigation from '@/app/_components/nav/Navigation';
import ProgressBar from '@/app/_components/tasks/ProgressBar';
import TaskListItem from '@/app/_components/tasks/TaskListItem';
import { formatTime } from '@/app/_utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface SchedlueItem {
  id: number;
  title: string;
}

export default function Daily() {
  const scheduleTypes: SchedlueItem[] = [
    { id: 0, title: 'Day' },
    { id: 1, title: 'Week' },
    { id: 2, title: 'Month' },
  ];
  const [activeScheduleIndex, setActiveScheduleIndex] = useState(0);
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
      place_name: 'Cafe DEF',
      location: { lat: '127.1086228', lng: '37.4012191' },
      is_completed: false,
    },
  ]);
  const [pendingTask, setPendingTask] = useState<typeof mockData>([]);
  const [finishedTaskCount, setFinishedTaskCount] = useState(0);

  const handleScheduleTypeClick = (index: number) => {
    setActiveScheduleIndex(index);
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
    setFinishedTaskCount(mockData.filter(task => task.is_completed).length);
    setPendingTask(mockData.filter(task => !task.is_completed));
  }, [mockData]);

  return (
    <div className='text-secondary-500 inline-flex h-full min-h-screen w-full bg-[#FAFAFA]'>
      <Navigation />
      <div className='bg-primary-0 h-full w-full min-w-[752px]'>
        <div className='flex flex-col'>
          <BoardTitle title={'오늘의 일정'}>
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
          <div className='flex h-full bg-[#FAFAFA] px-[32px] py-[24px]'>
            <div className='flex gap-[34px]'>
              <div className='min-w-[752px]'>
                <div className='mb-[18px] flex justify-between'>
                  <span className='text-[24px] font-semibold'>Todos</span>
                  <button className='bg-primary-400 hover:bg-primary-500 h-[40px] w-[40px] cursor-pointer rounded-[10px] bg-[url(/assets/plus-small.png)] bg-center bg-no-repeat'></button>
                </div>
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
              <div className='min-w-[400px]'>
                <div className='mb-[18px]'>
                  <span className='text-[24px] font-semibold'>Next moves</span>
                </div>
                <div className='flex flex-col gap-[18px]'>
                  {pendingTask.map((task, index) => {
                    return (
                      <div
                        key={task.task_id}
                        className='bg-primary-0 border-primary-200 w-full rounded-[10px] border-1 px-[64px] py-[23px]'
                      >
                        <div className='mb-[10px] flex items-center justify-between'>
                          <div>
                            <span className='mr-[10px] text-[20px] font-bold'>
                              출발
                            </span>
                            <span className='text-[20px] font-semibold'>
                              {mockData[0].task_id === task.task_id
                                ? 'House'
                                : index === 0
                                  ? mockData[task.task_id - 2].place_name
                                  : pendingTask[index - 1].place_name}
                            </span>
                          </div>
                          <span>{formatTime(task.start_time)}</span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <div>
                            <span className='mr-[10px] text-[20px] font-bold'>
                              도착
                            </span>
                            <span className='text-[20px] font-semibold'>
                              {task.place_name}
                            </span>
                          </div>
                          <span>{formatTime(task.start_time)}</span>
                        </div>
                        <div className='bg-primary-0 border-primary-200 mt-[20px] flex h-[180px] items-center justify-center rounded-[10px] border-1'>
                          <Image
                            src='/assets/map.png'
                            width={40}
                            height={40}
                            alt='map icon'
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
