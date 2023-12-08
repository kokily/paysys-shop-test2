'use client';

import type { Wedding } from '@prisma/client';
import type { SyntheticEvent } from 'react';
import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import useLocalStorage from 'use-local-storage';
import clsx from 'clsx';

import { listWeddingsAPI } from '@/helper/client/apis';
import { weddingsState } from '@/helper/store';
import { useObserver } from '@/helper/client/hooks';
import { Search } from './Search';
import { Button } from '../common/Button';
import { WeddingsTable } from './WeddingsTable';

export function ListWeddings() {
  const router = useRouter();
  const [scrollY, setScrollY] = useLocalStorage('listWeddingsScroll', 0);

  const [state] = useAtom(weddingsState);
  const { divide, husbandName, brideName } = state;

  // Data Fetching
  const { data, fetchNextPage, refetch } = useInfiniteQuery({
    initialPageParam: '',
    queryKey: ['weddings'],
    queryFn: ({ pageParam }) =>
      listWeddingsAPI({
        cursor: pageParam,
        husbandName: divide === 'husband' ? husbandName : undefined,
        brideName: divide === 'bride' ? brideName : undefined,
      }),
    getNextPageParam: (data) =>
      data && data.length === 40 ? data[data.length - 1].id : undefined,
  });

  const weddings = useMemo(() => {
    if (!data) return [];

    return ([] as Array<Wedding>).concat(...data.pages);
  }, [data]);

  const onSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
    await refetch();
  };

  const onReadWedding = (id: string) => {
    setScrollY(window.scrollY);
    router.push(`/weddings/${id}`);
  };

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && fetchNextPage();
  };

  const { setTarget } = useObserver({ onIntersect });

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, []);

  return (
    <div className="mb-[4.5rem] flex flex-col items-center">
      <h2
        className={clsx(
          'text-1xl font-bold text-center',
          'text-purple-500 shadow-purple-400/50',
          'print:underline print:mt-8',
        )}
      >
        웨딩 빌지 리스트
      </h2>

      <Search onSearch={onSearch} />

      <Link href="/expense">
        <Button color="menu">웨딩 추가</Button>
      </Link>

      <WeddingsTable weddings={weddings} onReadWedding={onReadWedding} />

      <div ref={setTarget} />
    </div>
  );
}
