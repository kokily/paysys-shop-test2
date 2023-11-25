import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';

export async function PATCH(_: NextRequest, { params: { id } }: any) {
  try {
    const bill = await db.bill.findUnique({
      where: { id },
    });

    if (!bill) {
      return NextResponse.json(
        { error: '해당 빌지가 없습니다.' },
        { status: 404 },
      );
    }

    const cart = await db.cart.update({
      where: { id: bill.cartId! },
      data: {
        completed: false,
        updatedAt: new Date(),
      },
    });

    await db.bill.delete({ where: { id } });

    return NextResponse.json(cart);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
