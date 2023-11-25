import type { Item } from '@prisma/client';
import { useAtom } from 'jotai';

import { Input } from '@/components/common/Input';
import { menuState } from '@/helper/store';
import { unitOfAccount } from '@/helper/client/utils';

interface Props {
  menu: Item;
}

export function CartInput({ menu }: Props) {
  const [state, dispatch] = useAtom(menuState);
  const { count, price } = state;

  return (
    <>
      <div className="mt-8 bg-white">
        <Input
          type="number"
          name="count"
          value={count}
          onChange={(e) => dispatch({ ...state, count: e.target.value })}
          label="수 량"
        />
      </div>

      <div className="text-right text-red-600 mb-0 pb-2">
        <h3 className="mb-0 pb-0 font-semibold text-lg">
          합계 금액:{' '}
          {menu.price === 0 ? (
            <>{unitOfAccount(parseInt(price) * parseInt(count), '원')}</>
          ) : (
            <>{unitOfAccount(menu.price * parseInt(count), '원')}</>
          )}
        </h3>
      </div>
    </>
  );
}
