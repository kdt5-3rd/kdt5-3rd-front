import { isAfter, isEqual, isSameDay } from 'date-fns';

export const validateIsBlank = (value: string) => {
  if (value === '') return true;
  return false;
};

/**
 * 같은 날짜일 때, 시작 시간이 종료 시간보다 늦은지 여부를 검증합니다.
 *
 * - 날짜가 다르면 항상 `false`를 반환합니다.
 * - 시작과 종료 시각이 정확히 같아도 `false`를 반환합니다.
 * - 같은 날짜이고, 시작 시간이 종료 시간보다 늦을 경우에만 `true`를 반환합니다.
 *
 * @param start - 시작 시각 (Date 객체)
 * @param end - 종료 시각 (Date 객체)
 * @returns `true` - 같은 날짜이고 시작 시간이 종료 시간보다 늦을 경우
 *          `false` - 날짜가 다르거나, 같아도 시작 시간이 더 빠르거나 같은 경우
 */
export const validateIsAfterDateTime = (start: Date, end: Date) => {
  if (!isSameDay(start, end) || isEqual(start, end)) return false;

  return isAfter(start, end);
};
