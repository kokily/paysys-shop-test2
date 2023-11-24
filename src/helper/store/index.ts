import { atom } from 'jotai';

// Auth State
export const authState = atom<AuthPayload>({
  username: '',
  password: '',
});
