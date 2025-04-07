import { ComponentPropsWithRef, ReactNode } from 'react';

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  children: ReactNode;
  className?: string;
}

function SubmitButton({ children, className = '', ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`${className} text-primary-0 bg-primary-500 cursor-pointer rounded-xl px-[120px] py-[12px] text-[22px] font-bold disabled:cursor-default disabled:opacity-40`}
    >
      {children}
    </button>
  );
}

export default SubmitButton;
