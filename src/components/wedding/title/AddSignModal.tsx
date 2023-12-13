import clsx from 'clsx';

import { Button } from '@/components/common/Button';
import SignCanvas from '@/components/common/SignCanvas';

interface Props {
  visible: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function AddSignModal(props: Props) {
  const { visible, title, onCancel, onConfirm } = props;

  if (!visible) return null;

  return (
    <div
      className={clsx(
        'fixed z-5000 top-0 left-0 w-screen h-screen',
        'flex items-center justify-center bg-slate-300',
      )}
    >
      <div className="bg-white p-6 rounded-md shadow-custom animate-slideUpFromBottom">
        <h2 className="text-1xl font-bold mt-0 mb-4">{title}</h2>

        <SignCanvas width={320} height={240} />

        <div className="flex justify-end">
          <Button color="cancel" add={true} onClick={onCancel}>
            취소
          </Button>
          <Button color="submit" onClick={onConfirm}>
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
