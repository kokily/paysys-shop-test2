import type { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { Header } from './header/Header';

export function PageTemplate({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center">
      <Header />

      <main
        className={clsx(
          'w-full max-w-1200 mt-24 mb-0 mx-20',
          'md:mx-4 print:m-0',
        )}
      >
        {children}
      </main>

      <div>Footer</div>
    </div>
  );
}
