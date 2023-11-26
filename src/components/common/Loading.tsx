import clsx from 'clsx';

interface Props {
  title: string;
}

export function Loading({ title }: Props) {
  return (
    <div
      className={clsx(
        'flex space-x-2 justify-center items-center',
        'bg-white h-auto',
      )}
    >
      <span className="sr-only">{title}</span>
      <div
        className={clsx(
          'w-4 h-4 bg-black rounded-full animate-bounce',
          '[animation-delay:-0.3s]',
        )}
      />
      <div
        className={clsx(
          'w-4 h-4 bg-black rounded-full animate-bounce',
          '[animation-delay:-0.15s]',
        )}
      />
      <div className={clsx('w-4 h-4 bg-black rounded-full animate-bounce')} />
    </div>
  );
}
