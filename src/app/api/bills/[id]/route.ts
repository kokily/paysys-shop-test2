import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';

export async function GET(_: NextRequest, { params: { id } }: any) {
  try {
    const bill = await db.bill.findUnique({
      where: { id },
    });

    return NextResponse.json(bill);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
