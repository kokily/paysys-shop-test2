import type { Wedding } from '@prisma/client';

import { unitOfAccount } from '@/helper/client/utils';

interface Props {
  wedding: Wedding;
}

export function WeddingResult({ wedding }: Props) {
  const husbandCost =
    wedding.weddingHusbandCost +
    wedding.mealsHusbandCost -
    wedding.reserveHusbandCost;

  const brideCost =
    wedding.weddingBrideCost +
    wedding.mealsBrideCost -
    wedding.reserveBrideCost;

  const payment = husbandCost + brideCost;

  const allCost =
    husbandCost +
    brideCost +
    wedding.reserveHusbandCost +
    wedding.reserveBrideCost;

  return (
    <table className="w-full h-full text-sm min-w-[420px]">
      <tbody>
        <tr className="h-40">
          <td colSpan={4} rowSpan={9}>
            <h3 className="text-lg font-bold m-4 text-slate-400">
              웨딩 총 비용: {unitOfAccount(allCost, '원')}
            </h3>
            <h3 className="text-lg font-bold m-4 text-blue-600">
              결제 총 비용: {unitOfAccount(payment, '원')}
            </h3>
            <h3 className="text-lg font-bold m-4">
              신랑 총 비용: {unitOfAccount(husbandCost, '원')}
            </h3>
            <h3 className="text-lg font-bold m-4">
              신부 총 비용: {unitOfAccount(brideCost, '원')}
            </h3>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/*
.container {
  th,
  td {
    border: 1px solid #ced4da;
    border-radius: 8px;
    padding-top: 0.15rem;
    padding-bottom: 0.15rem;
  }

  th {
    background: #e3e0fa;
    color: #7950f2;
    width: 130px;
    &.basic {
      width: 93.3px;
    }
    &.orange {
      background: #ffa94d;
    }
    &.cyan {
      background: #3bc9db;
    }
    &.red {
      background: white;
      color: #d941c5;
    }
  }
  td {
    width: 93.3px;
    font-size: 0.9rem;
    overflow: hidden;
    text-align: center;
    &.sub {
      color: #5f3dc4;
      font-weight: bold;
    }
  }

  @include isMedium {
    margin-top: 1.5rem;
  }
}

.title {
  margin: 0.96rem;

  &.allCost {
    color: silver;
  }

  &.result {
    color: blue;
  }
}
*/
