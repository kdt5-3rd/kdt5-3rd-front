'use client';

import useOutsideClick from '@/app/_hooks/useOutSideClick';
import { TaskCalendar } from '@/app/_types';
import { applyTimeToDate } from '@/app/_utils/dateTimeUtil';
import { format } from 'date-fns';
import { ChangeEvent, useEffect, useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';

interface DayPickerProps {
  closeModal: () => void;
  onChange: (
    field: keyof TaskCalendar,
    e?: ChangeEvent<HTMLTextAreaElement>,
    value?: Date,
  ) => void;
  value: DateRange;
}

interface TimeRange {
  from: string;
  to: string;
}

function DayPickerModal({ closeModal, onChange, value }: DayPickerProps) {
  const today = new Date();
  const pickerRef = useOutsideClick(closeModal);
  const [selected, setSelected] = useState<DateRange>({
    from: value.from ?? today,
    to: value.to ?? today,
  });
  const [timeValue, setTimeValue] = useState<TimeRange>({
    from: value.from ? format(value.from, 'HH:mm') : '00:00',
    to: value.to ? format(value.to, 'HH:mm') : '00:00',
  });

  const handleTimeChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: 'from' | 'to',
  ) => {
    const time = e.target.value;
    const date = selected[field];

    if (!date) {
      return setTimeValue(prev => ({ ...prev, [field]: time }));
    }

    setSelected(prev => ({ ...prev, [field]: applyTimeToDate(date, time) }));
    setTimeValue(prev => ({ ...prev, [field]: time }));
  };

  const handleDaySelect = (dates: DateRange) => {
    if (!dates.from || !dates.to) {
      return setSelected(dates);
    }

    setSelected({
      from: applyTimeToDate(dates.from, timeValue.from),
      to: applyTimeToDate(dates.to, timeValue.to),
    });
  };

  useEffect(() => {
    if (!selected) return;

    onChange('start_time', undefined, selected.from);
    onChange('end_time', undefined, selected.to ?? selected.from);
  }, [selected, onChange]);

  return (
    <div
      ref={pickerRef}
      className='bg-primary-0 absolute z-999 mt-[46px] flex gap-[10px] rounded-[10px] p-2.5 shadow-lg'
    >
      <DayPicker
        required
        animate
        mode='range'
        selected={selected}
        onSelect={handleDaySelect}
        defaultMonth={selected.from ?? today}
        min={1}
      />
      <div className='flex flex-col gap-[10px]'>
        <label htmlFor='startTime'>시작 시각</label>
        <input
          id='startTime'
          type='time'
          value={timeValue.from}
          onChange={e => handleTimeChange(e, 'from')}
          min={'14:00'}
        />
        <label htmlFor='endTime'>종료 시각</label>
        <input
          id='endTime'
          type='time'
          value={timeValue.to}
          onChange={e => handleTimeChange(e, 'to')}
        />
      </div>
    </div>
  );
}

export default DayPickerModal;
