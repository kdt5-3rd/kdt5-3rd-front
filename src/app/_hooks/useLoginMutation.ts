import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../_apis/users';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'next/navigation';

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const setTokens = useAuthStore(state => state.setTokens);
  const router = useRouter();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    onError: error => console.error('로그인 실패:', error),
    onSuccess: data => {
      setTokens(data.data.accessToken, data.data.refreshToken);
      queryClient.invalidateQueries({ queryKey: ['login'] });
      router.push('/');
    },
  });
};

export default useLoginMutation;
