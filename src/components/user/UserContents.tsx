import clsx from 'clsx';

import { unitOfDate } from '@/helper/client/utils';

interface Props {
  user: SerializeUser;
}

export function UserContents({ user }: Props) {
  const TableRow = clsx('hover:bg-sky-500 hover:text-white');
  const TableHead = clsx('min-w-[50px] py-2 bg-sky-500 text-white');
  const TableData = clsx('py-2');

  return (
    <div
      className={clsx(
        'relative w-80 my-[36px] mx-auto p-4',
        'bg-white rounded-sm overflow-hidden shadow-custom',
      )}
    >
      <table className="w-full p-0 rounded-sm overflow-hidden">
        <tr className={TableRow}>
          <th className={TableHead}>등급</th>
          <td className={TableData}>{user.admin ? '관리자' : '일반'}</td>
        </tr>

        <tr className={TableRow}>
          <th className={TableHead}>성명</th>
          <td className={TableData}>{user.username}</td>
        </tr>

        <tr className={TableRow}>
          <th className={TableHead}>등록일</th>
          <td className={TableData}>{unitOfDate(user.createdAt)}</td>
        </tr>
      </table>
    </div>
  );
}
