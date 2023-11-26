import { NextRequest, NextResponse } from 'next/server';

import { checkAdmin } from '@/helper/server/utils';
import db from '@/helper/server/database';

export async function DELETE(_: NextRequest, { params: { id } }: any) {
  try {
    await checkAdmin();
    await db.bill.update({
      where: { id },
      data: {
        reserve: undefined,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ message: '예약금 삭제' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
