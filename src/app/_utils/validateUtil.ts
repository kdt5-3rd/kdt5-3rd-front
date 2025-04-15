import { isBefore, isEqual, isSameDay } from 'date-fns';

export const validateBlank = (value: string) => {
  if (value === '') return false;
  return true;
};

export const validateDateTime = (start: Date, end: Date) => {
  if (!isSameDay(start, end) || isEqual(start, end)) return true;

  return isBefore(start, end);
};
