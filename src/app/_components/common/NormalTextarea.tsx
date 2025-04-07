'use client';

import {
  ChangeEvent,
  ComponentPropsWithRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

interface NormalTextareaProps extends ComponentPropsWithRef<'textarea'> {
  children?: ReactNode;
  className?: string;
}

function NormalTextarea({
  children,
  className = '',
  value,
  ...rest
}: NormalTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const ref = textareaRef.current;

    if (ref) {
      ref.style.height = 'auto';
      ref.style.height = ref.scrollHeight + 'px';
    }
  }, [value]);

  return (
    <div
      className={`${className} bg-primary-0 border-primary-200 placeholder-secondary-400 flex gap-[16px] rounded-lg border p-[16px]`}
    >
      {children}
      <textarea
        {...rest}
        ref={textareaRef}
        value={value}
        className='scroll-none flex-1 resize-none outline-none'
      />
    </div>
  );
}

export default NormalTextarea;
