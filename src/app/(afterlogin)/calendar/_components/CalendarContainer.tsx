import { ReactNode } from 'react';

interface CalendarContainerProps {
  children: ReactNode;
}

function CalendarContainer({ children }: CalendarContainerProps) {
  return (
    <div className='bg-[#FAFAFA] px-[32px] py-[24px]'>
      <div className='mb-[24px] flex items-center justify-between'>
        <span className='text-[24px] font-semibold'>Todos</span>
        <button className='bg-primary-400 hover:bg-primary-500 h-[40px] w-[40px] cursor-pointer rounded-[10px] bg-[url(/assets/plus-small.png)] bg-center bg-no-repeat'></button>
      </div>
      {children}
    </div>
  );
}

export default CalendarContainer;
