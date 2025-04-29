import { ReactNode } from 'react';

interface SettingContainerProps {
  title: string;
  children: ReactNode;
}

function SettingContainer({ title, children }: SettingContainerProps) {
  return (
    <section className='flex flex-col gap-[16px]'>
      <div className='text-secondary-500 text-[14px] font-semibold'>
        {title}
      </div>
      {children}
    </section>
  );
}

export default SettingContainer;
