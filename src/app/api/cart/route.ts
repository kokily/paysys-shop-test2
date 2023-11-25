import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';
import { getSessionUser } from '@/helper/server/utils';

export async function GET(_: NextRequest) {
  try {
    const user = await getSessionUser();
    const cart = await db.cart.findFirst({
      where: {
        userId: user.id,
        completed: false,
        deleted: false,
      },
    });

    return NextResponse.json(cart);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
