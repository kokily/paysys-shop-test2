import { NextRequest, NextResponse } from 'next/server';

import { maskingName } from '@/helper/client/utils';
import { checkAdmin } from '@/helper/server/utils';
import db from '@/helper/server/database';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as AddExpensePayload;

  try {
    await checkAdmin();

    const updateBody: AddExpensePayload = {
      ...body,
      husbandName: maskingName(body.husbandName),
      brideName: maskingName(body.brideName),
      weddingAt: body.weddingAt.toString(),
    };

    const expense = await db.wedding.create({
      data: updateBody,
    });

    return NextResponse.json(expense);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
