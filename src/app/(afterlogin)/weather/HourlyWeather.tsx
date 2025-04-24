import Image from 'next/image';
import { WeatherInfo } from './weatherCode';

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
      return <p className='text-[16px] font-medium'>{timeStr}</p>;
    }

    const hour = parseInt(match[1], 10);
    const period = match[2].toUpperCase() as 'AM' | 'PM';

    return (
      <div className='flex items-baseline'>
        <p className='text-[16px] font-medium'>{hour}</p>
        {period && <p className='text-[12px] font-normal'>{period}</p>}
      </div>
    );
  };

  return (
    <div className='gap-[5 px] flex min-w-[55px] flex-col items-center'>
      <div className='text-secondary-400 flex flex-col gap-[20px]'>
        {parseTime(time)}
        <Image
          src={weatherInfo.imageUrl}
          alt={`${weatherInfo.codeName} image`}
          width={36}
          height={36}
        />
        <p className='text-[20px] font-semibold'>{temperature}</p>
      </div>
      <div className='flex items-center'>
        <Image
          src='/assets/weather/drop.png'
          alt='강수량 물방울 이미지'
          width={14}
          height={14}
        />
        <p className='text-secondary-300 text-sm font-semibold'>{rainfall}</p>
      </div>
    </div>
  );
}

export default HourlyWeather;
