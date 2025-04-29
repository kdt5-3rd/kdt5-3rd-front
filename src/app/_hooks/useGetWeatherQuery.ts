import { useQuery } from '@tanstack/react-query';
import useCurrentLocation from './useCurrentLocation';
import { getWeather } from '../_apis/weather';
import { AxiosError, AxiosResponse } from 'axios';
import { WeatherResponse } from '../_types/weather';

const useGetWeatherQuery = () => {
  const { location, error } = useCurrentLocation();

  return useQuery<AxiosResponse<WeatherResponse>, AxiosError, WeatherResponse>({
    queryKey: ['weather', location],
    queryFn: () => {
      if (!location) {
        throw new Error(error ?? '위치 정보를 가져올 수 없습니다.');
      }

      return getWeather(location);
    },
    enabled: !!location,
    select: data => data.data,
  });
};

export default useGetWeatherQuery;
