import type { PropsWithChildren } from 'react';

import SessionWrapper from '@/wrapper/SessionWrapper';
import { PageTemplate } from '@/components/common/PageTemplate';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <body>
        <SessionWrapper>
          <PageTemplate>{children}</PageTemplate>
        </SessionWrapper>
      </body>
    </html>
  );
}
