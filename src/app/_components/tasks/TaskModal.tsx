import Image from 'next/image';
import NormalInput from '../common/NormalInput';
import SubmitButton from '../common/SubmitButton';
import NormalTextarea from '../common/NormalTextarea';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { TaskCalendar, TaskPayload } from '@/app/_types';

import 'react-day-picker/style.css';
import DayPickerModal from './DayPickerModal';
import { format, isEqual as isDateEqual } from 'date-fns';
import LocationModal from './LocationModal';
import {
  validateIsAfterDateTime,
  validateIsBlank,
} from '@/app/_utils/validateUtil';
import isEqual from 'lodash/isEqual';
import { formatDateISO8601 } from '@/app/_utils/dateTimeUtil';
import useAddTaskMutation from '@/app/_hooks/useAddTaskMutation';
import useEditTaskMutation from '@/app/_hooks/useEditTaskMutation';
import useDeleteTaskMutation from '@/app/_hooks/useDeleteTaskMutation';
import { toZonedTime } from 'date-fns-tz';
import { GeoSearchResult } from '@/app/_types/location';

export type ModalMode = 'add' | 'edit' | 'detail';

interface TaskModalProps {
  mode: ModalMode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  task: TaskPayload | TaskCalendar | null;
  type: 'day' | 'week' | 'month';
}

const modalMode: Record<
  ModalMode,
  { title: string; buttonLabel: string; deleteButtonLabel?: string }
> = {
  add: {
    title: 'Todo 추가',
    buttonLabel: '추가',
  },
  edit: {
    title: 'Todo 수정',
    buttonLabel: '수정',
  },
  detail: {
    title: 'Todo 상세',
    buttonLabel: '수정',
    deleteButtonLabel: '삭제',
  },
};

const initialTask = {
  task_id: 0,
  title: '',
  memo: '',
  start_time: new Date(),
  end_time: new Date(),
  address: '',
  place_name: '',
  latitude: 0,
  longitude: 0,
  from_lat: 0,
  from_lng: 0,
  from_address: '',
  from_place_name: '',
  route_option: 'trafast',
  is_completed: false,
};

const normalizeTaskDate = (task: TaskPayload | TaskCalendar): TaskCalendar => {
  if (task.start_time instanceof Date) return task as TaskCalendar;

  const start_time = new Date(toZonedTime(task.start_time, 'UTC'));
  const end_time = task.end_time
    ? new Date(toZonedTime(task.end_time, 'UTC'))
    : start_time;

  return { ...task, start_time, end_time };
};

const renderDate = (start: Date, end: Date) => {
  const startDate = format(start, 'yyyy/MM/dd');
  const startTime = format(start, 'hh:mm a');

  if (isDateEqual(start, end)) {
    return (
      <span className='whitespace-nowrap'>
        <strong>{startDate}</strong> {startTime}
      </span>
    );
  }

  const endDate = format(end, 'yyyy/MM/dd');
  const endTime = format(end, 'hh:mm a');

  return (
    <span>
      <strong>{startDate}</strong> {startTime} ~ <strong>{endDate}</strong>{' '}
      {endTime}
    </span>
  );
};

type NestedModalType =
  | null
  | { type: 'dayPicker' }
  | { type: 'location'; target: 'place_name' | 'from_place_name' };

