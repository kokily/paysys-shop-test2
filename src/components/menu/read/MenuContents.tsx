import type { Item } from '@prisma/client';
import type { SyntheticEvent } from 'react';

import { CartTable } from './contents/CartTable';
import { CartInput } from './contents/CartInput';
import { CartButtons } from './contents/CartButtons';

interface Props {
  menu: Item;
  onAddCart: (e: SyntheticEvent) => void;
  onBack: () => void;
}

export function MenuContents({ menu, onAddCart, onBack }: Props) {
  return (
    <div className="flex flex-col items-center p-6 h-auto bg-white">
      <CartTable menu={menu} />

      <hr />

      <CartInput menu={menu} />

      <CartButtons onAddCart={onAddCart} onBack={onBack} />
    </div>
  );
}
