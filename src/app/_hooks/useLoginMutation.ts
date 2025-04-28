import { useMutation } from '@tanstack/react-query';
import { login } from '../_apis/users';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

const useLoginMutation = () => {
  const setTokens = useAuthStore(state => state.setTokens);
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onError: error => {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data?.message || '로그인에 실패하였습니다.';
      alert(message);
    },
    onSuccess: data => {
      setTokens(data.data.accessToken, data.data.refreshToken);
      router.push('/');
    },
  });
};

export default useLoginMutation;
