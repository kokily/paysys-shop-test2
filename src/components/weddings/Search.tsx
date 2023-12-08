import type { SyntheticEvent } from 'react';
import { useAtom } from 'jotai';
import clsx from 'clsx';

import { weddingsState } from '@/helper/store';
import { Button } from '../common/Button';

interface Props {
  onSearch: (e: SyntheticEvent) => void;
}

export function Search({ onSearch }: Props) {
  const [state, dispatch] = useAtom(weddingsState);
  const { divide, husbandName, brideName } = state;

  return (
    <div className="w-full m-auto my-4 text-center">
      <select
        className={clsx(
          'h-10 w-20 mr-2 text-center rounded-lg',
          'ring-1 ring-cyan-500 focus focus:ring-cyan-700',
          'focus:outline-none placeholder:transparent',
        )}
        name={divide}
        value={divide}
        onChange={(e) =>
          dispatch({
            ...state,
            divide: e.target.value as any,
            husbandName: '',
            brideName: '',
          })
        }
      >
        <option value="husband">신랑</option>
        <option value="bride">신부</option>
      </select>

      {divide === 'husband' ? (
        <input
          className={clsx(
            'px-2 h-10 rounded-lg bg-transparent',
            'ring-1 ring-cyan-500 focus focus:ring-cyan-700',
            'focus:outline-none',
          )}
          type="text"
          name="husband"
          value={husbandName}
          onChange={(e) => dispatch({ ...state, husbandName: e.target.value })}
          placeholder="신랑 성명"
        />
      ) : (
        <input
          className={clsx(
            'px-2 h-10 rounded-lg bg-transparent',
            'ring-1 ring-cyan-500 focus focus:ring-cyan-700',
            'focus:outline-none',
          )}
          type="text"
          name="bride"
          value={brideName}
          onChange={(e) => dispatch({ ...state, brideName: e.target.value })}
          placeholder="신부 성명"
        />
      )}

      <Button
        color="submit"
        className="ml-2"
        smallSize={true}
        onClick={onSearch}
      >
        검색
      </Button>
    </div>
  );
}
