'use client';

import { type SyntheticEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useAtom } from 'jotai';
import clsx from 'clsx';

import { ExpenseButtons } from './contents/ExpenseButtons';
import { ExpenseContents } from './contents/ExpenseContents';
import { expenseState, initialExpense } from '@/helper/store';
import {
  addExpenseAPI,
  readWeddingAPI,
  updateExpenseAPI,
} from '@/helper/client/apis';

interface Props {
  id?: string;
}

export function AddExpense({ id }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [startDate, setStartDate] = useState(new Date());
  const [state, dispatch] = useAtom(expenseState);

  // Update Data Fetching
  const { data } = useQuery({
    queryKey: ['updateExpense'],
    queryFn: () => readWeddingAPI(id!),
    enabled: !!id,
  });

  // Mutations
  const addExpenseMutate = useMutation({ mutationFn: addExpenseAPI });
  const updateExpenseMutate = useMutation({ mutationFn: updateExpenseAPI });

  const onBack = () => {
    router.back();
  };

  const onAddExpense = async (e: SyntheticEvent) => {
    e.preventDefault();

    let reserveHusbandCost = '';
    let reserveBrideCost = '';
    let mealsHusbandCost = '';
    let mealsBrideCost = '';
    let weddingHusbandCost = '';
    let weddingBrideCost = '';

    // Reserve
    switch (state.reserveMethod) {
      case 'half':
        reserveHusbandCost = (parseInt(state.reservePrice) / 2).toString();
        reserveBrideCost = (parseInt(state.reservePrice) / 2).toString();
        break;
      case 'husband':
        reserveHusbandCost = state.reservePrice;
        reserveBrideCost = '0';
        break;
      case 'bride':
        reserveHusbandCost = '0';
        reserveBrideCost = state.reservePrice;
        break;
      default:
        break;
    }

    // Meals
    switch (state.mealsMethod) {
      case 'privacy':
        mealsHusbandCost = (
          parseInt(state.mealsPrice) * parseInt(state.mealsHusband)
        ).toString();
        mealsBrideCost = (
          parseInt(state.mealsPrice) * parseInt(state.mealsBride)
        ).toString();
        break;
      case 'husband':
        mealsHusbandCost = (
          parseInt(state.mealsPrice) *
          (parseInt(state.mealsHusband) + parseInt(state.mealsBride))
        ).toString();
        mealsBrideCost = '0';
        break;
      case 'bride':
        mealsHusbandCost = '0';
        mealsBrideCost = (
          parseInt(state.mealsPrice) *
          (parseInt(state.mealsHusband) + parseInt(state.mealsBride))
        ).toString();
        break;
      case 'half':
        mealsHusbandCost = (
          (parseInt(state.mealsPrice) *
            (parseInt(state.mealsHusband) + parseInt(state.mealsBride))) /
          2
        ).toString();
        mealsBrideCost = (
          (parseInt(state.mealsPrice) *
            (parseInt(state.mealsHusband) + parseInt(state.mealsBride))) /
          2
        ).toString();
        break;
      default:
        break;
    }

    // Wedding Cost
    weddingHusbandCost = (
      parseInt(state.rentalHusband) +
      parseInt(state.swordHusband) +
      parseInt(state.gloveHusband) +
      parseInt(state.swordSetHusband) +
      parseInt(state.bouquetHusband) +
      parseInt(state.companyHusband) +
      parseInt(state.hostHusband) +
      parseInt(state.frameHusband) +
      parseInt(state.dressHusband) +
      parseInt(state.etcHusband)
    ).toString();
    weddingBrideCost = (
      parseInt(state.rentalBride) +
      parseInt(state.swordBride) +
      parseInt(state.gloveBride) +
      parseInt(state.swordSetBride) +
      parseInt(state.bouquetBride) +
      parseInt(state.companyBride) +
      parseInt(state.hostBride) +
      parseInt(state.frameBride) +
      parseInt(state.dressBride) +
      parseInt(state.etcBride)
    ).toString();

    if (!id) {
      // Add Expense
      await addExpenseMutate.mutateAsync(
        {
          husbandName: state.husbandName,
          brideName: state.brideName,
          rentalHusband: parseInt(state.rentalHusband),
          swordHusband: parseInt(state.swordHusband),
          gloveHusband: parseInt(state.gloveHusband),
          swordSetHusband: parseInt(state.swordSetHusband),
          bouquetHusband: parseInt(state.bouquetHusband),
          companyHusband: parseInt(state.companyHusband),
          hostHusband: parseInt(state.hostHusband),
          frameHusband: parseInt(state.frameHusband),
          dressHusband: parseInt(state.dressHusband),
          etcHusband: parseInt(state.etcHusband),
          rentalBride: parseInt(state.rentalBride),
          swordBride: parseInt(state.swordBride),
          gloveBride: parseInt(state.gloveBride),
          swordSetBride: parseInt(state.swordSetBride),
          bouquetBride: parseInt(state.bouquetBride),
          companyBride: parseInt(state.companyBride),
          hostBride: parseInt(state.hostBride),
          frameBride: parseInt(state.frameBride),
          dressBride: parseInt(state.dressBride),
          etcBride: parseInt(state.etcBride),
          weddingHusbandCost: parseInt(weddingHusbandCost),
          weddingBrideCost: parseInt(weddingBrideCost),
          mealsMethod: state.mealsMethod,
          mealsPrice: parseInt(state.mealsPrice),
          mealsHusband: parseInt(state.mealsHusband),
          mealsHusbandCost: parseInt(mealsHusbandCost),
          mealsBride: parseInt(state.mealsBride),
          mealsBrideCost: parseInt(mealsBrideCost),
          reserveMethod: state.reserveMethod,
          reservePrice: parseInt(state.reservePrice),
          reserveHusbandCost: parseInt(reserveHusbandCost),
          reserveBrideCost: parseInt(reserveBrideCost),
          eventAt: state.eventAt,
          weddingAt: startDate.toLocaleDateString(),
        },
        {
          onSuccess: (data) => {
            toast.success('웨딩전표 저장!');
            queryClient.invalidateQueries({
              queryKey: ['weddings', 'wedding'],
            });
            dispatch(initialExpense);
            router.replace(`/weddings/${data.id}`);
          },
          onError: (err: any) => {
            toast.error(err);
          },
        },
      );
    } else {
      // Update Expense
      await updateExpenseMutate.mutateAsync(
        {
          id,
          payload: {
            husbandName: state.husbandName,
            brideName: state.brideName,
            rentalHusband: parseInt(state.rentalHusband),
            swordHusband: parseInt(state.swordHusband),
            gloveHusband: parseInt(state.gloveHusband),
            swordSetHusband: parseInt(state.swordSetHusband),
            bouquetHusband: parseInt(state.bouquetHusband),
            companyHusband: parseInt(state.companyHusband),
            hostHusband: parseInt(state.hostHusband),
            frameHusband: parseInt(state.frameHusband),
            dressHusband: parseInt(state.dressHusband),
            etcHusband: parseInt(state.etcHusband),
            rentalBride: parseInt(state.rentalBride),
            swordBride: parseInt(state.swordBride),
            gloveBride: parseInt(state.gloveBride),
            swordSetBride: parseInt(state.swordSetBride),
            bouquetBride: parseInt(state.bouquetBride),
            companyBride: parseInt(state.companyBride),
            hostBride: parseInt(state.hostBride),
            frameBride: parseInt(state.frameBride),
            dressBride: parseInt(state.dressBride),
            etcBride: parseInt(state.etcBride),
            weddingHusbandCost: parseInt(weddingHusbandCost),
            weddingBrideCost: parseInt(weddingBrideCost),
            mealsMethod: state.mealsMethod,
            mealsPrice: parseInt(state.mealsPrice),
            mealsHusband: parseInt(state.mealsHusband),
            mealsHusbandCost: parseInt(mealsHusbandCost),
            mealsBride: parseInt(state.mealsBride),
            mealsBrideCost: parseInt(mealsBrideCost),
            reserveMethod: state.reserveMethod,
            reservePrice: parseInt(state.reservePrice),
            reserveHusbandCost: parseInt(reserveHusbandCost),
            reserveBrideCost: parseInt(reserveBrideCost),
            eventAt: state.eventAt,
            weddingAt: startDate.toLocaleDateString(),
          },
        },
        {
          onSuccess: () => {
            toast.success('웨딩전표 수정!');
            queryClient.invalidateQueries({
              queryKey: ['weddings', 'wedding'],
            });
            dispatch(initialExpense);
            router.back();
          },
          onError: (err: any) => {
            toast.error(err);
          },
        },
      );
    }
  };

  useEffect(() => {
    if (data) {
      setStartDate(new Date(data.weddingAt));
    }
  }, [data]);

  return (
    <div
      className={clsx(
        'flex flex-col justify-center items-center mb-24',
        'animate-fadeIn shadow-custom md:mb-60',
      )}
    >
      <h2 className="text-1xl font-bold text-purple-500 print:underline">
        웨딩 정산
      </h2>

      <ExpenseContents startDate={startDate} setStartDate={setStartDate} />

      <ExpenseButtons onBack={onBack} onAddExpense={onAddExpense} />
    </div>
  );
}
