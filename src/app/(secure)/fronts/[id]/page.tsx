'use client';

import { readBillAPI } from '@/helper/client/apis';
import { useQuery } from '@tanstack/react-query';

export default function ReadFrontPage({ params }: { params: { id: string } }) {
  const { data } = useQuery({
    queryKey: ['front'],
    queryFn: () => readBillAPI(params.id),
    enabled: !!params.id,
  });

  console.log(data);

  return <div>ReadFrontPage</div>;
}
