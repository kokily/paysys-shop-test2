import { unitOfAccount } from '@/helper/client/utils';
import type { Item } from '@prisma/client';
import clsx from 'clsx';

interface Props {
  item: Item;
  onReadMenu: (id: string) => void;
}

export function MenuItem({ item, onReadMenu }: Props) {
  return (
    <div
      onClick={() => onReadMenu(item.id)}
      className={clsx(
        'flex flex-col justify-center overflow-hidden w-full h-14',
        'text-white text-lg text-center font-semibold cursor-pointer',
        'brightness-90 hover:brightness-100 shadow-custom',
        'transition-transform active:scale-0.97',
        {
          ['bg-cyan-600']: item.native === '현역',
          ['bg-green-600']: item.native === '예비역',
          ['bg-orange-500']: item.native === '일반',
        },
      )}
    >
      {item.name} | {unitOfAccount(item.price, '원')}
    </div>
  );
}
