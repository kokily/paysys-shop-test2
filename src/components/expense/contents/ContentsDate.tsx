import type { Dispatch, SetStateAction } from 'react';
import { useAtom } from 'jotai';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import clsx from 'clsx';

import { expenseState } from '@/helper/store';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ko', ko);

interface Props {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
}

export function ContentsDate({ startDate, setStartDate }: Props) {
  const [state, dispatch] = useAtom(expenseState);
  const { eventAt } = state;

  return (
    <div className="flex flex-col items-center justify-center my-4">
      <div className="flex items-center">
        <span className="mr-2 font-bold">웨딩일자</span>
        <DatePicker
          locale="ko"
          startDate={new Date(startDate)}
          selected={new Date(startDate)}
          onChange={setStartDate as any}
          dateFormat="yyyy, MM, dd"
          className={clsx(
            'w-28 h-6 rounded-sm p-2 cursor-pointer',
            'ring-1 ring-purple-500 focus focus:outline-none',
          )}
        />
      </div>

      <div className="flex items-center h-10">
        <span className="mr-2 font-bold">웨딩시간</span>
        <select
          className={clsx(
            'w-24 h-6 rounded-sm text-center',
            'ring-1 ring-purple-500 focus focus:outline-none',
          )}
          name="eventAt"
          value={eventAt}
          onChange={(e) => dispatch({ ...state, eventAt: e.target.value })}
        >
          <option value="11:30">11:30</option>
          <option value="13:00">13:00</option>
          <option value="14:30">14:30</option>
          <option value="16:00">16:00</option>
          <option value="17:30">17:30</option>
        </select>
      </div>
    </div>
  );
}
