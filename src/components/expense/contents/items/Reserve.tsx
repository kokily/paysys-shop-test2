import { useAtom } from 'jotai';
import clsx from 'clsx';

import { expenseState } from '@/helper/store';
import { TableSelect } from '../common/TableSelect';
import { OneInput } from '../common/OneInput';

export function Reserve() {
  const [state, dispatch] = useAtom(expenseState);
  const { reserveMethod, reservePrice } = state;

  const provider = [
    { title: '예약금 반반', value: 'half' },
    { title: '예약금 신랑', value: 'husband' },
    { title: '예약금 신부', value: 'bride' },
  ];

  return (
    <>
      <h3 className="text-1xl font-bold my-4">예약금</h3>

      <table className="text-[0.95rem]">
        <thead>
          <th
            className={clsx(
              'w-32 px-2 bg-purple-500 text-white rounded-sm',
              'ring-1 ring-inset ring-purple-500 focus focus:outline-none',
            )}
          >
            구 분
          </th>
          <th
            className={clsx(
              'w-32 px-2 bg-sky-500 text-white rounded-sm',
              'ring-1 ring-inset ring-sky-500 focus focus:outline-none',
            )}
          >
            신랑
          </th>
          <th
            className={clsx(
              'w-32 px-2 bg-pink-500 text-white rounded-sm',
              'ring-1 ring-inset ring-pink-500 focus focus:outline-none',
            )}
          >
            신부
          </th>
          <th
            className={clsx(
              'w-32 px-2 bg-red-500 text-white rounded-sm',
              'ring-1 ring-inset ring-red-500 focus focus:outline-none',
            )}
          >
            계
          </th>
        </thead>

        <tbody>
          <TableSelect
            title="예약금 분할"
            name="reserveMethod"
            value={reserveMethod}
            onChange={(e) =>
              dispatch({ ...state, reserveMethod: e.target.value })
            }
            data={provider}
          />
          <OneInput
            title="예약금"
            name="reservePrice"
            value={reservePrice}
            onChange={(e) =>
              dispatch({ ...state, reservePrice: e.target.value })
            }
            short={true}
          />
        </tbody>
      </table>
    </>
  );
}
