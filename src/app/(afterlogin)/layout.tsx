'use client';

import { useEffect } from 'react';
import { rehydrateAuthStore, useAuthStore } from '../store/authStore';
import { useRouter } from 'next/navigation';

export default function AfterLoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  useEffect(() => {
    rehydrateAuthStore();

    const { accessToken } = useAuthStore.getState();
    if (accessToken === null) {
      router.push('/login');
    }
  }, []);

  return <>{children};</>;
}
