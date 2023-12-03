import type { Item } from '@prisma/client';
import clsx from 'clsx';

import { Skelton } from '../common/Skelton';
import { unitOfAccount } from '@/helper/client/utils';

interface Props {
  items: Array<Item>;
  onReadItem: (id: string) => void;
}

export function ItemsTable({ items, onReadItem }: Props) {
  return (
    <table
      className={clsx(
        'w-full mt-4 mx-20 rounded-sm overflow-hidden',
        'md:ml-0 md:mr-0',
      )}
    >
      <thead>
        <tr className="bg-sky-500 text-white">
          <th className="py-2">분류</th>
          <th className="py-2">구분</th>
          <th className="py-2">품명</th>
          <th className="py-2">단위</th>
          <th className="py-2">단가</th>
        </tr>
      </thead>

      <tbody>
        {items && items.length > 0 ? (
          items.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-sky-400 hover:text-white cursor-pointer"
              onClick={() => onReadItem(item.id)}
            >
              <td className="py-2 text-center">{item.native}</td>
              <td className="py-2 text-center">{item.divide}</td>
              <td className="py-2 text-center">{item.name}</td>
              <td className="py-2 text-center">{item.unit}</td>
              <td className="py-2 text-center">
                {unitOfAccount(item.price, '원')}
              </td>
            </tr>
          ))
        ) : (
          <tr className="hover:bg-sky-400 hover:text-white">
            <>
              {Array.from(Array(40), (_, i) => (
                <Skelton key={i} colsNum={5} />
              ))}
            </>
          </tr>
        )}
      </tbody>
    </table>
  );
}
