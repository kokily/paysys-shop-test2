import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import 'react-toastify/ReactToastify.css';

import ToastWrapper from '@/wrapper/ToastWrapper';
import SessionWrapper from '@/wrapper/SessionWrapper';
import QueryWrapper from '@/wrapper/QueryWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '행사전표시스템 v6.0 - Integrated Version',
  icons: {
    icon: '/favicon.png',
    apple: '/logo192.png',
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <head>
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>

      <body className={inter.className}>
        <SessionWrapper>
          <QueryWrapper>
            {children}
            <ToastWrapper />
          </QueryWrapper>
        </SessionWrapper>
      </body>
    </html>
  );
}
