import type { MouseEvent } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import clsx from 'clsx';

interface Props {
  onClick: (e: MouseEvent) => void;
}

export function Apeach({ onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="flex items-center cursor-pointer bg-cover select-none"
    >
      <div
        className={clsx(
          'block w-10 h-10 bg-apeach1',
          'rounded-2xl border-slate-950',
          'hover:bg-apeach2 transition-all',
        )}
      />
      <MdArrowDropDown
        className={clsx(
          'ml-1 -mr-1 text-slate-700 text-base transition',
          'hover:bg-slate-950',
        )}
      />
    </div>
  );
}
