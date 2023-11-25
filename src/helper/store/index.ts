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
