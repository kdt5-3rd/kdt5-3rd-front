import { ComponentPropsWithRef, ReactNode } from 'react';

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  children: ReactNode;
  className?: string;
}

function SubmitButton({ children, className = '', ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`${className} text-primary-0 bg-primary-500 cursor-pointer rounded-xl px-[120px] py-[12px] text-[16px] font-bold text-nowrap disabled:cursor-default disabled:opacity-40 sm:text-[22px]`}
    >
      {children}
    </button>
  );
}

export default SubmitButton;
