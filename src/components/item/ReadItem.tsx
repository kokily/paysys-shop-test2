'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import clsx from 'clsx';

import { readItemAPI, removeItemAPI } from '@/helper/client/apis';
import { useRemoveItem } from './useRemoveItem';
import { Modal } from '../common/Modal';
import { ItemButtons } from './ItemButtons';
import { ItemContents } from './ItemContents';

interface Props {
  id: string;
}

export function ReadItem({ id }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Data Fetching
  const { data: item } = useQuery({
    queryKey: ['item'],
    queryFn: () => readItemAPI(id),
    enabled: !!id,
  });

  // Mutations
  const removeItemMutate = useMutation({ mutationFn: removeItemAPI });

  const onBack = () => {
    router.back();
  };

  const onUpdateItemPage = () => {
    router.push(`/items/update/${id}`);
  };

  const onRemoveItem = async () => {
    await removeItemMutate.mutateAsync(id, {
      onSuccess: () => {
        toast.success('품목 삭제 완료');
        queryClient.invalidateQueries({ queryKey: ['items', 'item', id] });
        router.back();
      },
      onError: (err: any) => {
        toast.error(err);
      },
    });
  };

  // Remove Modal
  const itemModal = useRemoveItem({ onRemoveItem });

  return (
    <div className="flex flex-col items-center h-auto p-4 mt-4 md:p-1">
      <div className="text-center shadow-custom w-80 md:w-full">
        <h2 className="text-1xl font-bold my-2">품목 상세보기</h2>

        <div
          className={clsx(
            'h-[3px] mb-4 mx-2 lg:mx-20',
            'bg-gradient-to-tr from-sky-400 to-cyan-400',
          )}
        />

        <ItemButtons
          onBack={onBack}
          onUpdateItemPage={onUpdateItemPage}
          onModalClick={itemModal.onModalClick}
        />

        {item && <ItemContents item={item} />}
      </div>

      <Modal
        title="품목 삭제"
        content="정말 삭제하시나요?"
        visible={itemModal.viewModal}
        onConfirm={itemModal.onModalConfirm}
        onCancel={itemModal.onModalCancel}
      />
    </div>
  );
}
