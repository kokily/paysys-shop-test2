import type { PropsWithChildren } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface Props extends PropsWithChildren {
  href?: string;
  onClick?: () => void;
}

export function NavItem(props: Props) {
  const jsx = (
    <div
      onMouseDown={props.onClick}
      className={clsx(
        'px-3 py-3 font-medium',
        'tracking-wider cursor-pointer text-slate-700',
        'hover:bg-teal-500 hover:text-white hover:font-semibold',
      )}
    >
      {props.children}
    </div>
  );
  return props.href ? (
    <Link href={props.href} passHref={true}>
      <div className="w-full text-inherit">{jsx}</div>
    </Link>
  ) : (
    jsx
  );
}
