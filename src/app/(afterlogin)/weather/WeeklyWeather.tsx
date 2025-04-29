import Image from 'next/image';
import { WeeklyWeatherType } from '@/app/_types/weather';
import { format } from 'date-fns';
import { getWeatherInfo } from '@/app/_utils/getWeatherInfo';

interface WeeklyWeatherProps {
  data: WeeklyWeatherType;
}

function WeeklyWeather({ data }: WeeklyWeatherProps) {
  const weatherInfo = getWeatherInfo(data.weathercode);

  return (
    <div className='text-secondary-400 flex w-full items-center text-[12px] font-medium sm:text-[16px]'>
      <p className='flex-1'>{format(data.date, 'EEE')}</p>
      <div className='flex items-center gap-[12px] sm:gap-[20px]'>
        <Image
          src='/assets/weather/drop.png'
          alt='강수량 물방울 이미지'
          width={14}
          height={14}
        />
        <p className='text-secondary-300 text-centers min-w-[28px] sm:min-w-[40px]'>{`${data.precipitationProbability}%`}</p>
        <Image
          src={weatherInfo.imageUrl}
          alt={`${weatherInfo.codeName} image`}
          width={36}
          height={36}
        />
        <p className='min-w-[34px] text-center sm:min-w-[44px]'>{`${data.tempMax}°`}</p>
        <p className='min-w-[34px] text-center sm:min-w-[44px]'>{`${data.tempMin}°`}</p>
      </div>
    </div>
  );
}

export default WeeklyWeather;
