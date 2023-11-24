import type { PropsWithChildren } from 'react';
import clsx from 'clsx';

interface Props extends PropsWithChildren {
  fullSize?: boolean;
  add?: boolean;
  type?: string;
  color: 'submit' | 'cancel' | 'edit' | 'menu';
  className?: string;
  onClick?: (e: any) => void;
}

const colorStyles: VariantType = {
  submit:
    'text-cyan-600 border border-cyan-600 hover:bg-cyan-600 hover:text-white hover:border-cyan-400 hover:shadow-md',
  cancel:
    'text-red-700 border border-red-700 hover:bg-red-700 hover:text-white hover:border-red-400 hover:shadow-md',
  edit: 'text-yellow-700 border border-yellow-700 hover:bg-yellow-700 hover:text-white hover:border-yellow-400 hover:shadow-md',
  menu: 'text-violet-700 border border-violet-700 hover:bg-violet-700 hover:text-white hover:border-violet-400 hover:shadow-md',
};

export function Button(props: Props) {
  const htmlProps = props as any;

  return (
    <button
      {...htmlProps}
      onClick={(e) => {
        if (htmlProps.onClick) {
          htmlProps.onClick(e);
        }

        (e.target as HTMLButtonElement).blur();
      }}
      className={clsx(
        'rounded-xl text-base font-semibold p-2',
        'cursor-pointer transition-all duration-200',
        'active:transition-transform active:translate-y-1',
        colorStyles[props.color],
        {
          ['w-full ml-0']: props.fullSize,
          ['w-24']: !props.fullSize,
          ['mr-2']: props.add,
          [props.className!]: props.className,
        },
      )}
    >
      {props.children}
    </button>
  );
}
