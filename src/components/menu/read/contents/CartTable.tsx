import type { Item } from '@prisma/client';
import { useAtom } from 'jotai';

import { unitOfAccount } from '@/helper/client/utils';
import { menuState } from '@/helper/store';

interface Props {
  menu: Item;
}

export function CartTable({ menu }: Props) {
  const [state, dispatch] = useAtom(menuState);
  const { price } = state;

  return (
    <table>
      <tbody>
        <tr className="hover:bg-black hover:opacity-50 hover:text-slate-600">
          <th className="bg-cyan-500 text-white w-40 rounded-lg pt-1 pb-1 text-center">
            구 분
          </th>
          <td className="w-40 rounded-lg pt-1 pb-1 text-center">{menu.name}</td>
        </tr>

        <tr className="hover:bg-black hover:opacity-50 hover:text-slate-600">
          <th className="bg-cyan-500 text-white w-40 rounded-lg pt-1 pb-1 text-center">
            단 가
          </th>
          <td className="w-40 rounded-lg pt-1 pb-1 text-center">
            {menu.price === 0 ? (
              <input
                type="number"
                name="price"
                value={price}
                onChange={(e) => dispatch({ ...state, price: e.target.value })}
                className="w-full h-6 p-2 rounded-md outline-none text-center"
                placeholder="0"
                required
              />
            ) : (
              <>{unitOfAccount(menu.price, '원')}</>
            )}
          </td>
        </tr>

        <tr className="hover:bg-black hover:opacity-50 hover:text-slate-600">
          <th className="bg-cyan-500 text-white w-40 rounded-lg pt-1 pb-1 text-center">
            단 위
          </th>
          <td className="w-40 rounded-lg pt-1 pb-1 text-center">{menu.unit}</td>
        </tr>
      </tbody>
    </table>
  );
}
