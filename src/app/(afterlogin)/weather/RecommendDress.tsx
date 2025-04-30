import Image from 'next/image';

function RecommendDress() {
  return (
    <div className='border-primary-200 bg-primary-0 flex h-full flex-col rounded-2xl border px-[30px] py-[26px]'>
      <div className='flex items-center gap-[5px]'>
        <Image
          src='/assets/magicpen.png'
          alt='매직펜 이미지'
          width={20}
          height={20}
        />
        <p className='text-primary-400 text-[18px] font-semibold'>
          옷차림 추천
        </p>
      </div>
      <p className='flex h-full items-center justify-center py-[15px] text-[12px] sm:text-[16px]'>
        서비스 준비 중입니다.
      </p>
    </div>
  );
}

export default RecommendDress;
