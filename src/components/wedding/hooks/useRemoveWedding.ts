import { useState } from 'react';

interface Props {
  onRemoveWedding: () => void;
}

export function useRemoveWedding({ onRemoveWedding }: Props) {
  const [viewModal, setViewModal] = useState(false);

  const onModalClick = () => {
    setViewModal(true);
  };

  const onModalConfirm = () => {
    onRemoveWedding();
    setViewModal(false);
  };

  const onModalCancel = () => {
    setViewModal(false);
  };

  return {
    viewModal,
    onModalClick,
    onModalConfirm,
    onModalCancel,
  };
}
