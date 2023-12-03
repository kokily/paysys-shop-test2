import { Button } from '../common/Button';

interface Props {
  isAdmin: boolean;
  onBack: () => void;
  onSetIdentify: (select: IdentifyType) => void;
  onModalClick: () => void;
}

export function UserButtons({
  isAdmin,
  onBack,
  onSetIdentify,
  onModalClick,
}: Props) {
  return (
    <div className="flex justify-center mb-4">
      <div className="xs:flex-row xs:w-full">
        <Button color="cancel" smallSize add onClick={onBack}>
          뒤로
        </Button>
        <Button color="submit" smallSize add onClick={onModalClick}>
          삭제
        </Button>
        <Button
          color="edit"
          smallSize
          onClick={() => onSetIdentify(isAdmin ? 'employee' : 'admin')}
        >
          {isAdmin ? '강등' : '승급'}
        </Button>
      </div>
    </div>
  );
}
