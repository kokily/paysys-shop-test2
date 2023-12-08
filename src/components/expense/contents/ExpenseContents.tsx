import type { Dispatch, SetStateAction } from 'react';

import { ContentsName } from './ContentsName';
import { ContentsDate } from './ContentsDate';
import { Convention } from './items/Convention';
import { Meal } from './items/Meal';
import { Reserve } from './items/Reserve';

interface Props {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
}

export function ExpenseContents({ startDate, setStartDate }: Props) {
  return (
    <div className="text-center mb-5 mx-1">
      <ContentsName />
      <ContentsDate startDate={startDate} setStartDate={setStartDate} />

      <hr className="w-11/12" />

      <Convention />
      <Meal />
      <Reserve />
    </div>
  );
}
