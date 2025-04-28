'use client';

import BoardTitle from '@/app/_components/common/BoardTitle';
import Navigation from '@/app/_components/nav/Navigation';
import HourlyWeather from './HourlyWeather';
import CurrentIndex from './CurrentIndex';
import CurrentWeather from './CurrentWeather';
import WeeklyWeather from './WeeklyWeather';
import RecommendDress from './RecommendDress';
import HourlyContainer from './HourlyContainer';
import { getWeatherInfo } from './weatherCode';
import useGetWeatherQuery from '@/app/_hooks/useGetWeatherQuery';
import { format } from 'date-fns';
import useGetLocationName from '@/app/_hooks/useGetLocationName';

export default function Weather() {
  const { data: weatherData, isPending } = useGetWeatherQuery();
  const { locationName } = useGetLocationName();

  if (!weatherData || isPending) {
    return;
  }

  const currentData = weatherData.current;
  const hourlyData = weatherData.hourly;

  return (
    <div className='text-secondary-500 inline-flex h-full min-h-screen w-full bg-[#FAFAFA]'>
      <Navigation />
      <div className='h-full w-full min-w-[752px]'>
        <div className='bg-primary-0 flex flex-col'>
          <BoardTitle title='날씨'></BoardTitle>
        </div>
        <main className='grid grid-cols-5 gap-x-[50px] gap-y-[23px] p-[32px]'>
          <section className='col-span-3 flex max-w-[1000px] flex-col gap-[15px]'>
            <p className='text-[24px] font-semibold'>현재</p>
            <CurrentWeather
              location={locationName}
              currentTime={format(currentData.time, 'h:mm a')}
              temperature={`${currentData?.temperature}°`}
              weatherInfo={getWeatherInfo(currentData.weathercode)}
            />
            <HourlyContainer>
              {hourlyData.map(
                ({ time, temperature, precipitation, weathercode }) => (
                  <HourlyWeather
                    key={time}
                    time={format(time, 'ha')}
                    temperature={`${temperature}°`}
                    rainfall={`${precipitation}%`}
                    weatherInfo={getWeatherInfo(weathercode)}
                  />
                ),
              )}
            </HourlyContainer>
          </section>
          <section className='col-span-2 flex h-full flex-col gap-[15px]'>
            <p className='text-[24px] font-semibold'>주간 날씨</p>
            <WeeklyWeather />
          </section>
          <section className='col-span-3 grid grid-cols-3 gap-[30px]'>
            <CurrentIndex
              type='미세먼지'
              value={currentData.pm10}
              subValue='µg/m³'
            />
            <CurrentIndex
              type='초미세먼지'
              value={currentData.pm2_5}
              subValue='µg/m³'
            />
            <CurrentIndex
              type='자외선'
              value={currentData.uv_index}
              subValue=''
            />
            <CurrentIndex
              type='습도'
              value={currentData.humidity}
              subValue='%'
            />
            <CurrentIndex
              type='바람'
              value={currentData.windspeed}
              subValue='m/s'
            />
            <CurrentIndex
              type='기압'
              value={currentData.pressure}
              subValue='hPa'
            />
          </section>
          <section className='col-span-2'>
            <RecommendDress />
          </section>
        </main>
      </div>
    </div>
  );
}
