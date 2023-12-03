'use client';

import { SyntheticEvent, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import useLocalStorage from 'use-local-storage';
import { useAtom } from 'jotai';

import { listUsersAPI } from '@/helper/client/apis';
import { useObserver } from '@/helper/client/hooks';
import { usernameState } from '@/helper/store';
import { UsersTable } from './UsersTable';
import { Search } from '../common/Search';

export function ListUsers() {
  const router = useRouter();
  const [scrollY, setScrollY] = useLocalStorage('listUsersScroll', 0);

  const [{ username }, dispatch] = useAtom(usernameState);

  // Data Fetching
  const { data, fetchNextPage, refetch } = useInfiniteQuery({
    initialPageParam: '',
    queryKey: ['users'],
    queryFn: ({ pageParam }) => listUsersAPI({ cursor: pageParam, username }),
    getNextPageParam: (data) =>
      data && data.length === 40 ? data[data.length - 1].id : undefined,
    enabled: true,
  });

  const users = useMemo(() => {
    if (!data) return [];

    return ([] as Array<SerializeUser>).concat(...data.pages);
  }, [data]);

  const onSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
    await refetch();
  };

  const onReadUser = (id: string) => {
    setScrollY(window.scrollY);
    router.push(`/users/${id}`);
  };

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && fetchNextPage();
  };

  const { setTarget } = useObserver({ onIntersect });

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mb-24">
      <h2 className="text-1xl font-bold">사용자 목록</h2>

      <Search
        mode="이름 검색"
        search={username}
        onChange={(e) => dispatch({ username: e.target.value })}
        onSearch={onSearch}
      />

      <UsersTable users={users} onReadUser={onReadUser} />

      <div ref={setTarget} />
    </div>
  );
}
