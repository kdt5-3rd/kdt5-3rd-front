import NormalInput from '@/app/_components/common/NormalInput';
import useOutsideClick from '@/app/_hooks/useOutSideClick';
import Image from 'next/image';
import { useState } from 'react';

const selectItems = [
  {
    id: 1,
    label: '실시간 빠른 길',
  },
  {
    id: 2,
    label: 'select item 2',
  },
  {
    id: 3,
    label: 'select item 3',
  },
  {
    id: 4,
    label: 'select item 4',
  },
];

function RouteSetting() {
  const [selected, setSelected] = useState(selectItems[0].label);
  const [isActive, setIsActive] = useState(false);
  const selectRef = useOutsideClick(() => setIsActive(false));

  const handleClickSelect = (label: string) => {
    setSelected(label);
    setIsActive(false);
  };

  return (
    <div className='relative max-w-[400px]' ref={selectRef}>
      <NormalInput
        onClick={() => setIsActive(prev => !prev)}
        value={selected}
        readOnly
        rightIcon={
          <Image
            src='/assets/arrow-down.png'
            alt='아래방향 화살표 아이콘'
            width={20}
            height={20}
          />
        }
      />
      {isActive && (
        <div className='border-primary-200 bg-primary-0 absolute top-[48px] z-20 flex w-full max-w-[400px] flex-col rounded-b-[8px] border border-t-0 p-[12px]'>
          {selectItems.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => handleClickSelect(label)}
              className='hover:bg-primary-100 text-secondary-500 cursor-pointer px-[15px] py-[10px] text-left text-[12px] hover:rounded-[8px]'
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default RouteSetting;
