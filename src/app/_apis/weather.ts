import { GeoLocation } from '../_types/location';
import { api } from './tasks';

export const getWeather = async (location: GeoLocation) => {
  const params = new URLSearchParams();
  params.set('lat', location.latitude.toString());
  params.set('lon', location.longitude.toString());

  return await api.get(`/weather?${params}`);
};
