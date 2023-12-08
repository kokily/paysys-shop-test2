'use client';

import { useEffect, type KeyboardEvent, type SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';
import clsx from 'clsx';

import { addItemAPI, readItemAPI, updateItemAPI } from '@/helper/client/apis';
import { addItemState, initialItem } from '@/helper/store';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';

interface Props {
  id?: string;
}

export function AddItem({ id }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [state, dispatch] = useAtom(addItemState);
  const { name, divide, native, unit, price } = state;

  const { data: item } = useQuery({
    queryKey: ['updateItem'],
    queryFn: () => readItemAPI(id!),
    enabled: !!id && id.length > 3,
  });

  // Mutations
  const addItemMutate = useMutation({ mutationFn: addItemAPI });
  const updateItemMutate = useMutation({ mutationFn: updateItemAPI });

  const onBack = () => {
    router.back();
  };

  const onAddItem = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (id && id.length > 3) {
      await updateItemMutate.mutateAsync(
        {
          id,
          payload: {
            name,
            divide,
            native,
            unit,
            price: parseInt(price),
          },
        },
        {
          onSuccess: () => {
            dispatch(initialItem);
            queryClient.invalidateQueries({
              queryKey: ['items', 'item', id, 'updateItem'],
            });
            toast.success('품목 수정!');
            router.back();
          },
          onError: (err: any) => {
            toast.error(err);
          },
        },
      );
    } else {
      await addItemMutate.mutateAsync(
        { name, divide, native, unit, price: parseInt(price) },
        {
          onSuccess: () => {
            dispatch(initialItem);
            toast.success('품목 추가!');
            router.back();
          },
          onError: (err: any) => {
            toast.error(err);
          },
        },
      );
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAddItem(e);
    }
  };

  const divideArray = [
    '식사(뷔페)',
    '식사(중식)',
    '식사(양식)',
    '식사(한식)',
    '식사(수행)',
    '식사(다과)',
    '대관료',
    '레드와인',
    '화이트와인/샴페인',
    '주스/차',
    '민속주/고량주',
    '양주',
    '기타주류',
    '칵테일',
    '반입료',
    '부대비용',
  ];

  const nativeArray = ['현역', '예비역', '일반'];

  useEffect(() => {
    if (item) {
      dispatch({
        name: item.name,
        divide: item.divide,
        native: item.native,
        unit: item.unit,
        price: item.price.toString(),
      });
    }
  }, [item]);

  return (
    <div
      className={clsx(
        'absolute w-80 top-1/2 left-1/2',
        'transition-transform -translate-x-1/2 -translate-y-1/2',
        'animate-fadeIn rounded-tl-sm rounded-tr-sm shadow-custom',
      )}
    >
      <div
        className={clsx(
          'flex items-center justify-center h-20',
          'bg-sky-500 text-white text-2xl font-bold tracking-wider',
          'rounded-tl-sm rounded-tr-sm cursor-pointer',
          'transition-colors hover:text-sky-200',
        )}
      >
        품목 등록
      </div>

      <div className="bg-white p-8 h-auto">
        <div className="flex flex-col justify-center items-center bg-white">
          <Input
            type="text"
            name="name"
            value={name}
            onChange={(e) => dispatch({ ...state, name: e.target.value })}
            label="품명"
            autoFocus={true}
          />
          <Select
            name="divide"
            value={divide}
            onChange={(e) => dispatch({ ...state, divide: e.target.value })}
            data={divideArray}
          />
          <Select
            name="native"
            value={native}
            onChange={(e) => dispatch({ ...state, native: e.target.value })}
            data={nativeArray}
          />
          <Input
            type="text"
            name="unit"
            value={unit}
            onChange={(e) => dispatch({ ...state, unit: e.target.value })}
            label="단위"
          />
          <Input
            type="text"
            name="price"
            value={price}
            onChange={(e) => dispatch({ ...state, price: e.target.value })}
            label="단가"
            onKeyDown={onKeyDown}
          />

          <Button color="submit" fullSize onClick={onAddItem}>
            저장하기
          </Button>
          <Button color="cancel" fullSize onClick={onBack}>
            취소하기
          </Button>
        </div>
      </div>
    </div>
  );
}
