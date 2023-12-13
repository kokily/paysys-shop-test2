import type { Wedding } from '@prisma/client';
import { useSetAtom } from 'jotai';

import { useBrideSign } from '../hooks/useBrideSign';
import { useHusbandSign } from '../hooks/useHusbandSign';
import { brideState, husbandState } from '@/helper/store';
import { AddSignModal } from './AddSignModal';
import { SignPane } from './SignPane';

interface Props {
  id: string;
  wedding: Wedding;
  onRemoveSign: () => void;
  refetch: () => void;
}

export function WeddingTitle(props: Props) {
  const { id, wedding, onRemoveSign } = props;

  const setVisibleHusbandSign = useSetAtom(husbandState);
  const setVisibleBrideSign = useSetAtom(brideState);

  const { husbandView, onUploadHusbandSign, onCancelHusbandSign } =
    useHusbandSign({ id, refetch: props.refetch });
  const { brideView, onUploadBrideSign, onCancelBrideSign } = useBrideSign({
    id,
    refetch: props.refetch,
  });

  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-1xl font-bold text-purple-500 mb-8">
        웨딩 정산 내역
      </h2>

      <h3 className="text-lg font-bold mb-4">
        신랑님:{' '}
        <strong
          className="text-sky-500 transition-colors hover:text-sky-400 cursor-pointer"
          onClick={() => setVisibleHusbandSign(true)}
        >
          {wedding.husbandName}
        </strong>{' '}
        <strong className="text-pink-400">♡</strong> 신부님:{' '}
        <strong
          className="text-pink-500 transition-colors hover:text-pink-400 cursor-pointer"
          onClick={() => setVisibleBrideSign(true)}
        >
          {wedding.brideName}
        </strong>
      </h3>

      {(wedding.husbandImage || wedding.brideImage) && (
        <SignPane
          husbandImage={wedding.husbandImage}
          brideImage={wedding.brideImage}
          onRemoveSign={onRemoveSign}
        />
      )}

      <h4 className="text-base font-bold m-0 mb-4">
        웨딩 일시: {new Date(wedding.weddingAt).toLocaleDateString()},{' '}
        {wedding.eventAt}
      </h4>

      <AddSignModal
        visible={husbandView}
        title="신랑 서명"
        onCancel={onCancelHusbandSign}
        onConfirm={onUploadHusbandSign}
      />
      <AddSignModal
        visible={brideView}
        title="신부 서명"
        onCancel={onCancelBrideSign}
        onConfirm={onUploadBrideSign}
      />

      <hr className="w-11/12 my-4" />

      <h3 className="text-lg font-bold print:mb-[-25.78px]">웨딩 비용</h3>
    </div>
  );
}
