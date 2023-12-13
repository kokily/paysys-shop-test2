import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

import { checkAdmin, s3UploadImage } from '@/helper/server/utils';

export async function POST(req: NextRequest) {
  try {
    await checkAdmin();

    const data = await req.formData();
    const file = data.get('file') as Blob | null;

    if (!file) {
      return NextResponse.json({ error: '업로드 된 파일이 없습니다.' });
    } else {
      const mimeType = file.type;
      const fileExtension = mimeType.split('/')[1];
      const buffer = Buffer.from(await file.arrayBuffer());

      const url = await s3UploadImage({
        file: buffer,
        fileName: `${uuid()}.${fileExtension}`,
        type: mimeType,
      });

      const target = url
        .split('?')[0]
        .replace('s3.ap-northeast-2.amazonaws.com/', '');

      return NextResponse.json({ target });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
