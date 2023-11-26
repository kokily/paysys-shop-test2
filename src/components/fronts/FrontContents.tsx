import type { Bill } from '@prisma/client';
import clsx from 'clsx';

import { useMobile } from '@/helper/client/hooks';
import { unitOfDate } from '@/helper/client/utils';

interface Props {
  fronts: Array<Bill>;
  onHallList: (hall: string) => void;
  onUserList: (userId: string) => void;
  onReadFront: (id: string) => void;
}

export function FrontContents(props: Props) {
  const { fronts, onHallList, onUserList, onReadFront } = props;
  const isMobile = useMobile();

  const thStyle = clsx(
    'py-2 text-center overflow-hidden min-w-50',
    'bg-sky-500 text-white',
  );

  const tdStyle = clsx('py-2 text-center overflow-hidden');

  const linkStyle = clsx(
    'cursor-pointer text-slate-600 transition-colors',
    'hover:text-sky-500 active:scale-0.97 font-semibold',
  );

  const strongStyle = clsx(
    'text-sky-500, transition-colors overflow-hidden',
    'p-1 rounded-md cursor-pointer select-none',
    'hover:bg-sky-500 hover:text-white',
  );

  return (
    <table
      className={clsx(
        'w-full p-0 rounded-sm overflow-hidden mt-8',
        'print:text-black',
      )}
    >
      <thead>
        <th className={thStyle}>날짜</th>
        {!isMobile && <th className={thStyle}>구분</th>}
        <th className={thStyle}>행사명</th>
        <th className={thStyle}>장소</th>
        <th className={thStyle}>작성자</th>
      </thead>

      <tbody>
        {fronts === null || fronts.length === 0 ? (
          <tr>
            <td colSpan={isMobile ? 4 : 5}>작성된 전표가 없습니다.</td>
          </tr>
        ) : (
          <>
            {fronts.map((front) => (
              <tr key={front.id}>
                <td className={clsx(tdStyle)}>{unitOfDate(front.createdAt)}</td>

                {!isMobile && (
                  <td className={clsx(tdStyle)}>
                    {(front.items[0] as any).native}
                  </td>
                )}

                <td className={clsx(tdStyle)}>
                  <strong
                    className={clsx(strongStyle)}
                    onClick={() => onReadFront(front.id)}
                  >
                    {front.title.length > 20 ? (
                      <>{front.title.slice(0, 20)}...</>
                    ) : (
                      <>{front.title}</>
                    )}
                  </strong>
                </td>

                <td
                  className={clsx(tdStyle, linkStyle)}
                  onClick={() => onHallList(front.hall)}
                >
                  {front.hall}
                </td>
                <td
                  className={clsx(tdStyle, linkStyle)}
                  onClick={() => onUserList(front.userId!)}
                >
                  {front.username}
                </td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
}
