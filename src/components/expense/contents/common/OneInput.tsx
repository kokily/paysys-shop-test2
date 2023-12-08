import type { ChangeEvent } from 'react';
import clsx from 'clsx';

interface Props {
  title: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  husband?: boolean;
  bride?: boolean;
  short?: boolean;
}

export function OneInput(props: Props) {
  const { title, name, value, onChange, husband, bride, short } = props;

  return (
    <tr>
      <th
        className={clsx('px-2', {
          ['ring-1 ring-purple-500 ring-inset']: short,
        })}
      >
        {title}
      </th>
      <td
        colSpan={3}
        className={clsx({
          ['ring-1 ring-sky-500 ring-inset rounded-sm']: husband,
          ['ring-1 ring-pink-500 ring-inset rounded-sm']: bride,
          ['ring-1 ring-red-500 ring-inset']: short,
        })}
      >
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className={clsx(
            'w-[130px] ml-2 px-2 border-none text-center',
            'focus focus:outline-none',
            {
              ['w-[130px]']: short,
            },
          )}
        />
      </td>
    </tr>
  );
}
