import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';
import { checkAdmin } from '@/helper/server/utils';

export async function POST(req: NextRequest) {
  const { weddingId, sex, image } = (await req.json()) as AddSignPayload;

  try {
    await checkAdmin();

    const sign = await db.wedding.update({
      where: { id: weddingId },
      data:
        sex === 'husband'
          ? {
              husbandImage: image,
              updatedAt: new Date(),
            }
          : {
              brideImage: image,
              updatedAt: new Date(),
            },
    });

    return NextResponse.json(sign);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
