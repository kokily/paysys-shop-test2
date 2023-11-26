import { NextRequest, NextResponse } from 'next/server';

import { checkAdmin } from '@/helper/server/utils';
import db from '@/helper/server/database';

export async function POST(req: NextRequest) {
  const { billId, reserve } = (await req.json()) as AddReservePayload;

  try {
    await checkAdmin();

    const bill = await db.bill.update({
      where: { id: billId },
      data: {
        reserve,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(bill);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
