import type { Bill } from '@prisma/client';

import { Button } from '../common/Button';

interface Props {
  front: Bill;
  onBack: () => void;
  onRestoreBill: () => void;
  onAddReservePage: () => void;
  onRemoveReserve: () => void;
  onModalClick: () => void;
  userId: string;
  isAdmin: boolean;
}

export function FrontButtons(props: Props) {
  return (
    <div className="flex justify-center w-full mt-4 print:hidden">
      <div className="flex justify-center w-full">
        {props.userId &&
          props.front &&
          (props.isAdmin || props.front.userId === props.userId) && (
            <>
              <Button color="cancel" add onClick={props.onModalClick}>
                삭 제
              </Button>
              <Button color="edit" add onClick={props.onRestoreBill}>
                수 정
              </Button>
            </>
          )}

        <Button color="menu" add onClick={props.onBack}>
          목 록
        </Button>

        {props.userId && props.front && props.isAdmin && (
          <>
            {!props.front.reserve || props.front.reserve === 0 ? (
              <Button color="submit" onClick={props.onAddReservePage}>
                +예약금
              </Button>
            ) : (
              <Button color="submit" onClick={props.onRemoveReserve}>
                예약금 삭제
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
