'use client';

import { type SyntheticEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

import {
  addBillAPI,
  removeCartAPI,
  removeOneCartAPI,
  viewCartAPI,
} from '@/helper/client/apis';
import { cartState, initialCart } from '@/helper/store';
import { useRemoveCart } from './useRemoveCart';
import { Loading } from '../common/Loading';
import { CartTop } from './CartTop';
import { CartButton } from './CartButton';
import { CartTotal } from './CartTotal';
import { CartInputs } from './CartInputs';
import { Modal } from '../common/Modal';

export function ViewCart() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [state, dispatch] = useAtom(cartState);
  const { title, hall, etc, totalAmount } = state;

  // Data Fetching
  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => viewCartAPI(),
    enabled: true,
    staleTime: 0,
  });

  // Data Mutations
  const addBillMutate = useMutation({ mutationFn: addBillAPI });
  const removeAllCartMutate = useMutation({ mutationFn: removeCartAPI });
  const removeOneCartMutate = useMutation({ mutationFn: removeOneCartAPI });

  const onAddBill = async (e: SyntheticEvent) => {
    e.preventDefault();

    await addBillMutate.mutateAsync(
      {
        title,
        hall,
        etc: etc === '' ? ' ' : etc,
      },
      {
        onSuccess: (data) => {
          onRemoveAllCart();
          queryClient.invalidateQueries({
            queryKey: ['fronts', 'front', 'cart'],
          });
          router.replace(`/fronts/${data.id}`);
        },
        onError: (err: any) => {
          toast.error(err);
        },
      },
    );
  };

  const onRemoveAllCart = async () => {
    await removeAllCartMutate.mutateAsync(undefined, {
      onSuccess: () => {
        dispatch(initialCart);
        queryClient.invalidateQueries({ queryKey: ['cart'] });
        toast.success('카트 삭제');
      },
      onError: (err: any) => {
        toast.error(err);
      },
    });
  };

  const onRemoveOneCart = async (id: string, name: string) => {
    if (window.confirm(`${name} 품목을 삭제합니다`)) {
      await removeOneCartMutate.mutateAsync(id, {
        onSuccess: (data: any) => {
          queryClient.invalidateQueries({ queryKey: ['cart'] });

          if (data.id) {
            toast.success(`${name} 품목 삭제`);
            onCal(data.items);
          } else {
            toast.success(`카트 삭제`);
          }
        },
        onError: (err: any) => {
          toast.error(err);
        },
      });
    } else {
      return;
    }
  };

  const onCal = (items: Array<any>) => {
    let total = 0;

    for (let key in items as any) {
      total += items[key as any].amount;
    }

    dispatch({ ...state, totalAmount: total });
  };

  // Remove Modal
  const { viewModal, onModalClick, onModalConfirm, onModalCancel } =
    useRemoveCart({ onRemoveAllCart });

  useEffect(() => {
    if (cart?.items && cart.items.length > 0) {
      onCal(cart.items);
    }
  }, [cart?.items]);

  return (
    <div className="flex flex-col items-center p-4 mb-24 sm:w-full sm:p-1">
      {isLoading ? (
        <Loading title="전표 불러오는 중" />
      ) : (
        <>
          <CartTop cart={cart!} onRemoveOneCart={onRemoveOneCart} />
          <CartTotal />

          <div className="mt-4">
            <div className="w-80 sm:w-full">
              <CartInputs />

              <CartButton onAddBill={onAddBill} onRemoveModal={onModalClick} />
            </div>
          </div>

          <Modal
            visible={viewModal}
            title="카트삭제"
            content="정말 삭제하세용?"
            onConfirm={onModalConfirm}
            onCancel={onModalCancel}
          />
        </>
      )}
    </div>
  );
}
