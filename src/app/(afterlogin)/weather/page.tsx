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
import spinner from '@/assets/lottie/spinner.json';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function Weather() {
  const {
    data: weatherData,
    isLoading,
    geoLocationError,
  } = useGetWeatherQuery();
  const { locationName } = useGetLocationName();

  return (
    <div className='text-secondary-500 inline-flex h-full min-h-screen w-full flex-col bg-[#FAFAFA] sm:flex-row'>
      <Navigation />
      <div className='relative flex h-dvh w-full min-w-[752px] flex-col'>
        <div className='bg-primary-0 flex flex-col'>
          <BoardTitle title='날씨'></BoardTitle>
        </div>
        {}
        {isLoading || !weatherData ? (
          <div className='absolute top-1/2 left-1/2 flex-1 -translate-1/2 text-center'>
            {geoLocationError ? (
              <div className='text-[18px] font-medium'>
                날씨 정보를 불러올 수 없습니다. <br /> 위치 액세스를
                허용해주세요
              </div>
            ) : (
              <Lottie
                animationData={spinner}
                style={{ width: 100, height: 100 }}
              />
            )}
          </div>
        ) : (
          <main className='flex w-dvw min-w-[375px] flex-col gap-x-[50px] gap-y-[23px] p-[32px] sm:w-full sm:flex-row'>
            <div className='flex flex-col gap-[23px] sm:w-[60%]'>
              <section className='flex flex-col gap-[15px]'>
                <p className='text-[22px] font-semibold sm:text-[24px]'>현재</p>
                <CurrentWeather
                  location={locationName}
                  currentTime={weatherData.current.time}
                  temperature={`${weatherData.current.temperature}°`}
                  weatherInfo={getWeatherInfo(weatherData.current.weathercode)}
                />
                <HourlyContainer>
                  {weatherData.hourly.map(
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
                    value={weatherData.current[type]}
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
                  {weatherData.daily.map(data => (
                    <WeeklyWeather key={data.date} data={data} />
                  ))}
                </WeeklyContainer>
              </section>
              <section className=''>
                <RecommendDress />
              </section>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
