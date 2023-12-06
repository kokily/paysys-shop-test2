import { NextRequest, NextResponse } from 'next/server';

import { checkAdmin } from '@/helper/server/utils';
import { maskingName } from '@/helper/client/utils';
import db from '@/helper/server/database';

export async function PATCH(req: NextRequest, { params: { id } }: any) {
  const body = (await req.json()) as AddExpensePayload;

  try {
    await checkAdmin();

    const updateBody: AddExpensePayload = {
      ...body,
      husbandName: maskingName(body.husbandName),
      brideName: maskingName(body.brideName),
      weddingAt: body.weddingAt.toString(),
    };

    const expense = await db.wedding.update({
      where: { id },
      data: {
        ...updateBody,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(expense);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
