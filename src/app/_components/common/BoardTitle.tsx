import { ReactNode } from 'react';

interface BoardTitleProps {
  title: string;
  children?: ReactNode;
}

function BoardTitle(props: BoardTitleProps) {
  return (
    <div className='flex flex-col gap-[24px] px-[23.5px] py-[20px] sm:p-[32px]'>
      <p className='text-[30px] font-semibold sm:text-[34px]'>{props.title}</p>
      {props.children}
    </div>
  );
}

export default BoardTitle;
