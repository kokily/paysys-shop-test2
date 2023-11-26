import clsx from 'clsx';

import { Button } from './Button';

interface Props {
  visible: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function Modal(props: Props) {
  if (!props.visible) return null;

  return (
    <div
      className={clsx(
        'z-5000 fixed top-0 left-0 w-full h-full',
        'bg-black bg-opacity-20',
        'flex items-center justify-center',
      )}
    >
      <div className="w-80 bg-white p-6 rounded-xm shadow-custom animate-slideUpFromBottom">
        <h2 className="text-1xl font-bold mt-0 mb-4">{props.title}</h2>
        <p className="mb-8">{props.content}</p>

        <div className="flex justify-end">
          <Button color="cancel" add onClick={props.onCancel}>
            취 소
          </Button>
          <Button color="submit" onClick={props.onConfirm}>
            확 인
          </Button>
        </div>
      </div>
    </div>
  );
}
