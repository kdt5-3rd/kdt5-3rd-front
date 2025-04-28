import Image from 'next/image';

type IndexType =
  | '미세먼지'
  | '초미세먼지'
  | '자외선'
  | '습도'
  | '바람'
  | '기압';

const indexType: Record<IndexType, { imageUrl: string }> = {
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

interface CurrentIndexProps {
  type: IndexType;
  value: number;
  subValue?: string;
}

function CurrentIndex({ type, value, subValue }: CurrentIndexProps) {
  return (
    <div className='bg-primary-0 border-primary-200 inline-flex flex-col gap-[10px] rounded-2xl border px-[30px] py-[26px]'>
      <div className='flex items-center gap-[5px]'>
        <div className='relative h-[16px] w-[16px] sm:h-[20px] sm:w-[20px]'>
          <Image src={indexType[type].imageUrl} alt={`${type} 이미지`} fill />
        </div>

        <p className='text-primary-400 text-[14px] font-semibold sm:text-[18px]'>
          {type}
        </p>
      </div>
      <div className='text-secondary-400 flex items-baseline font-medium'>
        <p className='text-[22px] sm:text-[34px]'>{value}</p>
        {subValue && <p className='text-[14px] sm:text-[20px]'>{subValue}</p>}
      </div>
    </div>
  );
}

export default CurrentIndex;
