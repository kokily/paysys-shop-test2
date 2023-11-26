import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';
import { getSessionUser } from '@/helper/server/utils';

export async function PATCH(_: NextRequest, { params: { itemId } }: any) {
  try {
    const user = await getSessionUser();
    const cart = await db.cart.findFirst({
      where: {
        userId: user.id,
        completed: false,
        deleted: false,
      },
    });

    if (!cart) {
      return NextResponse.json(
        { error: '카트가 존재하지 않습니다.' },
        { status: 404 },
      );
    }

    // 카트 품목 수 분기점
    if (cart.items.length === 1) {
      await db.cart.update({
        where: { id: cart.id },
        data: {
          deleted: true,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json({ message: '카트 삭제' });
    } else {
      const updateCart = { ...cart };
      const idx = updateCart.items.findIndex((item: any) => {
        return item.id === itemId;
      });

      if (idx > -1) {
        updateCart.items.splice(idx, 1);
      }

      const freshCart = await db.cart.update({
        where: { id: cart.id },
        data: {
          ...(updateCart as any),
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(freshCart);
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
