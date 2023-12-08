import { useAtom } from 'jotai';
import clsx from 'clsx';

import { expenseState } from '@/helper/store';
import { TableSelect } from '../common/TableSelect';
import { OneInput } from '../common/OneInput';
import { TableInput } from '../common/TableInput';

export function Meal() {
  const [state, dispatch] = useAtom(expenseState);
  const { mealsMethod, mealsPrice, mealsHusband, mealsBride } = state;

  const provier = [
    { title: '각각 결제', value: 'privacy' },
    { title: '신랑 결제', value: 'husband' },
    { title: '신부 결제', value: 'bride' },
    { title: '반반 결제', value: 'half' },
  ];

  return (
    <>
      <h3 className="text-1xl font-bold my-4">식사 비용</h3>

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
            title="식대 분할"
            name="mealsMethod"
            value={mealsMethod}
            onChange={(e) =>
              dispatch({ ...state, mealsMethod: e.target.value })
            }
            data={provier}
          />
          <OneInput
            title="식대 단가"
            name="mealsPrice"
            value={mealsPrice}
            onChange={(e) => dispatch({ ...state, mealsPrice: e.target.value })}
            short={true}
          />
          <TableInput
            title="식사인원"
            husbandName="mealsHusband"
            husbandValue={mealsHusband}
            onChangeHusband={(e) =>
              dispatch({ ...state, mealsHusband: e.target.value })
            }
            brideName="mealsBride"
            brideValue={mealsBride}
            onChangeBride={(e) =>
              dispatch({ ...state, mealsBride: e.target.value })
            }
            unit="명"
          />
        </tbody>
      </table>
    </>
  );
}
