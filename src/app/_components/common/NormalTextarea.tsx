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
  onChange,
  ...rest
}: NormalTextareaProps) {
  const [text, setText] = useState(value ?? '');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);

    if (onChange) onChange(e);
  };

  useEffect(() => {
    const ref = textareaRef.current;

    if (ref) {
      ref.style.height = 'auto';
      ref.style.height = ref.scrollHeight + 'px';
    }
  }, [text]);

  return (
    <div
      className={`${className} flex gap-[16px] rounded-lg border border-[#BAC8FF] bg-[#FFFFFF] p-[16px] placeholder-[#54577A]`}
    >
      {children}
      <textarea
        {...rest}
        ref={textareaRef}
        onChange={handleChange}
        className='scroll-none flex-1 resize-none outline-none'
      />
    </div>
  );
}

export default NormalTextarea;
