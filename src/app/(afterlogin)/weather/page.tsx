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

export default function Weather() {
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
              location='수원시 영통구'
              currentTime='9:00 AM'
              temperature='17°'
              weatherInfo={getWeatherInfo(0)}
            />
            <HourlyContainer>
              <HourlyWeather
                time='Now'
                temperature='17°'
                rainfall='10%'
                weatherInfo={getWeatherInfo(0)}
              />
              <HourlyWeather
                time='10AM'
                temperature='17°'
                rainfall='10%'
                weatherInfo={getWeatherInfo(1)}
              />
              <HourlyWeather
                time='11AM'
                temperature='17°'
                rainfall='10%'
                weatherInfo={getWeatherInfo(3)}
              />
              <HourlyWeather
                time='12AM'
                temperature='17°'
                rainfall='10%'
                weatherInfo={getWeatherInfo(45)}
              />
              <HourlyWeather
                time='1PM'
                temperature='17°'
                rainfall='10%'
                weatherInfo={getWeatherInfo(51)}
              />
              <HourlyWeather
                time='2PM'
                temperature='17°'
                rainfall='10%'
                weatherInfo={getWeatherInfo(61)}
              />
              <HourlyWeather
                time='3PM'
                temperature='17°'
                rainfall='10%'
                weatherInfo={getWeatherInfo(71)}
              />
              <HourlyWeather
                time='4PM'
                temperature='17°'
                rainfall='10%'
                weatherInfo={getWeatherInfo(80)}
              />
              <HourlyWeather
                time='5PM'
                temperature='17°'
                rainfall='10%'
                weatherInfo={getWeatherInfo(95)}
              />
            </HourlyContainer>
          </section>
          <section className='col-span-2 flex h-full flex-col gap-[15px]'>
            <p className='text-[24px] font-semibold'>주간 날씨</p>
            <WeeklyWeather />
          </section>
          <section className='col-span-3 grid grid-cols-3 gap-[30px]'>
            <CurrentIndex type='미세먼지' value='43' subValue='(bad)' />
            <CurrentIndex type='초미세먼지' value='43' subValue='(bad)' />
            <CurrentIndex type='자외선' value='43' subValue='(bad)' />
            <CurrentIndex type='습도' value='43' subValue='(bad)' />
            <CurrentIndex type='바람' value='43' subValue='(bad)' />
            <CurrentIndex type='기압' value='43' subValue='(bad)' />
          </section>
          <section className='col-span-2'>
            <RecommendDress />
          </section>
        </main>
      </div>
    </div>
  );
}
