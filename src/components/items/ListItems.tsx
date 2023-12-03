'use client';

import type { Item } from '@prisma/client';
import { SyntheticEvent, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import useLocalStorage from 'use-local-storage';

import { listItemsAPI } from '@/helper/client/apis';
import { useObserver } from '@/helper/client/hooks';
import { itemState } from '@/helper/store';
import { Search } from '../common/Search';
import { Button } from '../common/Button';
import { ItemsTable } from './ItemsTable';

export function ListItems() {
  const router = useRouter();
  const [scrollY, setScrollY] = useLocalStorage('listItemsScroll', 0);

  const [{ name }, dispatch] = useAtom(itemState);

  // Data Fetching
  const { data, fetchNextPage, refetch } = useInfiniteQuery({
    initialPageParam: '',
    queryKey: ['items'],
    queryFn: ({ pageParam }) => listItemsAPI({ cursor: pageParam, name }),
    getNextPageParam: (data) =>
      data && data.length === 40 ? data[data.length - 1].id : undefined,
    enabled: true,
  });

  const items = useMemo(() => {
    if (!data) return [];

    return ([] as Array<Item>).concat(...data.pages);
  }, [data]);

  const onSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
    await refetch();
  };

  const onReadItem = (id: string) => {
    setScrollY(window.scrollY);
    router.push(`/items/${id}`);
  };

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && fetchNextPage();
  };

  const { setTarget } = useObserver({ onIntersect });

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, []);

  console.log(name);

  return (
    <div className="flex flex-col justify-center items-center mb-4">
      <Search
        mode="품명 검색"
        search={name}
        onChange={(e) => dispatch({ name: e.target.value })}
        onSearch={onSearch}
      />

      <Link href="/items/add" className="my-2">
        <Button color="menu">품목 추가</Button>
      </Link>

      <ItemsTable items={items} onReadItem={onReadItem} />

      <div ref={setTarget} />
    </div>
  );
}
