import { ComponentPropsWithRef, ReactNode } from 'react';

interface NormalInputProps extends ComponentPropsWithRef<'input'> {
  children?: ReactNode;
  className?: string;
  isError?: boolean;
}

function NormalInput({
  children,
  className = '',
  isError = false,
  ...rest
}: NormalInputProps) {
  return (
    <div
      className={`${className} ${isError ? 'border-error-600 border-2' : 'border-primary-200 border'} bg-primary-0 placeholder-secondary-400 flex gap-[16px] rounded-lg p-[12px] sm:p-[16px]`}
    >
      {children}
      <input
        {...rest}
        className='w-full text-[14px] flex-1 outline-none read-only:cursor-default'
      />
    </div>
  );
}

export default NormalInput;
