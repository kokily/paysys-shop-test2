import { AddItem } from '@/components/item/add/AddItem';

export default function UpdateItemPage({ params }: { params: { id: string } }) {
  return <AddItem id={params.id} />;
}
