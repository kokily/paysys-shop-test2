import { useState } from 'react';

interface Props {
  onRemoveAllCart: () => void;
}

export function useRemoveCart({ onRemoveAllCart }: Props) {
  const [viewModal, setViewModal] = useState(false);

  const onModalClick = () => {
    setViewModal(true);
  };

  const onModalConfirm = () => {
    onRemoveAllCart();
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
