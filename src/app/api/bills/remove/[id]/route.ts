import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';

export async function DELETE(_: NextRequest, { params: { id } }: any) {
  try {
    await db.bill.delete({
      where: { id },
    });

    return NextResponse.json({ message: '빌지 삭제' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
