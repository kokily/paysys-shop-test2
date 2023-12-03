import type { SyntheticEvent } from 'react';
import { useAtom } from 'jotai';

import { passwordState } from '@/helper/store';

interface Props {
  onChangePassword: (e: SyntheticEvent) => void;
}

export function PasswordTable({ onChangePassword }: Props) {
  const [state, dispatch] = useAtom(passwordState);
  const { password } = state;

  return (
    <div className="flex flex-col items-center bg-white p-5 h-auto">
      <table>
        <tbody>
          <tr>
            <th className="w-40 pt-1 pb-1 text-center rounded-md bg-sky-400 text-white ">
              변경할 비밀번호
            </th>
            <td className="w-40 text-center rounded-md">
              <input
                type="password"
                className="w-full outline-none p-2 rounded-sm ring-sky-400 ring-1"
                name="password"
                value={password}
                onChange={(e) => dispatch({ password: e.target.value })}
                placeholder="비밀번호"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
