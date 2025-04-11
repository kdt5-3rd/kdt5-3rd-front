'use client';

import useOutsideClick from '@/app/_hooks/useOutSideClick';
import { TaskCalendar } from '@/app/_types';
import { format, setHours, setMinutes } from 'date-fns';
import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { DayPicker } from 'react-day-picker';

interface DateAndTimePickerProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onChange: (
    field: keyof TaskCalendar,
    e?: ChangeEvent<HTMLTextAreaElement>,
    value?: Date,
  ) => void;
  value: Date;
}

function DayPickerModal({
  setIsOpen,
  onChange,
  value,
}: DateAndTimePickerProps) {
  const pickerRef = useOutsideClick(() => setIsOpen(false));
  const [selected, setSelected] = useState<Date>(value ?? new Date());
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

    onChange('start_time', undefined, selected);
  }, [selected, onChange]);

  return (
    <div
      ref={pickerRef}
      className='z-999 bg-primary-0 absolute mt-[46px] flex flex-col gap-[10px] rounded-[10px] p-2.5 shadow-lg'
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
