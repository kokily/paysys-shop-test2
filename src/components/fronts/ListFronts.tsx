'use client';

import type { Bill } from '@prisma/client';
import { type SyntheticEvent, useMemo } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import useLocalStorage from 'use-local-storage';

import { frontsState } from '@/helper/store';
import { listBillsAPI } from '@/helper/client/apis';
import { Search } from '../common/Search';
import { FrontContents } from './FrontContents';
import { useObserver } from '@/helper/client/hooks';

export function ListFronts() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [scrollY, setScrollY] = useLocalStorage('listFrontsScroll', 0);

  const [state, dispatch] = useAtom(frontsState);
  const { title, hall, userId } = state;

  // Data Fetching
  const { data, fetchNextPage, refetch } = useInfiniteQuery({
    initialPageParam: '',
    queryKey: ['fronts'],
    queryFn: ({ pageParam }) =>
      listBillsAPI({ cursor: pageParam, title, hall, userId }),
    getNextPageParam: (data) =>
      data && data.length === 40 ? data[data.length - 1].id : undefined,
    enabled: true,
  });

  const fronts = useMemo(() => {
    if (!data) return [];

    return ([] as Array<Bill>).concat(...data.pages);
  }, [data]);

  const onSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
    await queryClient.invalidateQueries({ queryKey: ['fronts'] });
    await refetch();
  };

  const onHallList = async (hall: string) => {
    await queryClient.invalidateQueries({ queryKey: ['fronts'] });
    await refetch();
  };

  const onUserList = async (userId: string) => {
    await queryClient.invalidateQueries({ queryKey: ['fronts'] });
    await refetch();
  };

  const onReadFront = (id: string) => {
    setScrollY(window.scrollY);
    router.push(`/fronts/${id}`);
  };

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && fetchNextPage();
  };

  const { setTarget } = useObserver({ onIntersect });

  return (
    <div className="mt-4 mb-24 flex flex-col items-center overflow-hidden sm:w-full">
      <h2 className="text-1xl font-bold mb-4">프런트 전표 현황</h2>

      <Search
        mode="행사명 검색"
        search={title}
        onChange={(e) => dispatch({ ...state, title: e.target.value })}
        onSearch={onSearch}
      />

      <FrontContents
        fronts={fronts}
        onHallList={onHallList}
        onUserList={onUserList}
        onReadFront={onReadFront}
      />

      <div ref={setTarget} />
    </div>
  );
}
