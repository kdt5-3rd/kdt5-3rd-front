import { ReactNode } from 'react';

interface HourlyContainerProps {
  children: ReactNode;
}

function HourlyContainer({ children }: HourlyContainerProps) {
  return (
    <div className='border-primary-200 bg-primary-0 flex justify-around overflow-hidden rounded-2xl border px-[35px] py-[38px]'>
      {children}
    </div>
  );
}

export default HourlyContainer;
