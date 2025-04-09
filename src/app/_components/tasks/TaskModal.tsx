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
import { format } from 'date-fns';

type ModalMode = 'add' | 'edit';

interface TaskModalProps {
  mode: ModalMode | null;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  task: TaskPayload | null;
}

const modalMode: Record<ModalMode, { title: string; buttonLabel: string }> = {
  add: {
    title: 'Todo 추가',
    buttonLabel: '추가',
  },
  edit: {
    title: 'Todo 수정',
    buttonLabel: '수정',
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

const dateRegex = /(\d{4}\/\d{2}\/\d{2})/;

const formattedTask = (task: TaskPayload) => ({
  ...task,
  start_time: new Date(task.start_time),
  end_time: new Date(task.end_time),
});

function TaskModal({ mode, isOpen, setIsOpen, task }: TaskModalProps) {
  const [isOpenDayPicker, setIsOpenDayPicker] = useState(false);
  const [value, setValue] = useState<TaskCalendar>(
    task ? formattedTask(task) : initialTask,
  );
  const DayAndTimeArray = format(value.start_time, 'yyyy/MM/dd hh:mm a').split(
    dateRegex,
  );

  const handleCloseButton = () => {
    setIsOpen(false);
  };

  const handleInputChange = useCallback(
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

  const handleSubmit = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!task) return;

    setValue({
      ...task,
      start_time: new Date(task.start_time),
      end_time: new Date(task.end_time),
    });
  }, [task]);

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
            <fieldset className='flex items-center gap-[20px] *:first:text-xl *:first:font-semibold *:last:flex-1'>
              <label htmlFor='title'>제목</label>
              <NormalInput
                placeholder='제목'
                value={value.title}
                onChange={e => handleInputChange('title', e)}
                required
              />
            </fieldset>
            <fieldset
              className='flex items-center gap-[20px] *:first:text-xl *:first:font-semibold *:last:flex-1'
              onClick={() => setIsOpenDayPicker(true)}
            >
              <label htmlFor='date'>날짜</label>
              <NormalInput
                readOnly
                placeholder={value.start_time ? '' : value.start_time}
              >
                <Image
                  src='/assets/calendar-light.png'
                  alt='calendar icon'
                  width={24}
                  height={24}
                />
                {
                  <div>
                    {DayAndTimeArray.map((part, index) => {
                      return dateRegex.test(part) ? (
                        <strong key={index}>{part}</strong>
                      ) : (
                        part
                      );
                    })}
                  </div>
                }
                {isOpenDayPicker && (
                  <DayPickerModal
                    isOpen={isOpenDayPicker}
                    setIsOpen={setIsOpenDayPicker}
                    onChange={handleInputChange}
                    value={value.start_time}
                  />
                )}
              </NormalInput>
            </fieldset>
            <fieldset className='flex items-center gap-[20px] *:first:text-xl *:first:font-semibold *:last:flex-1'>
              <label htmlFor='location'>위치</label>
              <NormalInput
                placeholder='위치'
                value={value.place_name}
                onChange={e => handleInputChange('place_name', e)}
              >
                <Image
                  src='/assets/location-light.png'
                  alt='calendar icon'
                  width={24}
                  height={24}
                />
              </NormalInput>
            </fieldset>
            <fieldset className='flex gap-[20px] *:first:mt-2 *:first:text-xl *:first:font-semibold *:last:flex-1'>
              <label htmlFor='memo'>메모</label>
              <NormalTextarea
                placeholder='메모'
                value={value.memo}
                onChange={e => handleInputChange('memo', e)}
              />
            </fieldset>
          </form>
          <SubmitButton type='button' onClick={handleSubmit}>
            {modalMode[mode].buttonLabel}
          </SubmitButton>
        </div>
      </div>
    )
  );
}

export default TaskModal;
