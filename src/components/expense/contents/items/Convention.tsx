import { useAtom } from 'jotai';
import clsx from 'clsx';

import { expenseState } from '@/helper/store';
import { TableInput } from '../common/TableInput';

export function Convention() {
  const [state, dispatch] = useAtom(expenseState);
  const {
    rentalHusband,
    rentalBride,
    swordHusband,
    swordBride,
    gloveHusband,
    gloveBride,
    swordSetHusband,
    swordSetBride,
    bouquetHusband,
    bouquetBride,
    companyHusband,
    companyBride,
    hostHusband,
    hostBride,
    frameHusband,
    frameBride,
    dressHusband,
    dressBride,
    etcHusband,
    etcBride,
  } = state;

  return (
    <>
      <h3 className="text-1xl font-bold my-4">컨벤션 비용</h3>

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
          <TableInput
            title="웨딩홀 사용료"
            husbandName="rentalHusband"
            husbandValue={rentalHusband}
            onChangeHusband={(e) =>
              dispatch({ ...state, rentalHusband: e.target.value })
            }
            brideName="rentalBride"
            brideValue={rentalBride}
            onChangeBride={(e) =>
              dispatch({ ...state, rentalBride: e.target.value })
            }
            unit="원"
          />

          <TableInput
            title="예도칼"
            husbandName="swordHusband"
            husbandValue={swordHusband}
            onChangeHusband={(e) =>
              dispatch({ ...state, swordHusband: e.target.value })
            }
            brideName="swordBride"
            brideValue={swordBride}
            onChangeBride={(e) =>
              dispatch({ ...state, swordBride: e.target.value })
            }
            unit="원"
          />

          <TableInput
            title="예식장갑"
            husbandName="gloveHusband"
            husbandValue={gloveHusband}
            onChangeHusband={(e) =>
              dispatch({ ...state, gloveHusband: e.target.value })
            }
            brideName="gloveBride"
            brideValue={gloveBride}
            onChangeBride={(e) =>
              dispatch({ ...state, gloveBride: e.target.value })
            }
            unit="원"
          />

          <TableInput
            title="예도칼셋"
            husbandName="swordSetHusband"
            husbandValue={swordSetHusband}
            onChangeHusband={(e) =>
              dispatch({ ...state, swordSetHusband: e.target.value })
            }
            brideName="swordSetBride"
            brideValue={swordSetBride}
            onChangeBride={(e) =>
              dispatch({ ...state, swordSetBride: e.target.value })
            }
            unit="원"
          />

          <TableInput
            title="부 케"
            husbandName="bouquetHusband"
            husbandValue={bouquetHusband}
            onChangeHusband={(e) =>
              dispatch({ ...state, bouquetHusband: e.target.value })
            }
            brideName="bouquetBride"
            brideValue={bouquetBride}
            onChangeBride={(e) =>
              dispatch({ ...state, bouquetBride: e.target.value })
            }
            unit="원"
          />

          <TableInput
            title="웨딩업체"
            husbandName="companyHusband"
            husbandValue={companyHusband}
            onChangeHusband={(e) =>
              dispatch({ ...state, companyHusband: e.target.value })
            }
            brideName="companyBride"
            brideValue={companyBride}
            onChangeBride={(e) =>
              dispatch({ ...state, companyBride: e.target.value })
            }
            unit="원"
          />

          <TableInput
            title="혼주미용"
            husbandName="hostHusband"
            husbandValue={hostHusband}
            onChangeHusband={(e) =>
              dispatch({ ...state, hostHusband: e.target.value })
            }
            brideName="hostBride"
            brideValue={hostBride}
            onChangeBride={(e) =>
              dispatch({ ...state, hostBride: e.target.value })
            }
            unit="원"
          />

          <TableInput
            title="액 자"
            husbandName="frameHusband"
            husbandValue={frameHusband}
            onChangeHusband={(e) =>
              dispatch({ ...state, frameHusband: e.target.value })
            }
            brideName="frameBride"
            brideValue={frameBride}
            onChangeBride={(e) =>
              dispatch({ ...state, frameBride: e.target.value })
            }
            unit="원"
          />

          <TableInput
            title="드레스"
            husbandName="dressHusband"
            husbandValue={dressHusband}
            onChangeHusband={(e) =>
              dispatch({ ...state, dressHusband: e.target.value })
            }
            brideName="dressBride"
            brideValue={dressBride}
            onChangeBride={(e) =>
              dispatch({ ...state, dressBride: e.target.value })
            }
            unit="원"
          />

          <TableInput
            title="기 타"
            husbandName="etcHusband"
            husbandValue={etcHusband}
            onChangeHusband={(e) =>
              dispatch({ ...state, etcHusband: e.target.value })
            }
            brideName="etcBride"
            brideValue={etcBride}
            onChangeBride={(e) =>
              dispatch({ ...state, etcBride: e.target.value })
            }
            unit="원"
          />
        </tbody>
      </table>
    </>
  );
}
