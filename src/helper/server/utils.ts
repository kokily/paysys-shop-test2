import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';

import db from './database';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Query String
export function getQuery(req: NextRequest, queryName: string) {
  const url = new URL(req.nextUrl);

  return url.searchParams.get(queryName) ?? '';
}

// Get User
export async function getSessionUser() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.username) {
    throw new Error('사용자 사용자 로그인 후 사용하세요');
  }

  const user = await db.user.findUnique({
    where: { username: session.user.username },
  });

  if (!user) {
    throw new Error('등록된 사용자가 아닙니다.');
  }

  return {
    id: user.id,
    username: user.username,
    admin: user.admin,
  };
}

// Admin Check
export async function checkAdmin() {
  const user = await getSessionUser();

  if (user && !user.admin) {
    throw new Error('사용 권한이 없습니다.');
  }

  return true;
}
