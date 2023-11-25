import type { SyntheticEvent } from 'react';

import { Button } from '@/components/common/Button';

interface Props {
  onAddCart: (e: SyntheticEvent) => void;
  onBack: () => void;
}

export function CartButtons({ onAddCart, onBack }: Props) {
  return (
    <div className="mt-2 ml-auto mr-auto">
      <Button color="submit" add onClick={onAddCart}>
        전송하기
      </Button>
      <Button color="cancel" onClick={onBack}>
        뒤로가기
      </Button>
    </div>
  );
}
