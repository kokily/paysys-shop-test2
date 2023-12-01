import { ReadFront } from '@/components/front/ReadFront';

export default function ReadFrontPage({ params }: { params: { id: string } }) {
  return <ReadFront id={params.id} />;
}
