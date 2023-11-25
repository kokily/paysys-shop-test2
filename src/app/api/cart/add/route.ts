import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';

export async function POST(req: NextRequest) {
  const { itemId, userId, count, price } = (await req.json()) as AddCartPayload;

  try {
    const item = await db.item.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      return NextResponse.json(
        { error: '해당 품목이 없습니다.' },
        { status: 404 },
      );
    }

    // Cart in current user
    const prevCart = await db.cart.findFirst({
      where: {
        userId: userId,
        completed: false,
        deleted: false,
      },
    });

    // 추가할 품목 모델
    const addItemModel: AddItemModel = {
      id: item.id,
      name: item.name,
      divide: item.divide,
      native: item.native,
      unit: item.unit,
      price,
      count,
      amount: count * price,
    };

    // Cart 분기점
    if (!prevCart) {
      // 기존 카트 없을 시 카트 생성
      const cart = await db.cart.create({
        data: { items: [addItemModel as any], userId: userId },
      });

      return NextResponse.json(cart);
    } else {
      // 기존 카트 있을 시 품목만 추가
      const updateCartItems = [...prevCart.items, addItemModel];
      const cart = await db.cart.update({
        where: { id: prevCart.id },
        data: {
          ...prevCart,
          items: updateCartItems as any,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(cart);
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
