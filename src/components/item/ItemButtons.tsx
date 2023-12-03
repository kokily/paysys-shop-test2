import { Button } from '../common/Button';

interface Props {
  onBack: () => void;
  onUpdateItemPage: () => void;
  onModalClick: () => void;
}

export function ItemButtons({ onBack, onUpdateItemPage, onModalClick }: Props) {
  return (
    <div className="contents my-4 xl:w-1200 px-60">
      <Button color="cancel" smallSize add onClick={onBack}>
        뒤 로
      </Button>
      <Button color="edit" smallSize add onClick={onUpdateItemPage}>
        수 정
      </Button>
      <Button color="menu" smallSize onClick={onModalClick}>
        삭 제
      </Button>
    </div>
  );
}
