import NormalInput from '@/app/_components/common/NormalInput';
import Image from 'next/image';

function WeatherLocationSetting() {
  return (
    <div className='flex'>
      <NormalInput
        value={''}
        className='mr-[10px] max-w-[400px] flex-grow text-[14px] sm:text-[16px]'
      >
        <Image
          src='/assets/location-line.png'
          alt='calendar icon'
          width={24}
          height={24}
        />
      </NormalInput>
    </div>
  );
}

export default WeatherLocationSetting;
