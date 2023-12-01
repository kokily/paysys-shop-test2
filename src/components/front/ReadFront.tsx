'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import clsx from 'clsx';

import {
  readBillAPI,
  removeBillAPI,
  removeReserveAPI,
  restoreBillAPI,
} from '@/helper/client/apis';
import { Loading } from '../common/Loading';
import { Modal } from '../common/Modal';
import { useRemoveBill } from './useRemoveBill';
import { FrontButtons } from './FrontButtons';
import { FrontEtc } from './FrontEtc';
import { FrontTitle } from './FrontTitle';
import { FrontInfo } from './FrontInfo';
import { FrontContents } from './FrontContents';

interface Props {
  id: string;
}

export function ReadFront({ id }: Props) {
  const { data } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Data Fetching
  const { data: front, refetch } = useQuery({
    queryKey: ['front'],
    queryFn: () => readBillAPI(id),
    enabled: !!id,
    staleTime: 150,
  });

  // Data Mutations
  const restoreBillMutate = useMutation({ mutationFn: restoreBillAPI });
  const removeReserveMutate = useMutation({ mutationFn: removeReserveAPI });
  const removeBillMutate = useMutation({ mutationFn: removeBillAPI });

  const onBack = () => {
    router.back();
  };

  const onRestoreBill = async () => {
    if (
      window.confirm('※ 주의!! 빌지는 삭제되고 전표확인으로 다시 돌아갑니다!!')
    ) {
      await restoreBillMutate.mutateAsync(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['fronts', 'front', id],
          });
          router.replace('/cart');
        },
        onError: (err: any) => {
          toast.error(err);
        },
      });
    }
  };

  const onAddReservePage = () => {
    router.push(`/fronts/update/${id}`);
  };

  const onRemoveReserve = async () => {
    await removeReserveMutate.mutateAsync(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['fronts', 'front', id],
        });
        refetch();
      },
      onError: (err: any) => {
        toast.error(err);
      },
    });
  };

  const onRemoveBill = async () => {
    await removeBillMutate.mutateAsync(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['fronts', 'front', id],
        });
        router.replace('/fronts');
      },
      onError: (err: any) => {
        toast.error(err);
      },
    });
  };

  const frontModal = useRemoveBill({ onRemoveBill });

  return (
    <div className="flex flex-col items-center mt-4 mb-20">
      {front ? (
        <div className="flex flex-col w-full">
          <FrontTitle title={front.title} />

          <div
            className={clsx(
              'mx-2 mb-4 h-[3px] lg:mx-20',
              'bg-gradient-to-r from-teal-300 to-cyan-300',
            )}
          />

          <FrontInfo front={front} />
          <FrontContents front={front} />

          {front.etc !== '' && front.etc !== ' ' && (
            <FrontEtc etc={front.etc} />
          )}

          <hr />

          {data?.user && (
            <FrontButtons
              front={front}
              onBack={onBack}
              onRestoreBill={onRestoreBill}
              onAddReservePage={onAddReservePage}
              onRemoveReserve={onRemoveReserve}
              onModalClick={frontModal.onModalClick}
              userId={data.user.id}
              isAdmin={data.user.admin}
            />
          )}
        </div>
      ) : (
        <Loading title="전표 로딩 중" />
      )}
      <Modal
        title="빌지 삭제"
        content="정말 삭제하시나요?"
        visible={frontModal.viewModal}
        onConfirm={frontModal.onModalConfirm}
        onCancel={frontModal.onModalCancel}
      />
    </div>
  );
}
