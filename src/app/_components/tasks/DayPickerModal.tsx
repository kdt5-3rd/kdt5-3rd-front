'use client';

import { Task } from '@/app/_types';
import { format, formatISO, parseISO, setHours, setMinutes } from 'date-fns';
import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DayPicker } from 'react-day-picker';

interface DateAndTimePickerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onChange: (
    field: keyof Task,
    e?: ChangeEvent<HTMLTextAreaElement>,
    value?: string,
  ) => void;
  value: string;
}

function DayPickerModal({
  isOpen,
  setIsOpen,
  onChange,
  value,
}: DateAndTimePickerProps) {
  const pickerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Date>(
    value ? parseISO(value) : new Date(),
  );
  const [timeValue, setTimeValue] = useState<string>(
    value ? format(value, 'hh:mm') : '00:00',
  );

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = e => {
    const time = e.target.value;
    if (!selected) {
      setTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(':').map(str => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(selected, minutes), hours);
    setSelected(newSelectedDate);
    setTimeValue(time);
  };

  const handleDaySelect = (date: Date | undefined) => {
    if (!timeValue || !date) {
      if (date) setSelected(date);
      return;
    }
    const [hours, minutes] = timeValue.split(':').map(str => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
    );
    setSelected(newDate);
  };

  useEffect(() => {
    if (!selected) return;

    onChange('start_time', undefined, formatISO(selected));
  }, [selected, onChange]);

  useEffect(() => {
    if (!isOpen) return;

    const outsideClick = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', outsideClick);

    return () => document.removeEventListener('mousedown', outsideClick);
  }, [pickerRef, isOpen, setIsOpen]);

  return (
    <div
      ref={pickerRef}
      className='bg-primary-0 absolute mt-[46px] flex flex-col gap-[30px] rounded-[10px] p-2.5 shadow-lg'
    >
      <DayPicker
        animate
        mode='single'
        selected={selected}
        onSelect={handleDaySelect}
      />
      <input type='time' value={timeValue} onChange={handleTimeChange} />
    </div>
  );
}

export default DayPickerModal;
