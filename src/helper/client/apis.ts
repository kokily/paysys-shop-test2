import { Bill, Cart, type Item } from '@prisma/client';
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
  const response = await client.patch<Cart | { message: string }>(
    `/cart/update/${itemId}`,
  );
  return response.data;
}

// Bills API
export async function listBillsAPI(queries: ListBillsQueries) {
  const queryString = qs.stringify(queries);
  const response = await client.get<Array<Bill>>(`/bills?${queryString}`);
  return response.data;
}

export async function readBillAPI(id: string) {
  const response = await client.get<Bill>(`/bills/${id}`);
  return response.data;
}

export async function addBillAPI(payload: AddBillPayload) {
  const response = await client.post<Bill>('/bills/add', payload);
  return response.data;
}

export async function removeBillAPI(id: string) {
  const response = await client.delete(`/bills/remove/${id}`);
  return response.data;
}

export async function restoreBillAPI(id: string) {
  const response = await client.patch<Cart>(`/bills/restore/${id}`);
  return response.data;
}

// Reserve API
export async function addReserveAPI(payload: AddReservePayload) {
  const response = await client.post<Bill>('/reserve/add', payload);
  return response.data;
}

export async function removeReserveAPI(id: string) {
  const response = await client.delete(`/reserve/remove/${id}`);
  return response.data;
}
