'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { listMenuAPI } from '@/helper/client/apis';
import { Button } from '@/components/common/Button';
import { MenuItem } from './MenuItem';

export function ListMenu() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const divide = searchParams.get('divide') as string;
  const native = searchParams.get('native') as string;

  // Data Fetching
  const { data: menu } = useQuery({
    queryKey: ['ListMenu'],
    queryFn: () => listMenuAPI({ divide, native }),
    enabled: !!divide && !!native,
    staleTime: 0,
  });

  const onBack = () => {
    queryClient.invalidateQueries();
    router.back();
  };

  const onReadMenu = (id: string) => {
    queryClient.invalidateQueries();
    router.push(`/menu/${id}`);
  };

  return (
    <div className="mb-6">
      {menu && (
        <>
          <div className="flex flex-col items-center mb-8">
            <p className="text-1xl font-semibold mb-4">
              {menu[0] && menu[0].divide}
            </p>
            <Button color="cancel" onClick={onBack}>
              뒤 로
            </Button>
          </div>

          <div className="grid gap-4 m-1 grid-cols-repeat-8">
            {menu.map((item) => (
              <MenuItem key={item.id} item={item} onReadMenu={onReadMenu} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
