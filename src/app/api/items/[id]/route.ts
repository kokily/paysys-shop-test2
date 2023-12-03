import { NextRequest, NextResponse } from 'next/server';

import { checkAdmin } from '@/helper/server/utils';
import db from '@/helper/server/database';

export async function GET(_: NextRequest, { params: { id } }: any) {
  try {
    await checkAdmin();

    const item = await db.item.findUnique({ where: { id } });

    return NextResponse.json(item);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
