import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';
import { checkAdmin } from '@/helper/server/utils';

export async function PATCH(req: NextRequest, { params: { id } }: any) {
  const payload = (await req.json()) as AddItemPayload;

  try {
    await checkAdmin();

    const item = await db.item.update({
      where: { id },
      data: {
        ...payload,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(item);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
