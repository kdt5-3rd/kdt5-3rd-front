import { useEffect, useState } from 'react';
import useCurrentLocation from './useCurrentLocation';

const useGetLocationName = () => {
  const [locationName, setLocationName] = useState('');
  const { location } = useCurrentLocation();

  useEffect(() => {
    if (window.naver && window.naver.maps && location) {
      naver.maps.Service.reverseGeocode(
        {
          coords: new naver.maps.LatLng(location.latitude, location.longitude),
        },
        (status, response) => {
          if (status !== naver.maps.Service.Status.OK) {
            return setLocationName('현재 위치를 불러올 수 없습니다.');
          }

          const result = response.v2;
          const regions = result.results[1].region;
          setLocationName(`${regions.area1.name} ${regions.area2.name}`);
        },
      );
    }
  }, [location]);

  return { locationName };
};

export default useGetLocationName;
