import NormalInput from '@/app/_components/common/NormalInput';
import Image from 'next/image';

function WeatherLocationSetting() {
  return (
    <div className='flex'>
      <NormalInput
        className='flex-grow text-[14px] sm:max-w-[400px] sm:text-[16px]'
        leftIcon={
          <Image
            src='/assets/location-line.png'
            alt='calendar icon'
            width={24}
            height={24}
          />
        }
      />
    </div>
  );
}

export default WeatherLocationSetting;
