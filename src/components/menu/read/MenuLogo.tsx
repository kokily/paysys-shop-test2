import clsx from 'clsx';

interface Props {
  divide: string;
  native: string;
}

export function MenuLogo({ divide, native }: Props) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center h-14',
        'bg-rose-400  text-white text-2xl font-semibold tracking-wider',
        'hover:text-rose-500 cursor-pointer rounded-tl-md rounded-tr-md transition-colors',
      )}
    >
      {divide} | {native}
    </div>
  );
}
