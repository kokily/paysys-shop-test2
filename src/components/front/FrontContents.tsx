import type { Bill } from '@prisma/client';

import { unitOfAccount } from '@/helper/client/utils';

interface Props {
  front: Bill;
}

export function FrontContents({ front }: Props) {
  return (
    <table className="w-full p-0 rounded-sm overflow-hidden mb-8">
      <thead>
        <tr>
          <th className="py-2 text-center bg-sky-500 text-white print:text-blue-500">
            구분
          </th>
          <th className="py-2 text-center bg-sky-500 text-white print:text-blue-500">
            상품명
          </th>
          <th className="py-2 text-center bg-sky-500 text-white print:text-blue-500">
            단가
          </th>
          <th className="py-2 text-center bg-sky-500 text-white print:text-blue-500">
            수량
          </th>
          <th className="py-2 text-center bg-sky-500 text-white print:text-blue-500">
            소계
          </th>
        </tr>
      </thead>

      <tbody>
        {front.items === null || front.items.length === 0 ? (
          <tr>
            <td className="py-2 text-center" colSpan={5}>
              데디터가 없습니다.
            </td>
          </tr>
        ) : (
          <>
            {front.items.map((item: any) => (
              <tr
                key={item.id}
                className="hover:bg-blue-300 hover:text-white transition-colors cursor-pointer"
              >
                <td className="py-2 text-center print:text-black">
                  {item.native}
                </td>
                <td className="py-2 text-center print:text-black">
                  {item.name}
                </td>
                <td className="py-2 text-center text-sky-700 print:text-black">
                  {unitOfAccount(item.price, '원')}
                </td>
                <td className="py-2 text-center print:text-black">
                  {item.count}
                  {item.unit}
                </td>
                <td className="py-2 text-center text-sky-700 font-bold print:text-black">
                  {unitOfAccount(item.price * item.count, '원')}
                </td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
}
