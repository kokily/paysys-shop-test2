import { useState } from 'react';

interface Props {
  onRemoveBill: () => void;
}

export function useRemoveBill({ onRemoveBill }: Props) {
  const [viewModal, setViewModal] = useState(false);

  const onModalClick = () => {
    setViewModal(true);
  };

  const onModalConfirm = () => {
    onRemoveBill();
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
