import NormalInput from '@/app/_components/common/NormalInput';
import SubmitButton from '@/app/_components/common/SubmitButton';
import SettingContainer from './_component/SettingContainer';
import { useState } from 'react';

function NoticeSetting() {
  const [isSend, setIsSend] = useState(true);

  return (
    <div className='flex h-full min-h-[400px] flex-col'>
      <div className='mb-[108px] flex flex-1 flex-col gap-[32px]'>
        <SettingContainer title='데일리 리포트 알림 전송 여부'>
          <div className='flex gap-[20px]'>
            <button
              onClick={() => setIsSend(true)}
              className={`${isSend ? 'bg-primary-400 text-primary-0' : 'border-secondary-200 text-secondary-500 border'} h-[50px] w-[97px] cursor-pointer rounded-[10px] text-[12px]`}
            >
              On
            </button>
            <button
              onClick={() => setIsSend(false)}
              className={`${!isSend ? 'bg-primary-400 text-primary-0' : 'border-secondary-200 text-secondary-500 border'} h-[50px] w-[97px] cursor-pointer rounded-[10px] text-[12px]`}
            >
              Off
            </button>
          </div>
        </SettingContainer>
        <SettingContainer title='데일리 리포트 전송 시간'>
          <NormalInput type='time' className='max-w-[400px]'></NormalInput>
        </SettingContainer>
      </div>

      <SubmitButton className='max-w-[216px]'>저장</SubmitButton>
    </div>
  );
}

export default NoticeSetting;
