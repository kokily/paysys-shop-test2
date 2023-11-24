'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useAtom } from 'jotai';
import clsx from 'clsx';

import { headerState } from '@/helper/store';
import { Apeach } from './Apeach';
import { Logo } from './Logo';
import { NavList } from './nav/NavList';

export function Header() {
  const { data } = useSession();
  const apeachRef = useRef<HTMLDivElement>(null);
  const [, dispatch] = useAtom(headerState);

  const onToggle = () => {
    dispatch((prev) => !prev);
  };

  const onOutsideClick = useCallback((e: any) => {
    if (apeachRef.current && !apeachRef.current.contains(e.target as any)) {
      dispatch(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', onOutsideClick, true);

    return () => window.removeEventListener('click', onOutsideClick, true);
  }, [apeachRef]);

  return (
    <header
      className={clsx(
        'flex flex-col fixed w-full top-0 z-50',
        'shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]',
        'print:hidden',
      )}
    >
      <div className="bg-white flex justify-center h-auto">
        <div
          className={clsx(
            'w-1200 h-14 px-4',
            'flex flex-row items-center relative',
            'lg:w-992 md:w-full',
          )}
        >
          <Logo />

          <div className="flex-grow" />

          <>
            <div ref={apeachRef}>
              <Apeach onClick={onToggle} />
            </div>

            {data?.user && <NavList isAdmin={data.user.admin} />}
          </>
        </div>
      </div>
    </header>
  );
}
