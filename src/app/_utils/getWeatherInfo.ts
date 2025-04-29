import { weatherCode } from '../(afterlogin)/weather/_constant/weatherCode';

export const getWeatherInfo = (code: number) => {
  if (code === 0) return weatherCode.clear;
  if (code === 1 || code === 2) return weatherCode.partlyCloudy;
  if (code === 3) return weatherCode.overcast;
  if (code === 45 || code === 48) return weatherCode.fog;
  if (code >= 51 && code <= 57) return weatherCode.drizzle;
  if (code >= 61 && code <= 67) return weatherCode.rain;
  if (code >= 71 && code <= 77) return weatherCode.snow;
  if (code >= 80 && code <= 82) return weatherCode.rain;
  if (code === 95) return weatherCode.thunderstorm;
  if (code >= 96 && code <= 99) return weatherCode.hail;

  return {
    codeName: '알 수 없음',
    imageUrl: '/assets/weather/unknown.png',
  };
};
