'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import clsx from 'clsx';

import {
  readWeddingAPI,
  removeSignAPI,
  removeWeddingAPI,
} from '@/helper/client/apis';
import { WeddingTitle } from './title/WeddingTitle';
import { Modal } from '../common/Modal';
import { useRemoveWedding } from './hooks/useRemoveWedding';
import { WeddingButtons } from './WeddingButtons';
import { WeddingResult } from './WeddingResult';
import { WeddingFirst } from './WeddingFirst';

interface Props {
  id: string;
}

export function ReadWedding({ id }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Data Fetching
  const { data: wedding, refetch } = useQuery({
    queryKey: ['wedding'],
    queryFn: () => readWeddingAPI(id),
    enabled: !!id,
  });

  // Data Mutations
  const removeSignMutate = useMutation({ mutationFn: removeSignAPI });
  const removeWeddingMutate = useMutation({ mutationFn: removeWeddingAPI });

  const onBack = () => {
    router.back();
  };

  const onUpdateExpensePage = () => {
    router.push(`/expense/update/${id}`);
  };

  const onRemoveSign = async () => {
    await removeSignMutate.mutateAsync(id, {
      onSuccess: () => {
        toast.success('서명 삭제!');
        refetch();
      },
      onError: (err: any) => {
        toast.error(err);
      },
    });
  };

  const onRemoveWedding = async () => {
    await removeWeddingMutate.mutateAsync(id, {
      onSuccess: () => {
        toast.success('웨딩 전표 삭제!');
        queryClient.invalidateQueries({
          queryKey: ['weddings', 'wedding', id],
        });
        router.replace('/weddings');
      },
      onError: (err: any) => {
        toast.error(err);
      },
    });
  };

  // Remove Modal
  const weddingModal = useRemoveWedding({ onRemoveWedding });

  return (
    <div
      className={clsx(
        'flex flex-col items-center text-center',
        'mt-4 mb-24 animate-fadeIn shadow-custom',
        'print:w-[210mm] print:min-h-[297mm] print:m-0 print:mt-4 print:p-0',
      )}
    >
      {wedding && (
        <>
          <WeddingTitle
            id={id}
            wedding={wedding}
            onRemoveSign={onRemoveSign}
            refetch={refetch}
          />

          <div className="flex mb-5 md:flex-col print:flex-row">
            <WeddingFirst wedding={wedding} />
          </div>

          <div className="flex mb-5 md:flex-col print:flex-row">
            <WeddingResult wedding={wedding} />
          </div>

          <WeddingButtons
            onBack={onBack}
            onModalClick={weddingModal.onModalClick}
            onUpdateExpensePage={onUpdateExpensePage}
          />

          <Modal
            visible={weddingModal.viewModal}
            title="웨딩 빌지 삭제"
            content="정말 삭제하시나요?"
            onConfirm={weddingModal.onModalConfirm}
            onCancel={weddingModal.onModalCancel}
          />
        </>
      )}
    </div>
  );
}
