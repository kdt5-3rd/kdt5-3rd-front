'use client';

import { useEffect, useState } from 'react';
import { GeoLocation } from '../_types/location';

const useCurrentLocation = () => {
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation을 지원하지 않는 브라우저입니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      err => {
        setError(err.message);
      },
    );
  }, []);

  return { location, error };
};

export default useCurrentLocation;
