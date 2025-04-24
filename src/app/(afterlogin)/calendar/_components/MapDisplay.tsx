import useGetPathQuery from '@/app/_hooks/useGetPathQuery';
import Image from 'next/image';
import { useEffect, useMemo, useRef } from 'react';

interface mapProps {
  taskId: number;
  location: {
    lat: number;
    lng: number;
  };
  enabled: boolean;
}

function MapDisplay({ taskId, location, enabled }: mapProps) {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const { data: pathData = [] } = useGetPathQuery(taskId, enabled);

  const center = useMemo(() => {
    if (!location || !location.lat || !location.lng) return null;

    return new naver.maps.LatLng(location.lat, location.lng);
  }, [location]);

  useEffect(() => {
    if (!center) return;

    const initMap = () => {
      if (mapRef.current) {
        mapRef.current.setCenter(center);
      } else {
        mapRef.current = new naver.maps.Map(`${taskId}-map`, {
          center: center,
          zoom: 16,
        });
      }

      if (pathData && mapRef.current) {
        const path = pathData.map(
          (pathArray: [number, number]) =>
            new naver.maps.LatLng(pathArray[1], pathArray[0]),
        );

        new naver.maps.Polyline({
          map: mapRef.current,
          path,
          strokeColor: 'oklch(0.6 0.214963 270.5418)',
          strokeWeight: 4,
        });
      }

      new naver.maps.Marker({
        position: center,
        map: mapRef.current,
      });
    };

    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.MAP_CLIENT_ID}`;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, [taskId, center, pathData]);

  if (!location.lat || !location.lng) {
    return (
      <Image src='/assets/map.png' width={40} height={40} alt='map icon' />
    );
  }

  return (
    <div id={`${taskId}-map`} className='h-full w-full rounded-[10px]'></div>
  );
}

export default MapDisplay;
