'use client';

import type { SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';
import clsx from 'clsx';

import { passwordState } from '@/helper/store';
import { changePasswordAPI } from '@/helper/client/apis';
import { PasswordButtons } from './PasswordButtons';
import { PasswordTable } from './PasswordTable';

export function ChangePassword() {
  const router = useRouter();

  const [state, dispatch] = useAtom(passwordState);
  const { password } = state;

  // Data Mutations
  const changePasswordMutate = useMutation({ mutationFn: changePasswordAPI });

  const onBack = () => {
    router.back();
  };

  const onChangePassword = async (e: SyntheticEvent) => {
    e.preventDefault();

    await changePasswordMutate.mutateAsync(
      { password },
      {
        onSuccess: (data) => {
          toast.success(`${data.username}님 비밀번호가 변경되었습니다`);
          router.back();
        },
        onError: (err: any) => {
          toast.error(err);
        },
      },
    );
  };

  return (
    <div
      className={clsx(
        'absolute w-80 top-1/2 left-1/2',
        'transition-transform -translate-x-1/2 -translate-y-1/2',
        'rouned-tl-md rounded-tr-md animate-fadeIn shadow-custom',
      )}
    >
      <div
        className={clsx(
          'flex justify-center items-center pt-1',
          'bg-purple-500 text-white h-14',
          'text-2xl font-bold tracking-wider',
          'rounded-tl-md rounded-tr-md cursor-pointer',
          'hover:text-slate-200',
        )}
      >
        <h2>비밀번호 변경</h2>
      </div>

      <PasswordTable onChangePassword={onChangePassword} />
      <PasswordButtons onBack={onBack} onChangePassword={onChangePassword} />
    </div>
  );
}
