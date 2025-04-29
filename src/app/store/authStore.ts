import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  checkLoggedIn: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      clearTokens: () => set({ accessToken: null, refreshToken: null }),
      checkLoggedIn: () => {
        const { accessToken } = get();
        return accessToken !== null;
      },
    }),
    {
      name: 'authToken',
      skipHydration: true,
    },
  ),
);

export const rehydrateAuthStore = () => {
  const store = useAuthStore.persist;
  const { accessToken } = useAuthStore.getState();

  if (typeof window !== 'undefined' && accessToken === null) {
    store.rehydrate();
  }
};
