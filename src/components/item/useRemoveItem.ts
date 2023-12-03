import { useState } from 'react';

interface Props {
  onRemoveItem: () => void;
}

export function useRemoveItem({ onRemoveItem }: Props) {
  const [viewModal, setViewModal] = useState(false);

  const onModalClick = () => {
    setViewModal(true);
  };

  const onModalConfirm = () => {
    onRemoveItem();
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
