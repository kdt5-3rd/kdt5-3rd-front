export interface HourlyWeatherType {
  time: string;
  temperature: number;
  precipitation: number;
  weathercode: number;
}

export interface WeeklyWeatherType {
  date: string;
  weathercode: number;
  tempMax: number;
  tempMin: number;
  precipitationProbability: number;
}

export interface CurrentType {
  time: string;
  temperature: number;
  weathercode: number;
  humidity: number;
  windspeed: number;
  pressure: number;
  uv_index: number;
  pm10: number;
  pm2_5: number;
}

export interface WeatherResponse {
  success: boolean;
  location: {
    latitude: number;
    longitude: number;
    timezone: string;
  };
  current: CurrentType;
  hourly: HourlyWeatherType[];
  daily: WeeklyWeatherType[];
}

export type IndexType = Pick<
  CurrentType,
  'humidity' | 'windspeed' | 'pressure' | 'uv_index' | 'pm10' | 'pm2_5'
>;

export type IndexNameType =
  | '미세먼지'
  | '초미세먼지'
  | '자외선'
  | '습도'
  | '바람'
  | '기압';
