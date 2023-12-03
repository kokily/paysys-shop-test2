import type { SyntheticEvent } from 'react';
import { Button } from '../common/Button';

interface Props {
  onBack: () => void;
  onChangePassword: (e: SyntheticEvent) => void;
}

export function PasswordButtons({ onBack, onChangePassword }: Props) {
  return (
    <div className="mt-2 mb-4 mx-auto text-center">
      <Button color="cancel" add onClick={onBack}>
        취 소
      </Button>
      <Button color="submit" onClick={onChangePassword}>
        확 인
      </Button>
    </div>
  );
}
