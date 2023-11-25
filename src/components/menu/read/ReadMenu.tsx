'use client';

import type { SyntheticEvent } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useAtom } from 'jotai';
import clsx from 'clsx';

import { addCartAPI, readMenuAPI } from '@/helper/client/apis';
import { MenuLogo } from './MenuLogo';
import { MenuContents } from './MenuContents';
import { menuState } from '@/helper/store';

interface Props {
  id: string;
}

export function ReadMenu({ id }: Props) {
  const { data } = useSession();
  const router = useRouter();

  const [state, dispatch] = useAtom(menuState);
  const { count, price } = state;

  // Data Fetching
  const { data: menu } = useQuery({
    queryKey: ['Menu'],
    queryFn: () => readMenuAPI(id),
    enabled: !!id,
  });

  // Data Mutations
  const addCartMutate = useMutation({ mutationFn: addCartAPI });

  const onBack = () => {
    router.back();
  };

  const onAddCart = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (parseInt(count) < 1 || parseInt(price) < 1) {
      toast.warning('단가 또는 수량을 입력하세요');
      return;
    }

    await addCartMutate.mutateAsync(
      {
        itemId: id,
        userId: data?.user.id!,
        count: parseInt(count),
        price: parseInt(price),
      },
      {
        onSuccess: () => {
          dispatch({ count: '', price: '' });
          router.back();
        },
        onError: (err: any) => {
          toast.error(err);
        },
      },
    );
  };

  useEffect(() => {
    if (menu) {
      if (menu.price !== 0) {
        dispatch({ ...state, price: menu.price.toString() });
      } else {
        dispatch({ ...state, price: '' });
      }
    }
  }, [menu]);

  return menu ? (
    <div
      className={clsx(
        'absolute w-80 top-1/2 left-1/2',
        'transition-transform -translate-x-1/2 -translate-y-1/2',
        'rounded-tl-md rounded-tr-md animate-fadeIn shadow-custom',
      )}
    >
      <MenuLogo divide={menu.divide} native={menu.native} />
      <MenuContents menu={menu} onAddCart={onAddCart} onBack={onBack} />
    </div>
  ) : null;
}
