'use client';

import type { ChangeEvent, KeyboardEvent } from 'react';
import clsx from 'clsx';

interface Props {
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  onKeyDown?: (e: KeyboardEvent) => void;
  className?: string;
}

export function Input(props: Props) {
  return (
    <div className="relative w-full mb-7 bg-inherit">
      <input
        className={clsx(
          'peer bg-transparent h-10 w-full',
          'px-2 pl-4 rounded-lg text-black',
          'ring-1 ring-cyan-500 focus focus:ring-cyan-700',
          'focus:outline-none placeholder-transparent',
          props.className && props.className,
        )}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.label}
        onKeyDown={props.onKeyDown}
        required
      />
      <label
        htmlFor={props.name}
        className={clsx(
          'absolute cursor-text left-0 -top-3',
          'mx-1 px-1',
          'text-sm text-gray-500',
          'bg-inherit peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500',
          'peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600',
          'peer-focus:text-sm transition-all',
        )}
      >
        {props.label}
      </label>
    </div>
  );
}
