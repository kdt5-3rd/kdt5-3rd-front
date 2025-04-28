'use client';

import SubmitButton from '@/app/_components/common/SubmitButton';
import NormalInput from '@/app/_components/common/NormalInput';
import Link from 'next/link';
import useLoginMutation from '@/app/_hooks/useLoginMutation';
import { ChangeEvent, useState } from 'react';
import { LoginParams } from '@/app/_types/users';

const initialErrors = {
  email: '',
  password: '',
};

const validateInputData = (loginData: LoginParams) => {
  const errors = { ...initialErrors };
  let isValid = true;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!loginData.email.trim()) {
    errors.email = '아이디를 입력해주세요.';
    isValid = false;
  } else if (!emailRegex.test(loginData.email)) {
    errors.email = '아이디는 이메일 형식입니다.';
    isValid = false;
  }

  if (!loginData.password.trim()) {
    errors.password = '비밀번호를 입력해주세요.';
    isValid = false;
  }

  return { isValid, errors };
};

export default function Login() {
  const { mutate: loginMutate } = useLoginMutation();

  const [loginData, setLoginData] = useState<LoginParams>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState(initialErrors);

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateInputData(loginData);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    loginMutate(loginData);
  };

  const handleInputChange = (
    field: keyof LoginParams,
    e?: ChangeEvent<HTMLInputElement>,
    value?: string,
  ) => {
    setLoginData(prev => ({
      ...prev,
      [field]: e ? e.target.value : value,
    }));
  };

  return (
    <div className='relative inset-0 h-dvh w-dvw bg-[#FAFAFA]'>
      <div className='absolute top-1/2 left-1/2 flex -translate-1/2 flex-col sm:w-[392px]'>
        <div className='mb-[10px] flex flex-col gap-[30px]'>
          <div className='text-primary-900 text-center text-4xl font-bold sm:text-6xl'>
            똘개비
          </div>
          <form className='text-secondary-500 flex flex-col gap-[30px]'>
            <div className='flex flex-col gap-[10px]'>
              <div className='flex flex-col gap-[6px]'>
                <label
                  htmlFor='id'
                  className='flex items-center gap-[10px] text-[14px] sm:text-xl'
                >
                  아이디
                  <p className='text-error-600 text-[14px]'>{errors.email}</p>
                </label>
                <NormalInput
                  id='id'
                  type='text'
                  value={loginData.email}
                  onChange={e => handleInputChange('email', e)}
                  className={errors.email && '!border-error-600'}
                  placeholder='아이디'
                />
              </div>
              <div className='flex flex-col gap-[6px]'>
                <label
                  htmlFor='password'
                  className='flex items-center gap-[10px] text-[14px] sm:text-xl'
                >
                  비밀번호
                  <p className='text-error-600 text-[14px]'>
                    {errors.password}
                  </p>
                </label>
                <NormalInput
                  id='password'
                  type='password'
                  value={loginData.password}
                  onChange={e => handleInputChange('password', e)}
                  className={errors.password && '!border-error-600'}
                  placeholder='비밀번호'
                />
              </div>
            </div>
            <SubmitButton onClick={handleLoginClick}>로그인</SubmitButton>
          </form>
        </div>
        <div className='text-secondary-300 text-center text-[14px] sm:text-lg'>
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
