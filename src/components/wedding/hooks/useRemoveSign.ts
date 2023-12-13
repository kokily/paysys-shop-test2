import { useState } from 'react';

interface Props {
  onRemoveSign: () => void;
}

export function useRemoveSign({ onRemoveSign }: Props) {
  const [removeSign, setRemoveSign] = useState(false);

  const onModalClick = () => {
    setRemoveSign(true);
  };

  const onConfirm = () => {
    setRemoveSign(false);
    onRemoveSign();
  };

  const onCancel = () => {
    setRemoveSign(false);
  };

  return {
    removeSign,
    onModalClick,
    onConfirm,
    onCancel,
  };
}
