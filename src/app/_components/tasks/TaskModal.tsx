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

export type ModalMode = 'add' | 'edit' | 'detail';

interface TaskModalProps {
  mode: ModalMode | null;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  task: TaskPayload | TaskCalendar | null;
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
  location: { lat: '', lng: '' },
  is_completed: false,
};

const formattedTask = (task: TaskPayload | TaskCalendar): TaskCalendar => {
  if (task.start_time instanceof Date) return task as TaskCalendar;

  const start_time = new Date(task.start_time);
  const end_time = task.end_time ? new Date(task.end_time) : start_time;

  return { ...task, start_time, end_time };
};

const formattedDateText = (start: Date, end: Date) => {
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
    <span className='whitespace-nowrap'>
      <strong>{startDate}</strong> {startTime} ~ <strong>{endDate}</strong>{' '}
      {endTime}
    </span>
  );
};

function TaskModal({ mode, isOpen, setIsOpen, task }: TaskModalProps) {
  const BASE_STYLE =
    'flex gap-[20px] *:first:text-xl *:first:font-semibold *:last:flex-1';
  const [openModal, setOpenModal] = useState<null | 'dayPicker' | 'location'>(
    null,
  );
  const [value, setValue] = useState<TaskCalendar>(
    task ? formattedTask(task) : initialTask,
  );
  const [isInvalidDate, setIsInvalidDate] = useState(false);
  const [isInvalidTitle, setIsInvalidTitle] = useState(false);
  const [isInvalidValue, setIsInvalidValue] = useState(true);

  const handleCloseButton = () => {
    setIsOpen(false);
  };

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

  const handlePlaceNameChange = (name: string) => {
    setValue(prev => ({
      ...prev,
      place_name: name,
    }));
  };

  const handleConfirm = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!task) return;
    setValue(formattedTask(task));
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
        <div className='bg-primary-0 w-[708px] rounded-[10px] px-[40px] py-[30px] shadow-[0_0_30px_0_rgba(84,87,122,0.7)] *:w-full'>
          <div className='mb-[30px] flex justify-between'>
            <p className='text-3xl font-semibold'>{modalMode[mode].title}</p>
            <button
              onClick={handleCloseButton}
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
              onClick={() => setOpenModal('dayPicker')}
            >
              <label htmlFor='date'>날짜</label>
              <div className='flex flex-col gap-[5px]'>
                <NormalInput
                  readOnly
                  className='*:last:hidden'
                  isError={isInvalidDate}
                >
                  <Image
                    src='/assets/calendar-light.png'
                    alt='calendar icon'
                    width={24}
                    height={24}
                  />
                  {formattedDateText(value.start_time, value.end_time)}
                  {openModal === 'dayPicker' && (
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
              <label htmlFor='location'>위치</label>
              <div className='flex flex-grow justify-between'>
                <NormalInput
                  placeholder='위치'
                  value={value.place_name}
                  className='mr-[10px] flex-grow'
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
                  className='pr-[14px] pl-[14px] font-semibold'
                  onClick={() => setOpenModal('location')}
                >
                  검색하기
                </SubmitButton>
              </div>
              {openModal === 'location' && (
                <LocationModal
                  closeModal={() => setOpenModal(null)}
                  setPlaceName={name => handlePlaceNameChange(name)}
                />
              )}
            </fieldset>
            <fieldset className={`*:first:mt-2 ${BASE_STYLE}`}>
              <label htmlFor='memo'>메모</label>
              <NormalTextarea
                placeholder='메모'
                value={value.memo}
                onChange={e => handleFieldChange('memo', e)}
              />
            </fieldset>
          </form>
          <div className='flex gap-[20px] *:flex-1'>
            <SubmitButton
              type='button'
              onClick={handleConfirm}
              disabled={isInvalidValue}
            >
              {modalMode[mode].buttonLabel}
            </SubmitButton>
            {modalMode[mode].deleteButtonLabel && (
              <SubmitButton
                type='button'
                onClick={handleDelete}
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
