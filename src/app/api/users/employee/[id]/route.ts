import { NextRequest, NextResponse } from 'next/server';

import { serializeUser } from '@/helper/client/utils';
import db from '@/helper/server/database';

export async function PATCH(_: NextRequest, { params: { id } }: any) {
  try {
    const user = await db.user.update({
      where: { id },
      data: {
        admin: false,
        updatedAt: new Date(),
      },
    });

    const SerializedUser = serializeUser(user);

    return NextResponse.json(SerializedUser);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
