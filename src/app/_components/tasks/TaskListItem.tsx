import { formatTime } from '@/app/_utils/dateTimeUtil';
import Image from 'next/image';
import TaskModal from './TaskModal';
import { useState } from 'react';
import { TaskPayload } from '@/app/_types';
import useDeleteTaskMutation from '@/app/_hooks/useDeleteTaskMutation';
import useEditTaskMutation from '@/app/_hooks/useEditTaskMutation';

interface TaskProps {
  task: TaskPayload;
}

function TaskListItem({ task }: TaskProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: editTaskMutate } = useEditTaskMutation('day');
  const { mutate: deleteTaskMutate } = useDeleteTaskMutation('day');

  const editTask = () => {
    setIsOpen(true);
  };

  const editCheck = () => {
    const updatedTask = {
      ...task,
      is_completed: !task.is_completed,
    };
    editTaskMutate(updatedTask);
  };

  const handleDeleteTask = () => {
    deleteTaskMutate(task.task_id);
    setIsOpen(false);
  };

  return (
    <>
      <li className='flex' key={task.task_id}>
        <div
          className={`bg-primary-0 flex min-h-[76px] w-full items-center rounded-l-[10px] border-1 px-[23px] py-[18px] ${task.is_completed ? 'bg-primary-400 border-primary-300' : 'bg-primary-0 border-primary-100'}`}
        >
          <div className='flex w-full items-start'>
            <input
              type='checkbox'
              checked={task.is_completed}
              onChange={() => editCheck()}
              className={
                'bg-primary-200 checked:bg-primary-0 h-[30px] w-[30px] cursor-pointer appearance-none rounded-[10px] bg-[auto_26px] checked:bg-[url(/assets/check.png)] checked:bg-center checked:bg-no-repeat'
              }
            />
            <div
              className={`flex w-full justify-between ${task.is_completed ? 'text-primary-100' : 'text-secondary-500'}`}
            >
              <div
                className={`ml-[19px] text-[20px] font-semibold ${task.is_completed && 'line-through'}`}
              >
                <span>{task.title}</span>
                {task.from_place_name && (
                  <div className='mt-[10px] mb-[10px] flex text-[16px] font-medium'>
                    <div className='mr-[5px] h-[20px] w-[20px]'>
                      <Image
                        src={`${task.is_completed ? '/assets/location-light.png' : '/assets/location.png'}`}
                        width={20}
                        height={20}
                        alt='location icon'
                      />
                    </div>
                    <span className='mr-[6px]'>출발 : </span>
                    {task.from_place_name}
                  </div>
                )}
                {task.place_name && (
                  <div className='mt-[10px] mb-[10px] flex text-[16px] font-medium'>
                    <div className='mr-[5px] h-[20px] w-[20px]'>
                      <Image
                        src={`${task.is_completed ? '/assets/location-light.png' : '/assets/location.png'}`}
                        width={20}
                        height={20}
                        alt='location icon'
                      />
                    </div>
                    <span className='mr-[6px]'>도착 : </span>
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
                {task.start_time && <span>{formatTime(task.start_time)}</span>}
                {task.end_time !== '' && task.end_time !== task.start_time && (
                  <>
                    <span className='block'>~</span>
                    <span>{formatTime(task.end_time)}</span>
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
            <button
              onClick={editTask}
              className='bg-primary-500 hover:bg-primary-600 h-full w-0 cursor-pointer overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:w-[75px]'
            >
              <span className='transform opacity-0 transition-all duration-300 group-hover:opacity-100'>
                수정
              </span>
            </button>
            <button
              onClick={handleDeleteTask}
              className='bg-error-600 hover:bg-error-700 h-full w-0 cursor-pointer overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:w-[75px]'
            >
              <span className='transform opacity-0 transition-all duration-300 group-hover:opacity-100'>
                삭제
              </span>
            </button>
          </div>
        </div>
      </li>
      <TaskModal
        mode={'edit'}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        task={task}
        type='day'
      />
    </>
  );
}

export default TaskListItem;
