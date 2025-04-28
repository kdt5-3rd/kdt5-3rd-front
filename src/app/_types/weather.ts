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

export interface WeatherResponse {
  success: boolean;
  location: {
    latitude: number;
    longitude: number;
    timezone: string;
  };
  current: {
    time: string;
    temperature: number;
    weathercode: number;
    humidity: number;
    windspeed: number;
    pressure: number;
    uv_index: number;
    pm10: number;
    pm2_5: number;
  };
  hourly: HourlyWeatherType[];
  daily: WeeklyWeatherType[];
}
