'use client';

import clsx from 'clsx';
import { signOut } from 'next-auth/react';
import { useAtomValue } from 'jotai';

import { NavItem } from './NavItem';
import { headerState } from '@/helper/store';

interface Props {
  isAdmin: boolean;
}

export function NavList({ isAdmin }: Props) {
  const isOpen = useAtomValue(headerState);

  const Logout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  const Split = () => (
    <div className="ml-1 mr-1 h-0.5 bg-gradient-to-r from-cyan-500 to-teal-500" />
  );

  return (
    <div
      className={clsx(
        'absolute top-full right-0 mt-1 transition-all duration-300',
        'shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]',
        {
          ['opacity-100 scale-100']: isOpen,
          ['opacity-0 scale-0']: !isOpen,
        },
      )}
    >
      <div className="relative z-10 w-48 bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <NavItem href="/password">비밀번호 변경</NavItem>

        {isAdmin && (
          <>
            <Split />

            <NavItem href="/weddings">웨딩빌지</NavItem>
            <NavItem href="/items">품목 리스트</NavItem>

            <Split />

            <NavItem href="/users">사용자 목록</NavItem>
          </>
        )}

        <Split />

        <NavItem onClick={Logout}>로그아웃</NavItem>
      </div>
    </div>
  );
}
