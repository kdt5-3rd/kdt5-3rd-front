import { useMutation, useQueryClient } from '@tanstack/react-query';
import { register } from '../_apis/users';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ['register'],
    mutationFn: register,
    onError: error => {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data?.message || '회원가입에 실패하였습니다.';
      alert(message);
    },
    onSuccess: () => {
      if (
        window.confirm('회원가입에 성공했습니다! 로그인 페이지로 이동합니다.')
      ) {
        queryClient.invalidateQueries({ queryKey: ['register'] });
        router.push('/login');
      }
    },
  });
};

export default useRegisterMutation;
