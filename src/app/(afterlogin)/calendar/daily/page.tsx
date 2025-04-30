'use client';

import BoardTitle from '@/app/_components/common/BoardTitle';
import Navigation from '@/app/_components/nav/Navigation';
import TaskListItem from '@/app/_components/tasks/TaskListItem';
import { TaskWithDuration } from '@/app/_types';
import { useEffect, useState } from 'react';
import CalendarType from '../_components/CalendarType';
import Progress from '../_components/Progress';
import MapDisplay from '../_components/MapDisplay';
import TaskModal from '@/app/_components/tasks/TaskModal';
import useGetTaskQuery from '@/app/_hooks/useGetTaskQuery';
import RouteInfo from '../_components/RouteInfo';
import { formatSecondToMinute } from '@/app/_utils/dateTimeUtil';
import { format } from 'date-fns';

export default function Daily() {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingTask, setPendingTask] = useState<TaskWithDuration[]>([]);
  const [finishedTaskCount, setFinishedTaskCount] = useState(0);

  const { data: taskList = [] } = useGetTaskQuery('day');

  const addTask = () => setIsOpen(true);

  useEffect(() => {
    setFinishedTaskCount(taskList.filter(task => task.is_completed).length);
    setPendingTask(taskList.filter(task => !task.is_completed));
  }, [taskList]);

  return (
    <div className='text-secondary-500 flex h-full min-h-screen w-full flex-col bg-[#FAFAFA] sm:inline-flex sm:min-w-[1500px] sm:flex-row'>
      <Navigation />
      <div className='bg-primary-0 h-full w-full sm:min-w-[752px]'>
        <div className='flex flex-col'>
          <BoardTitle title={'오늘의 일정'}>
            <CalendarType />
            <Progress
              finishedTaskCount={finishedTaskCount}
              totalTaskCount={taskList.length}
            />
          </BoardTitle>
          <div className='flex h-full flex-col justify-between bg-[#FAFAFA] px-[32px] py-[24px] sm:flex-row'>
            <div className='mr-[34px] mb-[20px] w-full min-w-[400px] sm:min-w-[752px]'>
              <div className='mb-[18px] flex justify-between'>
                <span className='text-[24px] font-semibold'>Todos</span>
                <button
                  onClick={addTask}
                  className='bg-primary-400 hover:bg-primary-500 h-[40px] w-[40px] cursor-pointer rounded-[10px] bg-[url(/assets/plus-small.png)] bg-center bg-no-repeat'
                ></button>
              </div>
              {taskList.length === 0 ? (
                <div className='mt-30 mb-30 w-full text-center sm:mb-0'>
                  일정이 없습니다
                </div>
              ) : (
                <ul className='flex flex-col gap-y-[10px]'>
                  {taskList.map(task => {
                    return <TaskListItem task={task} key={task.task_id} />;
                  })}
                </ul>
              )}
            </div>
            <div className='min-w-[400px]'>
              <div className='mb-[18px]'>
                <span className='text-[20px] font-semibold sm:text-[24px]'>
                  Next moves
                </span>
              </div>
              <div className='flex flex-col gap-[18px]'>
                {pendingTask
                  .filter(task => task.place_name !== '')
                  .map(task => {
                    return (
                      <div
                        key={task.task_id}
                        className='bg-primary-0 border-primary-200 w-full rounded-[10px] border-1 px-[64px] py-[23px]'
                      >
                        {task.from_place_name && (
                          <RouteInfo label='출발' task={task} />
                        )}
                        {task.place_name && (
                          <RouteInfo label='도착' task={task} />
                        )}
                        {task.travel_duration && (
                          <div className='mb-[10px] flex items-center justify-between'>
                            <div>
                              <span className='mr-[10px] text-[16px] font-bold sm:text-[20px]'>
                                소요시간
                              </span>
                            </div>
                            <span className='bg-primary-200 rounded-[5px] px-[4px] py-[2px] text-[14px] font-bold sm:text-[16px]'>
                              {formatSecondToMinute(task.travel_duration)}
                            </span>
                          </div>
                        )}
                        {task.travel_duration && (
                          <div className='flex items-center justify-between'>
                            <div>
                              <span className='mr-[10px] text-[16px] font-bold sm:text-[20px]'>
                                추천 출발시각
                              </span>
                            </div>
                            <span className='bg-primary-200 rounded-[5px] px-[4px] py-[2px] text-[14px] font-bold sm:text-[16px]'>
                              {format(
                                new Date(task.recommended_departure_time),
                                'hh:mm aa',
                              )}
                            </span>
                          </div>
                        )}
                        <div className='bg-primary-0 border-primary-200 mt-[20px] flex h-[180px] items-center justify-center rounded-[10px] border-1'>
                          <MapDisplay
                            taskId={task.task_id}
                            location={{
                              lat: task.latitude,
                              lng: task.longitude,
                            }}
                            enabled={
                              task.from_place_name !== '' &&
                              task.place_name !== ''
                            }
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
