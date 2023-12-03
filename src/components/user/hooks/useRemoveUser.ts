import { useState } from 'react';

interface Props {
  onRemoveUser: () => void;
}

export function useRemoveUser({ onRemoveUser }: Props) {
  const [viewModal, setViewModal] = useState(false);

  const onModalClick = () => {
    setViewModal(true);
  };

  const onModalConfirm = () => {
    onRemoveUser();
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
