import { Button } from '../common/Button';

interface Props {
  onBack: () => void;
  onUpdateExpensePage: () => void;
  onModalClick: () => void;
}

export function WeddingButtons(props: Props) {
  const { onBack, onUpdateExpensePage, onModalClick } = props;

  return (
    <div className="block mb-4 print:hidden">
      <Button color="menu" add={true} onClick={onBack}>
        목록
      </Button>
      <Button color="edit" add={true} onClick={onUpdateExpensePage}>
        수정
      </Button>
      <Button color="submit" onClick={onModalClick}>
        삭제
      </Button>
    </div>
  );
}
