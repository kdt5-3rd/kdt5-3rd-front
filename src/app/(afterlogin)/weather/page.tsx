'use client';

import BoardTitle from '@/app/_components/common/BoardTitle';
import Navigation from '@/app/_components/nav/Navigation';
import HourlyWeather from './HourlyWeather';
import CurrentIndex from './CurrentIndex';
import CurrentWeather from './CurrentWeather';
import WeeklyWeather from './WeeklyWeather';
import RecommendDress from './RecommendDress';
import HourlyContainer from './HourlyContainer';
import useGetWeatherQuery from '@/app/_hooks/useGetWeatherQuery';
import { format } from 'date-fns';
import useGetLocationName from '@/app/_hooks/useGetLocationName';
import WeeklyContainer from './WeeklyContainer';
import { currentIndex } from './_constant/currentIndex';
import { getWeatherInfo } from '@/app/_utils/getWeatherInfo';

export default function Weather() {
  const { data: weatherData, isPending } = useGetWeatherQuery();
  const { locationName } = useGetLocationName();

  if (!weatherData || isPending) {
    return;
  }

  const currentData = weatherData.current;
  const hourlyData = weatherData.hourly;
  const weeklyData = weatherData.daily;

  return (
    <div className='text-secondary-500 inline-flex h-full min-h-screen w-full flex-col bg-[#FAFAFA] sm:flex-row'>
      <Navigation />
      <div className='h-full w-full min-w-[752px]'>
        <div className='bg-primary-0 flex flex-col'>
          <BoardTitle title='날씨'></BoardTitle>
        </div>
        <main className='flex w-dvw min-w-[375px] flex-col gap-x-[50px] gap-y-[23px] p-[32px] sm:w-full sm:flex-row'>
          <div className='flex flex-col gap-[23px] sm:w-[60%]'>
            <section className='flex flex-col gap-[15px]'>
              <p className='text-[22px] font-semibold sm:text-[24px]'>현재</p>
              <CurrentWeather
                location={locationName}
                currentTime={currentData.time}
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
            <section className='grid grid-cols-2 gap-[16px] sm:grid-cols-3 sm:gap-[30px]'>
              {currentIndex.map(({ id, type, typeName, unit }) => (
                <CurrentIndex
                  key={id}
                  type={typeName}
                  value={currentData[type]}
                  subValue={unit}
                />
              ))}
            </section>
          </div>
          <div className='flex flex-col gap-[23px] sm:w-[40%]'>
            <section className='flex flex-col gap-[15px]'>
              <p className='text-[22px] font-semibold sm:text-[24px]'>
                주간 날씨
              </p>
              <WeeklyContainer>
                {weeklyData.map(data => (
                  <WeeklyWeather key={data.date} data={data} />
                ))}
              </WeeklyContainer>
            </section>
            <section className=''>
              <RecommendDress />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
