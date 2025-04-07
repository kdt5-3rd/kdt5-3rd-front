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

  const adjustHeight = () => {
    const ref = textareaRef.current;

    if (ref) {
      ref.style.height = 'auto';
      ref.style.height = ref.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    if (!value) return;

    adjustHeight();
  }, [value]);

  return (
    <div
      className={`${className} flex gap-[16px] rounded-lg border border-[#BAC8FF] bg-[#FFFFFF] p-[16px] placeholder-[#54577A]`}
    >
      {children}
      <textarea
        {...rest}
        ref={textareaRef}
        value={value}
        onInput={adjustHeight}
        className='scroll-none flex-1 resize-none outline-none'
      />
    </div>
  );
}

export default NormalTextarea;
