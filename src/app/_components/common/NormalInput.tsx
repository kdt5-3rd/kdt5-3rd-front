import { ComponentPropsWithRef, ReactNode } from 'react';

interface NormalInputProps extends ComponentPropsWithRef<'input'> {
  children?: ReactNode;
  className?: string;
}

function NormalInput({ children, className = '', ...rest }: NormalInputProps) {
  return (
    <div
      className={`${className} bg-primary-0 border-primary-200 placeholder-secondary-400 flex gap-[16px] rounded-lg border p-[16px]`}
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
