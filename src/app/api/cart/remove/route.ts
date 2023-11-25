import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';
import { getSessionUser } from '@/helper/server/utils';

export async function DELETE(_: NextRequest) {
  try {
    const { id } = await getSessionUser();
    const cart = await db.cart.findFirst({
      where: {
        userId: id,
        completed: false,
        deleted: false,
      },
    });

    if (!cart) {
      return NextResponse.json(
        { error: '카트가 존재하지 않습니다.' },
        { status: 404 },
      );
    } else {
      await db.cart.update({
        where: { id },
        data: {
          deleted: true,
          updatedAt: new Date(),
        },
      });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
