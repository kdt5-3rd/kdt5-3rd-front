import Image from 'next/image';
import { WeatherInfo } from './_constant/weatherCode';

interface HourlyWeatherProps {
  time: string;
  temperature: string;
  rainfall: string;
  weatherInfo: WeatherInfo;
}

function HourlyWeather({
  time,
  temperature,
  rainfall,
  weatherInfo,
}: HourlyWeatherProps) {
  const parseTime = (timeStr: string) => {
    const match = timeStr.match(/^(\d{1,2})(AM|PM)$/i);
    if (!match) {
      return (
        <p className='text-[12px] font-medium sm:text-[16px]'>{timeStr}</p>
      );
    }

    const hour = parseInt(match[1], 10);
    const period = match[2].toUpperCase() as 'AM' | 'PM';

    return (
      <div className='flex items-baseline justify-center'>
        <p className='text-[12px] font-medium sm:text-[16px]'>{hour}</p>
        {period && (
          <p className='text-[8px] font-normal sm:text-[12px]'>{period}</p>
        )}
      </div>
    );
  };

  return (
    <div className='flex min-w-[55px] flex-col items-center gap-[5px]'>
      <div className='text-secondary-400 flex flex-col gap-[20px]'>
        {parseTime(time)}
        <Image
          src={weatherInfo.imageUrl}
          alt={`${weatherInfo.codeName} image`}
          width={36}
          height={36}
        />
        <p className='text-[16px] font-semibold sm:text-[20px]'>
          {temperature}
        </p>
      </div>
      <div className='flex w-full items-center justify-around gap-[2px]'>
        <div className='relative h-[10px] w-[10px] sm:h-[14px] sm:w-[14px]'>
          <Image
            src='/assets/weather/drop.png'
            alt='강수량 물방울 이미지'
            fill
          />
        </div>

        <p className='text-secondary-300 text-sm text-[10px] font-semibold sm:text-[14px]'>
          {rainfall}
        </p>
      </div>
    </div>
  );
}

export default HourlyWeather;
