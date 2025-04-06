import { ComponentPropsWithRef, ReactNode } from 'react';

interface NormalInputProps extends ComponentPropsWithRef<'input'> {
  children?: ReactNode;
  className?: string;
}

function NormalInput({ children, className = '', ...rest }: NormalInputProps) {
  return (
    <div
      className={`${className} flex gap-[16px] rounded-lg border border-[#BAC8FF] bg-[#FFFFFF] p-[16px] placeholder-[#54577A]`}
    >
      {children}
      <input
        {...rest}
        className='flex-1 outline-none read-only:cursor-default'
      />
    </div>
  );
}

export default NormalInput;
