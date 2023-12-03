import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';
import { checkAdmin, getQuery } from '@/helper/server/utils';

export async function GET(req: NextRequest) {
  const name = getQuery(req, 'name');
  const cursor = getQuery(req, 'cursor');
  const cursorObj = cursor === '' ? undefined : { id: cursor };
  const limit = 40;

  try {
    await checkAdmin();
    
    const items = await db.item.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      cursor: cursorObj,
      skip: cursor !== '' ? 1 : 0,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(items);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
