import type { Bill, Cart, Wedding, Item } from '@prisma/client';
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

// Users API
export async function changePasswordAPI(payload: PasswordPayload) {
  const response = await client.post<SerializeUser>('/password', payload);
  return response.data;
}

export async function listUsersAPI(queries: ListUsersQueries) {
  const queryString = qs.stringify(queries);
  const response = await client.get<Array<SerializeUser>>(
    `/users?${queryString}`,
  );
  return response.data;
}

export async function readUserAPI(id: string) {
  const response = await client.get<SerializeUser>(`/users/${id}`);
  return response.data;
}

export async function removeUserAPI(id: string) {
  const response = await client.delete(`/users/remove/${id}`);
  return response.data;
}

export async function setAdminAPI(id: string) {
  const response = await client.patch<SerializeUser>(`/users/admin/${id}`);
  return response.data;
}

export async function setEmployeeAPI(id: string) {
  const response = await client.patch<SerializeUser>(`/users/employee/${id}`);
  return response.data;
}

// Items API
export async function listItemsAPI(queries: ListItemsQueries) {
  const queryString = qs.stringify(queries);
  const response = await client.get<Array<Item>>(`/items?${queryString}`);
  return response.data;
}

export async function readItemAPI(id: string) {
  const response = await client.get<Item>(`/items/${id}`);
  return response.data;
}

export async function addItemAPI(payload: AddItemPayload) {
  const response = await client.post<Item>('/items/add', payload);
  return response.data;
}

export async function removeItemAPI(id: string) {
  const response = await client.delete(`/items/remove/${id}`);
  return response.data;
}

export async function updateItemAPI({
  id,
  payload,
}: {
  id: string;
  payload: AddItemPayload;
}) {
  const response = await client.patch<Item>(`/items/update/${id}`, payload);
  return response.data;
}

// Weddings API
export async function listWeddingsAPI(queries: ListWeddingsQueries) {
  const queryString = qs.stringify(queries);
  const response = await client.get<Array<Wedding>>(`/weddings?${queryString}`);
  return response.data;
}

export async function readWeddingAPI(id: string) {
  const response = await client.get<Wedding>(`/weddings/${id}`);
  return response.data;
}

export async function removeWeddingAPI(id: string) {
  const response = await client.delete(`/weddings/remove/${id}`);
  return response.data;
}

// Expense API
export async function addExpenseAPI(payload: AddExpensePayload) {
  const response = await client.post<Wedding>(`/expense`, payload);
  return response.data;
}

export async function updateExpenseAPI({
  id,
  payload,
}: {
  id: string;
  payload: AddExpensePayload;
}) {
  const response = await client.patch<Wedding>(
    `/expense/update/${id}`,
    payload,
  );
  return response.data;
}

// Sign API
export async function signUploadAPI(data: FormData) {
  const response = await client.post<S3ReturnType>('/sign/upload', data);
  return response.data;
}

export async function addSignAPI(payload: AddSignPayload) {
  const response = await client.post<Wedding>(`/sign/add`, payload);
  return response.data;
}

export async function removeSignAPI(id: string) {
  const response = await client.delete(`/sign/remove/${id}`);
  return response.data;
}
