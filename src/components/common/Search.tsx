import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from 'react';
import clsx from 'clsx';

interface Props {
  mode: string;
  search: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: SyntheticEvent) => void;
}

export function Search({ mode, search, onChange, onSearch }: Props) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(e);
    }
  };

  return (
    <div className="flex gap-3">
      <div className="flex">
        <input
          type="text"
          name="search"
          value={search}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={mode}
          className={clsx(
            'w-full md:w-80 px-3 h-10 rounded-l border-2 border-sky-500',
            'focus:outline-none focus:border-sky-500',
          )}
        />
        <button
          className={clsx(
            'bg-sky-500 text-white rounded-r w-16',
            'px-2 py-0 md:px-2 md:py-1 break-words',
          )}
          onClick={onSearch}
        >
          검색
        </button>
      </div>
    </div>
  );
}
