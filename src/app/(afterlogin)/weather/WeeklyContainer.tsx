import { ReactNode } from 'react';

interface WeeklyContainerProps {
  children: ReactNode;
}

function WeeklyContainer({ children }: WeeklyContainerProps) {
  return (
    <div className='border-primary-200 bg-primary-0 flex flex-col items-center justify-center gap-[16px] rounded-2xl border px-[30px] py-[26px]'>
      {children}
    </div>
  );
}

export default WeeklyContainer;
