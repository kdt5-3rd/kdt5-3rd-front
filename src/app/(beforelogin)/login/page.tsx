import SubmitButton from '@/app/_components/common/SubmitButton';
import NormalInput from '@/app/_components/common/NormalInput';
import Link from 'next/link';

export default function Login() {
  return (
    <div className='relative inset-0 h-dvh w-dvw bg-[#FAFAFA]'>
      <div className='absolute top-1/2 left-1/2 flex w-[392px] -translate-1/2 flex-col'>
        <div className='mb-[10px] flex flex-col gap-[30px]'>
          <div className='text-primary-900 text-center text-6xl font-bold'>
            똘개비
          </div>
          <form className='flex flex-col gap-[30px]'>
            <div className='flex flex-col gap-[10px]'>
              <div className='flex flex-col gap-[6px]'>
                <label htmlFor='id' className='text-xl'>
                  아이디
                </label>
                <NormalInput id='id' type='text' placeholder='아이디' />
              </div>
              <div className='flex flex-col gap-[6px]'>
                <label htmlFor='password' className='text-xl'>
                  비밀번호
                </label>
                <NormalInput
                  id='password'
                  type='password'
                  placeholder='비밀번호'
                />
              </div>
            </div>
            <SubmitButton>로그인</SubmitButton>
          </form>
        </div>
        <div className='text-secondary-300 text-center text-lg'>
          아직 회원이 아니신가요?{' '}
          <Link
            href='/register'
            className='text-secondary-400 cursor-pointer underline'
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
