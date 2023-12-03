import { ReadUser } from '@/components/user/ReadUser';

export default function ReadUserPage({ params }: { params: { id: string } }) {
  return <ReadUser id={params.id} />;
}
