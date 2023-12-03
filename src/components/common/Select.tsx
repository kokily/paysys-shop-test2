'use client';

import type { ChangeEvent } from 'react';
import clsx from 'clsx';

interface Props {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  data: string[];
}

export function Select(props: Props) {
  return (
    <div className="relative w-full mb-7 bg-inherit">
      <select
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className={clsx(
          'h-10 w-full px-2 pl-1 rounded-lg text-gray-500',
          'ring-1 ring-cyan-500 focus focus:ring-cyan-700',
          'focus:outline-none placeholder:transparent',
        )}
      >
        {props.data.map((divide, i) => (
          <option key={i} value={divide} className='py-2'>
            {divide}
          </option>
        ))}
      </select>
    </div>
  );
}
