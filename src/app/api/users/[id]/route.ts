import { NextRequest, NextResponse } from 'next/server';

import { serializeUser } from '@/helper/client/utils';
import db from '@/helper/server/database';
import { checkAdmin } from '@/helper/server/utils';

export async function GET(_: NextRequest, { params: { id } }: any) {
  try {
    await checkAdmin();
    
    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        { error: '사용자가 없습니다.' },
        { status: 404 },
      );
    }

    const SerializedUser = serializeUser(user);

    return NextResponse.json(SerializedUser);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