function TaskModal({ mode, isOpen, setIsOpen, task, type }: TaskModalProps) {
  const [openModal, setOpenModal] = useState<NestedModalType>(null);
  const [isInvalidDate, setIsInvalidDate] = useState(false);
  const [isInvalidTitle, setIsInvalidTitle] = useState(false);
  const [isInvalidValue, setIsInvalidValue] = useState(true);
  const [value, setValue] = useState<TaskCalendar>(
    task ? normalizeTaskDate(task) : initialTask,
  );
  const BASE_STYLE =
    'flex gap-[20px] *:first:text-[16px] sm\*:first:text-xl *:first:font-semibold *:last:flex-1';

  const { mutate: addTaskMutate } = useAddTaskMutation(type);
  const { mutate: editTaskMutate } = useEditTaskMutation(type, task?.task_id);
  const { mutate: deleteTaskMutate } = useDeleteTaskMutation(type);

  const handleFieldChange = useCallback(
    (
      field: keyof TaskCalendar,
      e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      value?: Date,
    ) => {
      setValue(prev => ({
        ...prev,
        [field]: e ? e.target.value : value,
      }));
    },
    [],
  );

  const handlePlaceChange = (place: GeoSearchResult, target: string) => {
    if (target === 'from_place_name') {
      setValue(prev => ({
        ...prev,
        from_lng: place.mapx,
        from_lat: place.mapy,
        from_place_name: place.title,
        from_address: place.address,
      }));
    } else {
      setValue(prev => ({
        ...prev,
        longitude: place.mapx,
        latitude: place.mapy,
        place_name: place.title,
        address: place.address,
      }));
    }
  };

  const handleSaveTask = () => {
    const newTask: TaskPayload = {
      ...value,
      start_time: formatDateISO8601(value.start_time),
      end_time: formatDateISO8601(value.end_time),
    };

    switch (mode) {
      case 'add':
        addTaskMutate(newTask);
        setIsOpen(false);
        break;

      case 'edit':
      case 'detail':
        editTaskMutate(newTask);
        setIsOpen(false);
        break;

      default:
        setIsOpen(false);
    }
  };

  const handleDeleteTask = () => {
    deleteTaskMutate(value.task_id);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!task) return;
    setValue(normalizeTaskDate(task));
  }, [task]);

  useEffect(() => {
    if (isEqual(value, initialTask)) return setIsInvalidValue(true);

    const isBlankTitle = validateIsBlank(value.title);
    const isAfterTime = validateIsAfterDateTime(
      value.start_time,
      value.end_time,
    );

    setIsInvalidTitle(isBlankTitle);
    setIsInvalidDate(isAfterTime);

    if (!isBlankTitle && !isAfterTime) return setIsInvalidValue(false);

    setIsInvalidValue(true);
  }, [value]);

  if (!mode) return;

  return (
    isOpen && (
      <div className='fixed inset-0 z-50 flex h-dvh w-dvw items-center justify-center bg-[rgba(84,87,122,0.3)]'>
        <div className='bg-primary-0 w-[80%] min-w-[430px] rounded-[10px] px-[40px] py-[30px] shadow-[0_0_30px_0_rgba(84,87,122,0.7)] *:w-full sm:w-[708px]'>
          <div className='mb-[30px] flex justify-between'>
            <p className='text-3xl font-semibold'>{modalMode[mode].title}</p>
            <button
              onClick={() => setIsOpen(false)}
              className='bg-primary-400 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[10px]'
            >
              <Image
                src='/assets/close-white.png'
                alt='close button'
                width={20}
                height={20}
              />
            </button>
          </div>

          <form className='mb-[20px] flex flex-col gap-[12px] rounded-[10px] bg-[#FAFAFA] p-2.5'>
            <fieldset className={`items-center ${BASE_STYLE}`}>
              <label htmlFor='title'>제목</label>
              <div className='flex flex-col gap-[5px]'>
                <NormalInput
                  placeholder='제목'
                  className='text-[14px] sm:text-[16px]'
                  isError={isInvalidTitle}
                  value={value.title}
                  onChange={e => handleFieldChange('title', e)}
                  required
                />
                {isInvalidTitle && (
                  <span className='text-error-600'>
                    제목은 필수 작성입니다.
                  </span>
                )}
              </div>
            </fieldset>
            <fieldset
              className={`items-center ${BASE_STYLE}`}
              onClick={() => setOpenModal({ type: 'dayPicker' })}
            >
              <label htmlFor='date' className='whitespace-nowrap'>
                날짜
              </label>
              <div className='flex flex-col gap-[5px]'>
                <NormalInput
                  readOnly
                  className='text-[14px] *:last:hidden sm:text-[16px]'
                  isError={isInvalidDate}
                >
                  <Image
                    src='/assets/calendar-light.png'
                    alt='calendar icon'
                    className='shrink-0 object-contain'
                    width={24}
                    height={24}
                  />
                  {renderDate(value.start_time, value.end_time)}
                  {openModal?.type === 'dayPicker' && (
                    <DayPickerModal
                      closeModal={() => setOpenModal(null)}
                      onChange={handleFieldChange}
                      value={{
                        from: value.start_time,
                        to: value.end_time,
                      }}
                    />
                  )}
                </NormalInput>
                {isInvalidDate && (
                  <span className='text-error-600'>
                    시작 시각이 종료 시각보다 늦습니다.
                  </span>
                )}
              </div>
            </fieldset>
            <fieldset className={`relative items-center ${BASE_STYLE}`}>
              <label htmlFor='location' className='whitespace-nowrap'>
                출발
              </label>
              <div className='flex flex-grow justify-between'>
                <NormalInput
                  placeholder='출발 위치'
                  value={value.from_place_name || ''}
                  className='mr-[10px] flex-grow text-[14px] sm:text-[16px]'
                  onChange={e => handleFieldChange('from_place_name', e)}
                >
                  <Image
                    src='/assets/location-line.png'
                    alt='calendar icon'
                    width={24}
                    height={24}
                  />
                </NormalInput>
                <SubmitButton
                  type='button'
                  className='pr-[14px] pl-[14px] font-semibold whitespace-nowrap'
                  onClick={() =>
                    setOpenModal({
                      type: 'location',
                      target: 'from_place_name',
                    })
                  }
                >
                  검색하기
                </SubmitButton>
              </div>
            </fieldset>
            <fieldset className={`relative items-center ${BASE_STYLE}`}>
              <label htmlFor='location' className='whitespace-nowrap'>
                도착
              </label>
              <div className='flex flex-grow justify-between'>
                <NormalInput
                  placeholder='도착 위치'
                  value={value.place_name || ''}
                  className='mr-[10px] flex-grow text-[14px] sm:text-[16px]'
                  onChange={e => handleFieldChange('place_name', e)}
                >
                  <Image
                    src='/assets/location-line.png'
                    alt='calendar icon'
                    width={24}
                    height={24}
                  />
                </NormalInput>
                <SubmitButton
                  type='button'
                  className='pr-[14px] pl-[14px] font-semibold whitespace-nowrap'
                  onClick={() =>
                    setOpenModal({
                      type: 'location',
                      target: 'place_name',
                    })
                  }
                >
                  검색하기
                </SubmitButton>
              </div>
              {openModal?.type === 'location' && (
                <LocationModal
                  closeModal={() => setOpenModal(null)}
                  setPlace={place => handlePlaceChange(place, openModal.target)}
                />
              )}
            </fieldset>
            <fieldset className={`*:first:mt-2 ${BASE_STYLE}`}>
              <label htmlFor='memo'>메모</label>
              <NormalTextarea
                className='text-[14px] sm:text-[16px]'
                placeholder='메모'
                value={value.memo || ''}
                onChange={e => handleFieldChange('memo', e)}
              />
            </fieldset>
          </form>
          <div className='flex gap-[20px] *:flex-1'>
            <SubmitButton
              type='button'
              onClick={handleSaveTask}
              disabled={isInvalidValue}
            >
              {modalMode[mode].buttonLabel}
            </SubmitButton>
            {modalMode[mode].deleteButtonLabel && (
              <SubmitButton
                type='button'
                onClick={handleDeleteTask}
                className='bg-error-600!'
              >
                {modalMode[mode].deleteButtonLabel}
              </SubmitButton>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default TaskModal;
