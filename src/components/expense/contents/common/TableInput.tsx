import type { ChangeEvent } from 'react';

import { unitOfAccount } from '@/helper/client/utils';

interface Props {
  title: string;
  husbandName: string;
  husbandValue: string;
  onChangeHusband: (e: ChangeEvent<HTMLInputElement>) => void;
  brideName: string;
  brideValue: string;
  onChangeBride: (e: ChangeEvent<HTMLInputElement>) => void;
  unit: string;
}

export function TableInput(props: Props) {
  return (
    <tr>
      <th className="ring-1 ring-inset ring-purple-500 focus focus:outline-none">
        {props.title}
      </th>
      <td className="ring-1 ring-inset ring-sky-500 focus focus:outline-none">
        <input
          className="w-full border-none text-right px-2"
          type="text"
          name={props.husbandName}
          value={props.husbandValue}
          onChange={props.onChangeHusband}
        />
      </td>
      <td className="ring-1 ring-inset ring-pink-500 focus focus:outline-none">
        <input
          className="w-full border-none text-right px-2"
          type="text"
          name={props.brideName}
          value={props.brideValue}
          onChange={props.onChangeBride}
        />
      </td>
      <td className="ring-1 ring-inset ring-red-500 focus focus:outline-none text-right px-2">
        {unitOfAccount(
          parseInt(props.husbandValue) + parseInt(props.brideValue),
          props.unit,
        )}
      </td>
    </tr>
  );
}
