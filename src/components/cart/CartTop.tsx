import type { Cart } from '@prisma/client';

import { unitOfAccount } from '@/helper/client/utils';
import { Button } from '../common/Button';

interface Props {
  cart: Cart;
  onRemoveOneCart: (id: string, name: string) => void;
}

export function CartTop({ cart, onRemoveOneCart }: Props) {
  return (
    <>
      <h2 className="text-1xl font-bold mb-4">전표 확인(종합)</h2>

      <table className="w-full p-0 rounded-xl overflow-hidden">
        <thead>
          <th className="py-2 text-center bg-teal-400 text-white">적용</th>
          <th className="py-2 text-center bg-teal-400 text-white">수량</th>
          <th className="py-2 text-center bg-teal-400 text-white">단가</th>
          <th className="py-2 text-center bg-teal-400 text-white">삭제</th>
        </thead>

        <tbody>
          {cart && cart.items.length > 0 ? (
            cart.items.map((item: any) => (
              <tr key={item.id}>
                <td className="py-2 text-center border-b-b-1 border-b-cyan-400">
                  [ {item.native} ]<br />
                  {item.divide}
                </td>

                <td className="py-2 text-center border-b-b-1 border-b-cyan-400">
                  {unitOfAccount(item.count)}
                </td>

                <td className="py-2 text-center border-b-b-1 border-b-cyan-400">
                  {unitOfAccount(item.price, '원')} /<br />
                  <strong className="text-blue-600">
                    {unitOfAccount(item.amount, '원')}
                  </strong>
                </td>

                <td className="py-2 text-center border-b-b-1 border-b-cyan-400">
                  <Button
                    color="cancel"
                    smallSize
                    onClick={() => onRemoveOneCart(item.id, item.name)}
                  >
                    삭제
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-2 text-center border-b-cyan-400">
                등록된 품목이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

/*
.cart_container {
  th,
  td {
    padding-top: 1rem;
    padding-bottom: 1rem;
    text-align: center;
  }

  th {
    background: #0ca678;
    color: white;
  }

  td {
    border-bottom: 1px solid #0ca678;

    strong {
      color: blue;
    }
  }
}
*/
