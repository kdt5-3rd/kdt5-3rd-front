import Image from 'next/image';
import { useEffect, useMemo, useRef } from 'react';

interface mapProps {
  taskId: number;
  location: {
    lat: string;
    lng: string;
  };
}

function MapDisplay({ taskId, location }: mapProps) {
  const mapRef = useRef<naver.maps.Map | null>(null);

  const center = useMemo(() => {
    if (!location || !location.lat || !location.lng) return null;

    return new naver.maps.LatLng(
      parseFloat(location.lat),
      parseFloat(location.lng),
    );
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
    };

    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.MAP_CLIENT_ID}`;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, [taskId, center]);

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
