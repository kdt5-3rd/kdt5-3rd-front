import TaskModal from '@/app/_components/tasks/TaskModal';
import { ReactNode, useState } from 'react';

interface CalendarContainerProps {
  children: ReactNode;
  type: 'week' | 'month';
}

function CalendarContainer({ children, type }: CalendarContainerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const addTask = () => setIsOpen(true);

  return (
    <>
      <div className='bg-[#FAFAFA] px-[32px] py-[24px]'>
        <div className='mb-[24px] flex items-center justify-between'>
          <span className='text-[24px] font-semibold'>Todos</span>
          <button
            onClick={addTask}
            className='bg-primary-400 hover:bg-primary-500 h-[40px] w-[40px] cursor-pointer rounded-[10px] bg-[url(/assets/plus-small.png)] bg-center bg-no-repeat'
          ></button>
        </div>
        {children}
      </div>
      <TaskModal mode='add' isOpen={isOpen} setIsOpen={setIsOpen} task={null} type={type} />
    </>
  );
}

export default CalendarContainer;
