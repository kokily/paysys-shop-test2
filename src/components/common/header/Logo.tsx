'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

const pathStyles: VariantType = {
  soldier: 'text-cyan-600 text-shadow shadow-cyan-600 hover:text-shadow-lg',
  reserve: 'text-green-600 text-shadow shadow-green-600 hover:text-shadow-lg',
  general: 'text-orange-500 text-shadow shadow-orange-500 hover:text-shadow-lg',
  cart: 'text-cyan-700 text-shadow shadow-cyan-700 hover:text-shadow-lg',
  fronts: 'text-cyan-700 text-shadow shadow-cyan-700 hover:text-shadow-lg',
  password:
    'text-purple-500 text-shadow shadow-purple-500 hover:text-shadow-lg',
  wedding: 'text-purple-500 text-shadow shadow-purple-500 hover:text-shadow-lg',
};

export function Logo() {
  const pathname = usePathname();

  return (
    <Link href="/soldier">
      <button
        className={clsx(
          'cursor-pointer text-1xl font-bold tracking-wider',
          'text-shadow shadow-slate-500 hover:text-shadow-lg',
          pathStyles[pathname.split('/')[1]],
        )}
      >
        행사전표시스템
      </button>
    </Link>
  );
}
