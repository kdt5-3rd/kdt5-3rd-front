type WeatherType =
  | 'clear'
  | 'partlyCloudy'
  | 'overcast'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'thunderstorm'
  | 'hail';

export interface WeatherInfo {
  codeName: string;
  imageUrl: string;
}

export const weatherCode: Record<WeatherType, WeatherInfo> = {
  clear: {
    codeName: '맑음',
    imageUrl: '/assets/weather/clear.png',
  },
  partlyCloudy: {
    codeName: '약간 흐림',
    imageUrl: '/assets/weather/partly-cloudy.png',
  },
  overcast: {
    codeName: '흐림',
    imageUrl: '/assets/weather/overcast.png',
  },
  fog: {
    codeName: '안개',
    imageUrl: '/assets/weather/fog.png',
  },
  drizzle: {
    codeName: '이슬비',
    imageUrl: '/assets/weather/drizzle.png',
  },
  rain: {
    codeName: '비',
    imageUrl: '/assets/weather/rain.png',
  },
  snow: {
    codeName: '눈',
    imageUrl: '/assets/weather/snow.png',
  },
  thunderstorm: {
    codeName: '천둥',
    imageUrl: '/assets/weather/thunderstorm.png',
  },
  hail: {
    codeName: '우박',
    imageUrl: '/assets/weather/hail.png',
  },
};

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
