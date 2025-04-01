import { ComponentPropsWithRef, ReactNode } from 'react';

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  children: ReactNode;
  className?: string;
}

function SubmitButton({ children, className = '', ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`${className} cursor-pointer rounded-xl bg-[#546FFF] px-[120px] py-[12px] text-[22px] font-bold text-[#FFFFFF] disabled:cursor-default disabled:opacity-40`}
    >
      {children}
    </button>
  );
}

export default SubmitButton;
