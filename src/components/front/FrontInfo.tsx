import type { Bill } from '@prisma/client';
import clsx from 'clsx';

import { unitOfDate, unitOfTime } from '@/helper/client/utils';

interface Props {
  front: Bill;
}

export function FrontInfo({ front }: Props) {
  return (
    <div
      className={clsx(
        'relative float-right text-center w-72 text-sm',
        'my-8 mx-auto mr-4 p-4 bg-white rounded-xm overflow-hidden',
        'sm:mr-2',
      )}
    >
      <table className="w-full p-0">
        <tbody>
          <tr className="hover:bg-cyan-600 hover:opacity-40 hover:text-white cursor-pointer">
            <th className="py-2 text-center bg-sky-500 text-white print:text-black">
              작성자
            </th>
            <td className="py-2 text-center print:text-black">
              {front.username} 님
            </td>
          </tr>
          <tr className="hover:bg-cyan-600 hover:opacity-40 hover:text-white cursor-pointer">
            <th className="py-2 text-center bg-sky-500 text-white print:text-black">
              작성일자
            </th>
            <td className="py-2 text-center print:text-black">
              {unitOfDate(front.createdAt)}
            </td>
          </tr>
          <tr className="hover:bg-cyan-600 hover:opacity-40 hover:text-white cursor-pointer">
            <th className="py-2 text-center bg-sky-500 text-white print:text-black">
              작성시간
            </th>
            <td className="py-2 text-center print:text-black">
              {unitOfTime(front.createdAt)}
            </td>
          </tr>
          <tr className="hover:bg-cyan-600 hover:opacity-40 hover:text-white cursor-pointer">
            <th className="py-2 text-center bg-sky-500 text-white print:text-black">
              행사장소
            </th>
            <td className="py-2 text-center print:text-black">{front.hall}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
