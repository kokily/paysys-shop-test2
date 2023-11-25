import { ReadMenu } from '@/components/menu/read/ReadMenu';

export default function ReadMenuPage({ params }: { params: { id: string } }) {
  return <ReadMenu id={params.id} />;
}
