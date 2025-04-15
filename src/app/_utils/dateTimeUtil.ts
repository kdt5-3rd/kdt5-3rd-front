import { isBefore, isEqual, isSameDay, setHours, setMinutes } from 'date-fns';

export const formatTime = (date: string | Date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(date));
};

export const parseTimeString = (time: string): [number, number] => {
  const [hours, minutes] = time.split(':').map(str => parseInt(str, 10));
  return [hours, minutes];
};

export const applyTimeToDate = (date: Date, time: string) => {
  const [hours, minutes] = parseTimeString(time);
  return setHours(setMinutes(date, minutes), hours);
};

export const validateDateTime = (start: Date, end: Date) => {
  if (!isSameDay(start, end) || isEqual(start, end)) return true;

  return isBefore(start, end);
};
