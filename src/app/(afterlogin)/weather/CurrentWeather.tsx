import Image from 'next/image';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { WeatherInfo } from './_constant/weatherCode';

interface CurrentWeatherProps {
  location: string;
  currentTime: string;
  temperature: string;
  weatherInfo: WeatherInfo;
}

function CurrentWeather({
  location,
  currentTime,
  temperature,
  weatherInfo,
}: CurrentWeatherProps) {
  return (
    <div className='border-primary-200 bg-primary-0 flex flex-col gap-[10px] rounded-2xl border px-[30px] py-[26px]'>
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-[5px]'>
          <div className='relative h-[18px] w-[18px] sm:h-[20px] sm:w-[20px]'>
            <Image
              src='/assets/location-big.png'
              alt='위치 아이콘 이미지'
              fill
            />
          </div>
          <p className='text-primary-400 text-[14px] font-normal text-nowrap sm:text-lg'>
            {location}
          </p>
        </div>
        <div className='text-secondary-400 flex flex-col items-end text-[14px] font-medium text-nowrap sm:flex-row sm:gap-[10px] sm:text-2xl'>
          <p>
            {format(currentTime, 'M월 d일(eee)', {
              locale: ko,
            })}
          </p>
          <p>
            {format(currentTime, ' a h:mm', {
              locale: ko,
            })}
          </p>
        </div>
      </div>
      <div className='flex items-center gap-[15px]'>
        <div className='relative h-[76px] w-[76px] sm:h-[96px] sm:w-[96px]'>
          <Image
            src={weatherInfo.imageUrl}
            alt={`${weatherInfo.codeName} 이미지`}
            fill
          />
        </div>
        <div className='text-secondary-400'>
          <p className='text-[30px] font-medium sm:text-[40px]'>
            {temperature}
          </p>
          <p className='text-[16px] font-normal sm:text-[20px]'>
            {weatherInfo.codeName}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
