'use client';

import type { SyntheticEvent } from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { toast } from 'react-toastify';
import clsx from 'clsx';

import { authState } from '@/helper/store';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  const { data } = useSession();
  const router = useRouter();
  const { username, password } = useAtomValue(authState);

  const onLogin = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await signIn('credentials', {
      username,
      password,
      redirect: true,
      callbackUrl: '/soldier',
    });

    if (response?.error) {
      toast.error(response.error);
      return;
    }
  };

  if (data?.user) {
    router.replace('/soldier');
  }

  return (
    <div
      className={clsx(
        'absolute w-80 top-1/2 left-1/2',
        'transition-transform -translate-x-1/2 -translate-y-1/2',
        'animate-fadeIn rounded-tl-md rounded-tr-md',
        'shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]',
      )}
    >
      <div className=" bg-cyan-400 h-20 flex items-center justify-center rounded-tl-md rounded-tr-md">
        <Link href="/">
          <div className="text-white text-4xl font-bold tracking-wide">
            로 그 인
          </div>
        </Link>
      </div>

      <LoginForm onLogin={onLogin} />
    </div>
  );
}
