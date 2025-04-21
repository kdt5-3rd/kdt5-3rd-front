'use client';

import BoardTitle from '@/app/_components/common/BoardTitle';
import Navigation from '@/app/_components/nav/Navigation';
import TaskListItem from '@/app/_components/tasks/TaskListItem';
import { TaskPayload } from '@/app/_types';
import { formatTime } from '@/app/_utils/dateTimeUtil';
import { useEffect, useState } from 'react';
import CalendarType from '../_components/CalendarType';
import Progress from '../_components/Progress';
import MapDisplay from '../_components/MapDisplay';
import TaskModal from '@/app/_components/tasks/TaskModal';
import useGetTaskQuery from '@/app/_hooks/useGetTaskQuery';

export default function Daily() {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingTask, setPendingTask] = useState<TaskPayload[]>([]);
  const [finishedTaskCount, setFinishedTaskCount] = useState(0);

  const { data: taskList = [] } = useGetTaskQuery('day');

  const addTask = () => setIsOpen(true);

  useEffect(() => {
    setFinishedTaskCount(taskList.filter(task => task.is_completed).length);
    setPendingTask(taskList.filter(task => !task.is_completed));
  }, [taskList]);

  return (
    <div className='text-secondary-500 inline-flex h-full min-h-screen w-full bg-[#FAFAFA]'>
      <Navigation />
      <div className='bg-primary-0 h-full w-full min-w-[752px]'>
        <div className='flex flex-col'>
          <BoardTitle title={'오늘의 일정'}>
            <CalendarType />
            <Progress
              finishedTaskCount={finishedTaskCount}
              totalTaskCount={taskList.length}
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
              {taskList.length === 0 ? (
                <div className='mt-30 w-full text-center'>일정이 없습니다</div>
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
                            {taskList[0].task_id === task.task_id
                              ? 'House'
                              : index === 0
                                ? taskList[task.task_id - 2].place_name
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
                        <span>{formatTime(task.end_time)}</span>
                      </div>
                      <div className='bg-primary-0 border-primary-200 mt-[20px] flex h-[180px] items-center justify-center rounded-[10px] border-1'>
                        <MapDisplay
                          taskId={task.task_id}
                          location={{ lat: task.latitude, lng: task.longitude }}
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
