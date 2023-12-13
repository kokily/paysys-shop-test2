import type { Wedding } from '@prisma/client';
import clsx from 'clsx';

import { unitOfAccount } from '@/helper/client/utils';

interface Props {
  wedding: Wedding;
}

export function WeddingFirst({ wedding }: Props) {
  const TableHead =
    'rounded-sm py-1 bg-purple-200 text-purple-600 border-[1px] border-slate-200 w-[93.3px] text-sm';

  const TableData =
    'rounded-sm py-1 text-purple-600 text-right overflow-hidden border-[1px] border-slate-200 text-sm';

  const Sub = 'text-bold';

  return (
    <table className="text-base h-full print:mt-[25.78px]">
      <tbody>
        <tr>
          <th className={TableHead} colSpan={4}>
            예식비용
          </th>
        </tr>

        <tr>
          <th className={TableHead}>구분</th>
          <th className={TableHead}>신랑</th>
          <th className={TableHead}>신부</th>
          <th className={TableHead}>계</th>
        </tr>

        <tr>
          <th className={TableHead}>웨딩홀 사용료</th>
          <td className={TableData}>
            {unitOfAccount(wedding.rentalHusband, '원')}
          </td>
          <td className={TableData}>
            {unitOfAccount(wedding.rentalBride, '원')}
          </td>
          <td className={clsx(TableData, Sub)}>
            {unitOfAccount(wedding.rentalHusband + wedding.rentalBride, '원')}
          </td>
        </tr>

        <tr>
          <th className={TableHead}>예도칼</th>
          <td className={TableData}>
            {unitOfAccount(wedding.swordHusband, '원')}
          </td>
          <td className={TableData}>
            {unitOfAccount(wedding.swordBride, '원')}
          </td>
          <td className={clsx(TableData, Sub)}>
            {unitOfAccount(wedding.swordHusband + wedding.swordBride, '원')}
          </td>
        </tr>

        <tr>
          <th className={TableHead}>예식장갑</th>
          <td className={TableData}>
            {unitOfAccount(wedding.gloveHusband, '원')}
          </td>
          <td className={TableData}>
            {unitOfAccount(wedding.gloveBride, '원')}
          </td>
          <td className={clsx(TableData, Sub)}>
            {unitOfAccount(wedding.gloveHusband + wedding.gloveBride, '원')}
          </td>
        </tr>

        <tr>
          <th className={TableHead}>예도세트</th>
          <td className={TableData}>
            {unitOfAccount(wedding.swordSetHusband, '원')}
          </td>
          <td className={TableData}>
            {unitOfAccount(wedding.swordSetBride, '원')}
          </td>
          <td className={clsx(TableData, Sub)}>
            {unitOfAccount(
              wedding.swordSetHusband + wedding.swordSetBride,
              '원',
            )}
          </td>
        </tr>

        <tr>
          <th className={TableHead}>부 케</th>
          <td className={TableData}>
            {unitOfAccount(wedding.bouquetHusband, '원')}
          </td>
          <td className={TableData}>
            {unitOfAccount(wedding.bouquetBride, '원')}
          </td>
          <td className={clsx(TableData, Sub)}>
            {unitOfAccount(wedding.bouquetHusband + wedding.bouquetBride, '원')}
          </td>
        </tr>

        <tr>
          <th className={TableHead}>총 예식비용</th>
          <td className={TableData}>
            {unitOfAccount(wedding.weddingHusbandCost, '원')}
          </td>
          <td className={TableData}>
            {unitOfAccount(wedding.weddingBrideCost, '원')}
          </td>
          <td className={clsx(TableData, Sub)}>
            {unitOfAccount(
              wedding.weddingHusbandCost + wedding.weddingBrideCost,
              '원',
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
