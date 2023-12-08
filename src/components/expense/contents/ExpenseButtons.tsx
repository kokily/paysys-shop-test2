import type { SyntheticEvent } from 'react';

import { Button } from '@/components/common/Button';

interface Props {
  onBack: () => void;
  onAddExpense: (e: SyntheticEvent) => void;
}

export function ExpenseButtons({ onBack, onAddExpense }: Props) {
  return (
    <div className="flex justify-center mb-4">
      <Button color="cancel" add onClick={onBack}>
        취소하기
      </Button>
      <Button color="submit" onClick={onAddExpense}>
        저장하기
      </Button>
    </div>
  );
}
