import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import db from '@/helper/server/database';
import { getSessionUser } from '@/helper/server/utils';
import { serializeUser } from '@/helper/client/utils';

export async function POST(req: NextRequest) {
  const { password } = (await req.json()) as PasswordPayload;

  try {
    const user = await getSessionUser();
    const updateUser = await db.user.update({
      where: { id: user.id },
      data: {
        password: await bcrypt.hash(password, 10),
        updatedAt: new Date(),
      },
    });

    const serializedUser = serializeUser(updateUser);

    return NextResponse.json(serializedUser);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
