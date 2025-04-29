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
