'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import clsx from 'clsx';

import {
  readUserAPI,
  removeUserAPI,
  setAdminAPI,
  setEmployeeAPI,
} from '@/helper/client/apis';
import { useRemoveUser } from './hooks/useRemoveUser';
import { Modal } from '../common/Modal';
import { UserButtons } from './UserButtons';
import { UserContents } from './UserContents';

interface Props {
  id: string;
}

export function ReadUser({ id }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Data Fetching
  const { data: user, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: () => readUserAPI(id),
    enabled: !!id,
    staleTime: 0,
  });

  // Mutations
  const removeUserMutate = useMutation({ mutationFn: removeUserAPI });
  const setAdminMutate = useMutation({ mutationFn: setAdminAPI });
  const setEmployeeMutate = useMutation({ mutationFn: setEmployeeAPI });

  const onBack = () => {
    router.back();
  };

  const onRemoveUser = async () => {
    await removeUserMutate.mutateAsync(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users', 'user', id] });
        refetch();
      },
      onError: (err: any) => {
        toast.error(err);
      },
    });
  };

  const onSetIdentity = async (select: IdentifyType) => {
    if (select === 'admin') {
      await setAdminMutate.mutateAsync(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['users', 'user', id] });
          refetch();
        },
        onError: (err: any) => {
          toast.error(err);
        },
      });
    } else {
      await setEmployeeMutate.mutateAsync(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['users', 'user', id] });
          refetch();
        },
        onError: (err: any) => {
          toast.error(err);
        },
      });
    }
  };

  // Remove Modal
  const userModal = useRemoveUser({ onRemoveUser });

  return (
    <div className="flex flex-col items-center h-auto mt-4 p-4 md:p-1">
      <div className="text-center w-full bg-slate-100 shadow-custom">
        <h2 className="text-1xl font-bold">사용자 상세보기</h2>

        <div
          className={clsx(
            'w-full mb-4 px-2 h-[3px]',
            'bg-gradient-to-tr from-teal-500 to-cyan-500',
          )}
        />

        <UserButtons
          isAdmin={user?.admin!}
          onBack={onBack}
          onSetIdentify={onSetIdentity}
          onModalClick={userModal.onModalClick}
        />

        {user && <UserContents user={user} />}
      </div>

      <Modal
        title="사용자 삭제"
        content="정말 삭제하시나요?"
        visible={userModal.viewModal}
        onConfirm={userModal.onModalConfirm}
        onCancel={userModal.onModalCancel}
      />
    </div>
  );
}
