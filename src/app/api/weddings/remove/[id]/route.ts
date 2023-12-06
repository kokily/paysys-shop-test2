import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';
import { checkAdmin } from '@/helper/server/utils';

export async function DELETE(_: NextRequest, { params: { id } }: any) {
  try {
    await checkAdmin();
    await db.wedding.delete({
      where: { id },
    });

    return NextResponse.json({ message: '웨딩빌지 삭제' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
