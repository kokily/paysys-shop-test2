import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';
import { checkAdmin, getQuery } from '@/helper/server/utils';

export async function GET(req: NextRequest) {
  const date = getQuery(req, 'date');
  const cursor = getQuery(req, 'cursor');
  const cursorObj = cursor === '' ? undefined : { id: cursor };
  const limit = 40;

  try {
    await checkAdmin();

    const weddings = await db.wedding.findMany({
      where: {
        eventAt: {
          contains: date,
        },
      },
      cursor: cursorObj,
      skip: cursor !== '' ? 1 : 0,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(weddings);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
