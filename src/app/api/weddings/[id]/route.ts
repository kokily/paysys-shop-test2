import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';
import { checkAdmin } from '@/helper/server/utils';

export async function GET(_: NextRequest, { params: { id } }: any) {
  try {
    await checkAdmin();

    const wedding = await db.wedding.findUnique({
      where: { id },
    });

    return NextResponse.json(wedding);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
