import { ReactNode } from 'react';

interface BoardTitleProps {
  title: string;
  children?: ReactNode;
}

function BoardTitle(props: BoardTitleProps) {
  return (
    <div className='flex flex-col gap-[24px] p-[32px]'>
      <p className='text-[30px] sm:text-[34px] font-semibold'>{props.title}</p>
      {props.children}
    </div>
  );
}

export default BoardTitle;
