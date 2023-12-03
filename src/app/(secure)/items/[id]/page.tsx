import { ReadItem } from '@/components/item/ReadItem';

export default function ReadItemPage({ params }: { params: { id: string } }) {
  return <ReadItem id={params.id} />;
}
