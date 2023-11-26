import { atom } from 'jotai';

// Auth State
export const authState = atom<AuthPayload>({
  username: '',
  password: '',
});

// Header State
export const headerState = atom<boolean>(false);

// Menu State
export const menuState = atom<ReadMenuPayload>({
  count: '',
  price: '',
});

// Cart State
export const initialCart = {
  title: '',
  hall: '',
  etc: '',
  totalAmount: 0,
};

export const cartState = atom<ViewCartPayload>(initialCart);

// Front State
export const initialFronts = {
  title: '',
  hall: '',
  userId: '',
};

export const frontsState = atom<ListBillsState>(initialFronts);
