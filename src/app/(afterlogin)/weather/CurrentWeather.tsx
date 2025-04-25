import Image from 'next/image';
import { WeatherInfo } from './weatherCode';

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
      <div className='flex justify-between'>
        <div className='flex items-center gap-[5px]'>
          <Image
            src='/assets/location-big.png'
            alt='위치 아이콘 이미지'
            width={20}
            height={20}
          />
          <p className='text-primary-400 text-lg font-normal'>{location}</p>
        </div>
        <p className='text-secondary-400 text-2xl font-medium'>{currentTime}</p>
      </div>
      <div className='flex items-center gap-[15px]'>
        <Image
          src={weatherInfo.imageUrl}
          alt={`${weatherInfo.codeName} 이미지`}
          width={96}
          height={96}
        />
        <div className='text-secondary-400'>
          <p className='text-[40px] font-medium'>{temperature}</p>
          <p className='text-[20px] font-normal'>{weatherInfo.codeName}</p>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
