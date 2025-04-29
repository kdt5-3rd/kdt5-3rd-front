'use client';

import SubmitButton from '@/app/_components/common/SubmitButton';
import NormalInput from '@/app/_components/common/NormalInput';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { RegisterParams } from '@/app/_types/users';
import useRegisterMutation from '@/app/_hooks/useRegisterMutation';
import { validateRegisterInput } from '@/app/_utils/validateUtil';

const initialErrors = {
  email: '',
  username: '',
  password: '',
  verifyPassword: '',
};

export default function Register() {
  const { mutate: registerMutate } = useRegisterMutation();

  const [registerData, setRegisterData] = useState<RegisterParams>({
    username: '',
    email: '',
    password: '',
  });
  const [verifyPassword, setVerifyPassword] = useState('');
  const [errors, setErrors] = useState(initialErrors);

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateRegisterInput(
      registerData,
      verifyPassword,
      initialErrors,
    );

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    registerMutate(registerData);
  };

  const handleInputChange = (
    field: keyof RegisterParams,
    e?: ChangeEvent<HTMLInputElement>,
    value?: string,
  ) => {
    setRegisterData(prev => ({
      ...prev,
      [field]: e ? e.target.value : value,
    }));
  };

  return (
    <div className='relative inset-0 h-dvh w-dvw bg-[#FAFAFA]'>
      <div className='absolute top-1/2 left-1/2 flex -translate-1/2 flex-col sm:w-[392px]'>
        <div className='mb-[10px] flex flex-col gap-[30px]'>
          <div className='text-primary-900 text-center text-4xl font-bold sm:text-6xl'>
            회원가입
          </div>
          <form className='text-secondary-500 flex flex-col gap-[30px]'>
            <div className='flex flex-col gap-[10px]'>
              <div className='flex flex-col gap-[6px]'>
                <label
                  htmlFor='id'
                  className='flex items-center gap-[10px] text-[14px] sm:text-xl'
                >
                  이메일
                  <p className='text-error-600 text-[14px]'>{errors.email}</p>
                </label>
                <NormalInput
                  id='id'
                  type='email'
                  value={registerData.email}
                  onChange={e => handleInputChange('email', e)}
                  isError={errors.email ? true : false}
                  placeholder='이메일'
                />
              </div>

              <div className='flex flex-col gap-[6px]'>
                <label
                  htmlFor='nickname'
                  className='flex items-center gap-[10px] text-[14px] sm:text-xl'
                >
                  닉네임
                  <p className='text-error-600 text-[14px]'>
                    {errors.username}
                  </p>
                </label>
                <NormalInput
                  id='nickname'
                  type='text'
                  value={registerData.username}
                  onChange={e => handleInputChange('username', e)}
                  isError={errors.username ? true : false}
                  placeholder='닉네임'
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
                  value={registerData.password}
                  onChange={e => handleInputChange('password', e)}
                  isError={errors.password ? true : false}
                  placeholder='비밀번호'
                />
              </div>
              <div className='flex flex-col gap-[6px]'>
                <label
                  htmlFor='verifyPassword'
                  className='flex items-center gap-[10px] text-[14px] sm:text-xl'
                >
                  비밀번호 확인
                  <p className='text-error-600 text-[14px]'>
                    {errors.verifyPassword}
                  </p>
                </label>
                <NormalInput
                  id='verifyPassword'
                  type='password'
                  value={verifyPassword}
                  onChange={e => setVerifyPassword(e.target.value)}
                  isError={errors.verifyPassword ? true : false}
                  placeholder='비밀번호'
                />
              </div>
            </div>
            <SubmitButton onClick={handleRegisterClick}>회원가입</SubmitButton>
          </form>
        </div>
        <div className='text-secondary-300 text-center text-[14px] sm:text-lg'>
          이미 아이디가 있으신가요?{' '}
          <Link
            href='/login'
            className='text-secondary-400 cursor-pointer underline'
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
