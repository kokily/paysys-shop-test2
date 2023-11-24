import type { Item } from '@prisma/client';
import axios from 'axios';
import qs from 'qs';

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://paysys.kr/api'
      : 'http://localhost:3000/api',
  withCredentials: true,
});

// Menu API
export async function listMenuAPI(queries: ListMenuQueries) {
  const queryString = qs.stringify(queries);
  const response = await client.get<Array<Item>>(`/menu?${queryString}`);
  return response.data;
}

export async function readMenuAPI(id: string) {
  const response = await client.get<Item>(`/menu/${id}`);
  return response.data;
}
