import clsx from 'clsx';

interface Props {
  etc: string;
}

export function FrontEtc({ etc }: Props) {
  return (
    <>
      <hr />

      <div className="flex items-center w-full">
        <span
          className={clsx(
            'w-full text-blue-600 p-4 bg-blue-50',
            'border-b-1 border-blue-100 rounded-xm',
          )}
        >
          {etc}
        </span>
      </div>
    </>
  );
}
