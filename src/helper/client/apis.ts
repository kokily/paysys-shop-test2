import { Cart, type Item } from '@prisma/client';
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

// Cart API
export async function viewCartAPI() {
  const response = await client.get<Cart>('/cart');
  return response.data;
}

export async function addCartAPI(payload: AddCartPayload) {
  const response = await client.post<Cart>('/cart/add', payload);
  return response.data;
}

export async function removeCartAPI() {
  const response = await client.delete('/cart/remove');
  return response.data;
}

export async function removeOneCartAPI(itemId: string) {
  const response = await client.patch<Cart>(`/cart/update/${itemId}`);
  return response.data;
}
