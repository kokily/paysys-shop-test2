'use client';

import { useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import clsx from 'clsx';

import { menu } from '@/helper/client/menu';

export function HomeItem() {
  const router = useRouter();
  const pathname = usePathname();
  const link = pathname.substring(1);

  const onMenu = useCallback(
    (divide: string) => {
      let native = '';

      switch (link) {
        case 'soldier':
          native = '현역';
          break;
        case 'reserve':
          native = '예비역';
          break;
        case 'general':
          native = '일반';
          break;
        default:
          break;
      }

      router.push(`/menu?native=${native}&divide=${divide}`);
    },
    [link],
  );

  return menu.map((item) => (
    <div
      key={item.id}
      onClick={() => onMenu(item.divide)}
      className={clsx(
        'flex flex-col justify-center overflow-hidden w-full h-14 text-white text-center',
        'text-lg font-semibold cursor-pointer brightness-90 hover:brightness-100',
        'shadow-custom',
        'transition-transform active:scale-0.97',
        {
          ['bg-cyan-600']: link === 'soldier',
          ['bg-green-600']: link === 'reserve',
          ['bg-orange-500']: link === 'general',
        },
      )}
    >
      {item.divide}
    </div>
  ));
}
