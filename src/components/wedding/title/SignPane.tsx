import Image from 'next/image';

import { useRemoveSign } from '../hooks/useRemoveSign';
import { Modal } from '@/components/common/Modal';

interface Props {
  husbandImage: string | null;
  brideImage: string | null;
  onRemoveSign: () => void;
}

export function SignPane({ husbandImage, brideImage, onRemoveSign }: Props) {
  const { removeSign, onModalClick, onConfirm, onCancel } = useRemoveSign({
    onRemoveSign,
  });

  return (
    <>
      <div className="flex justify-center mb-10" onClick={onModalClick}>
        <div className="w-40 h-14 cursor-pointer">
          <label>신랑님 서명</label>
          {husbandImage && (
            <Image
              className="w-full h-full"
              src={husbandImage}
              width={160}
              height={60}
              alt=""
            />
          )}
        </div>

        <div className="w-40 h-14 cursor-pointer">
          <label>신부님 서명</label>
          {brideImage && (
            <Image
              className="w-full h-full"
              src={brideImage}
              width={160}
              height={60}
              alt=""
            />
          )}
        </div>
      </div>

      <Modal
        visible={removeSign}
        title="서명 삭제"
        content="확인을 누르시면 삭제됩니다."
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
}

/*
.container {
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;
}

.sign_box {
  width: 160px;
  height: 60px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
}
*/
