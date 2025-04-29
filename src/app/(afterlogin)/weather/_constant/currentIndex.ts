import { IndexNameType, IndexType } from '@/app/_types/weather';

type CurrentIndexType = {
  id: number;
  type: keyof IndexType;
  typeName: IndexNameType;
  unit: string;
};

export const currentIndex: CurrentIndexType[] = [
  {
    id: 1,
    type: 'pm10',
    typeName: '미세먼지',
    unit: 'µg/m³',
  },
  {
    id: 2,
    type: 'pm2_5',
    typeName: '초미세먼지',
    unit: 'µg/m³',
  },
  {
    id: 3,
    type: 'uv_index',
    typeName: '자외선',
    unit: '',
  },
  {
    id: 4,
    type: 'humidity',
    typeName: '습도',
    unit: '%',
  },
  {
    id: 5,
    type: 'windspeed',
    typeName: '바람',
    unit: 'm/s',
  },
  {
    id: 6,
    type: 'pressure',
    typeName: '기압',
    unit: 'hPa',
  },
];

export const indexType: Record<IndexNameType, { imageUrl: string }> = {
  미세먼지: {
    imageUrl: '/assets/weather/index/bubble-index.png',
  },
  초미세먼지: {
    imageUrl: '/assets/weather/index/bubble-index.png',
  },
  자외선: {
    imageUrl: '/assets/weather/index/sun-uv-index.png',
  },
  습도: {
    imageUrl: '/assets/weather/index/drop-index.png',
  },
  바람: {
    imageUrl: '/assets/weather/index/wind-index.png',
  },
  기압: {
    imageUrl: '/assets/weather/index/speedometer.png',
  },
};
