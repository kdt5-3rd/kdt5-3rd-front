import {
  format,
  secondsToHours,
  secondsToMinutes,
  setHours,
  setMinutes,
} from 'date-fns';

export const formatTime = (date: string | Date) => {
  return format(date, 'h:mm a');
};

export const parseTimeString = (time: string): [number, number] => {
  const [hours, minutes] = time.split(':').map(str => parseInt(str, 10));
  return [hours, minutes];
};

export const applyTimeToDate = (date: Date, time: string) => {
  const [hours, minutes] = parseTimeString(time);
  return setHours(setMinutes(date, minutes), hours);
};

export const formatSecondToMinute = (timeString: string) => {
  const time = parseInt(timeString);
  const hour = secondsToHours(time);
  const minute = secondsToMinutes(time) - hour * 60;

  if (hour > 0) {
    return `${hour}시간 ${minute}분`;
  }
  return `${minute}분`;
};
