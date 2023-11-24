import type { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
