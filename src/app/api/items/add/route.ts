import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';
import { checkAdmin } from '@/helper/server/utils';

export async function POST(req: NextRequest) {
  const payload = (await req.json()) as AddItemPayload;

  try {
    await checkAdmin();

    const itemCount = await db.item.count();
    const item = await db.item.create({
      data: {
        num: itemCount + 1,
        ...payload,
      },
    });

    return NextResponse.json(item);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
