import Image from 'next/image';

import { WeeklyWeatherType } from '@/app/_types/weather';
import { getWeatherInfo } from './weatherCode';
import { format } from 'date-fns';

interface WeeklyWeatherProps {
  data: WeeklyWeatherType;
}

function WeeklyWeather({ data }: WeeklyWeatherProps) {
  const weatherInfo = getWeatherInfo(data.weathercode);

  return (
    <div className='text-secondary-400 flex w-full items-center text-[16px] font-medium'>
      <p className='flex-1'>{format(data.date, 'EEE')}</p>
      <div className='flex items-center gap-[20px]'>
        <Image
          src='/assets/weather/drop.png'
          alt='강수량 물방울 이미지'
          width={14}
          height={14}
        />
        <p className='text-secondary-300 text-centers min-w-[40px]'>{`${data.precipitationProbability}%`}</p>
        <Image
          src={weatherInfo.imageUrl}
          alt={`${weatherInfo.codeName} image`}
          width={36}
          height={36}
        />
        <p className='min-w-[44px] text-center'>{`${data.tempMax}°`}</p>
        <p className='min-w-[44px] text-center'>{`${data.tempMin}°`}</p>
      </div>
    </div>
  );
}

export default WeeklyWeather;
