import { ReadWedding } from '@/components/wedding/ReadWedding';

export default function ReadWeddingPage({
  params,
}: {
  params: { id: string };
}) {
  return <ReadWedding id={params.id} />;
}
