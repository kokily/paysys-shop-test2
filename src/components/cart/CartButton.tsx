import type { SyntheticEvent } from 'react';
import { Button } from '../common/Button';

interface Props {
  onAddBill: (e: SyntheticEvent) => void;
  onRemoveModal: () => void;
}

export function CartButton({ onAddBill, onRemoveModal }: Props) {
  return (
    <>
      <Button className="float-right ml-2" color="submit" onClick={onAddBill}>
        전표전송
      </Button>
      <Button
        className="float-right ml-2"
        color="cancel"
        onClick={onRemoveModal}
      >
        전체삭제
      </Button>
    </>
  );
}
