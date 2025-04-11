'use client';

import BoardTitle from '@/app/_components/common/BoardTitle';
import Navigation from '@/app/_components/nav/Navigation';
import TaskListItem from '@/app/_components/tasks/TaskListItem';
import { TaskPayload } from '@/app/_types';
import { formatTime } from '@/app/_utils';
import { useEffect, useState } from 'react';
import CalendarType from '../_components/CalendarType';
import Progress from '../_components/Progress';
import MapDisplay from '../_components/MapDisplay';
import TaskModal from '@/app/_components/tasks/TaskModal';

export default function Daily() {
  const [isOpen, setIsOpen] = useState(false);
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
      location: { lat: '37.484543', lng: '127.010808' },
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
      location: { lat: '37.498014', lng: '127.027616' },
      is_completed: false,
    },
  ]);
  const [pendingTask, setPendingTask] = useState<TaskPayload[]>([]);
  const [finishedTaskCount, setFinishedTaskCount] = useState(0);

  const handleCheckClick = (taskId: number) => {
    setMockData(prev =>
      prev.map(task =>
        task.task_id === taskId
          ? { ...task, is_completed: !task.is_completed }
          : task,
      ),
    );
  };

  const addTask = () => setIsOpen(true);

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
            <CalendarType />
            <Progress
              finishedTaskCount={finishedTaskCount}
              totalTaskCount={mockData.length}
            />
          </BoardTitle>
          <div className='flex h-full justify-between bg-[#FAFAFA] px-[32px] py-[24px]'>
            <div className='mr-[34px] min-w-[752px]'>
              <div className='mb-[18px] flex justify-between'>
                <span className='text-[24px] font-semibold'>Todos</span>
                <button
                  onClick={addTask}
                  className='bg-primary-400 hover:bg-primary-500 h-[40px] w-[40px] cursor-pointer rounded-[10px] bg-[url(/assets/plus-small.png)] bg-center bg-no-repeat'
                ></button>
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
                        <MapDisplay taskId={task.task_id} location={task.location} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <TaskModal mode='add' isOpen={isOpen} setIsOpen={setIsOpen} task={null} />
    </div>
  );
}
