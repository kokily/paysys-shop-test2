import type { User } from '@prisma/client';

export function unitOfAccount(target: number, unit?: string) {
  return `${target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${
    unit ?? ''
  }`;
}

export function unitOfDate(target: Date) {
  return new Date(target).toLocaleDateString();
}

export function unitOfTime(target: Date) {
  return new Date(target).toLocaleTimeString();
}

export function serializeUser(user: User) {
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
}

export function dataURItoBlob(uri: string) {
  // Base64 Decode
  const blob = window.atob(uri.split(',')[1]);
  let array: number[] = [];

  for (let i = 0; i < blob.length; i++) {
    array.push(blob.charCodeAt(i));
  }

  const file = new Blob([new Uint8Array(array)], {
    type: 'image/png',
  });

  return file;
}
