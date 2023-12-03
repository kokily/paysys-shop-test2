import clsx from 'clsx';

import { unitOfDate } from '@/helper/client/utils';
import { Skelton } from '../common/Skelton';

interface Props {
  users: Array<SerializeUser>;
  onReadUser: (id: string) => void;
}

export function UsersTable({ users, onReadUser }: Props) {
  const TableRow = clsx('hover:bg-sky-400 transition-colors cursor-pointer');
  const TableHeader = clsx('py-2 text-center rounded-sm bg-sky-400 text-white');
  const TableData = clsx('py-2 text-center rounded-sm');

  return (
    <div className="flex justify-center w-full max-w-md p-2 shadow-custom">
      <table className="w-full mx-20 rounded-sm overflow-hidden md:mx-0">
        <thead>
          <tr className={TableRow}>
            <th className={TableHeader}>성명</th>
            <th className={TableHeader}>가입일</th>
            <th className={TableHeader}>관리자</th>
          </tr>
        </thead>

        <tbody>
          {users ? (
            users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => onReadUser(user.id)}
                  className={TableRow}
                >
                  <td className={TableData}>{user.username}</td>
                  <td className={TableData}>{unitOfDate(user.createdAt)}</td>
                  <td className={TableData}>
                    {user.admin ? '관리자' : '일반'}
                  </td>
                </tr>
              ))
            ) : (
              <>
                <tr className="hover:bg-sky-400 transition-colors">
                  <td colSpan={3} className={TableData}>
                    데이터가 없습니다.
                  </td>
                </tr>
              </>
            )
          ) : (
            <>
              {Array.from(Array(40), (_, i) => (
                <Skelton key={i} />
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
