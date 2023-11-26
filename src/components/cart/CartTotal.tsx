import { useAtomValue } from 'jotai';

import { cartState } from '@/helper/store';
import { unitOfAccount } from '@/helper/client/utils';

export function CartTotal() {
  const { totalAmount } = useAtomValue(cartState);

  return (
    <div className="w-full mt-8 mr-4">
      <div className="float-right">
        예상 결제금액:{' '}
        <span className="text-red-500 text-3xl">
          {unitOfAccount(totalAmount, '원')}
        </span>
      </div>
    </div>
  );
}
