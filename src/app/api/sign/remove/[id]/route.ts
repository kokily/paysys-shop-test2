import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';
import { checkAdmin } from '@/helper/server/utils';

export async function DELETE(_: NextRequest, { params: { id } }: any) {
  try {
    await checkAdmin();
    await db.wedding.update({
      where: { id },
      data: {
        husbandImage: '',
        brideImage: '',
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ message: '서명 삭제' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
