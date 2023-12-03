import type { Item } from '@prisma/client';
import clsx from 'clsx';

import { unitOfAccount } from '@/helper/client/utils';

interface Props {
  item: Item;
}

export function ItemContents({ item }: Props) {
  return (
    <div
      className={clsx(
        'relative w-80 my-9 mx-auto p-4',
        'bg-white rounded-sm overflow-hidden',
      )}
    >
      <table className="w-full p-0 rounded-sm overflow-hidden">
        <tbody>
          <tr className="hover:bg-sky-500 hover:text-white">
            <th className="py-2 text-center bg-sky-500 text-white">품명</th>
            <td className="py-2 text-center">{item.name}</td>
          </tr>

          <tr className="hover:bg-sky-500 hover:text-white">
            <th className="py-2 text-center bg-sky-500 text-white">출신</th>
            <td className="py-2 text-center">{item.native}</td>
          </tr>

          <tr className="hover:bg-sky-500 hover:text-white">
            <th className="py-2 text-center bg-sky-500 text-white">구분</th>
            <td className="py-2 text-center">{item.divide}</td>
          </tr>

          <tr className="hover:bg-sky-500 hover:text-white">
            <th className="py-2 text-center bg-sky-500 text-white">단위</th>
            <td className="py-2 text-center">{item.unit}</td>
          </tr>

          <tr className="hover:bg-sky-500 hover:text-white">
            <th className="py-2 text-center bg-sky-500 text-white">단가</th>
            <td className="py-2 text-center">
              {unitOfAccount(item.price, '원')}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
