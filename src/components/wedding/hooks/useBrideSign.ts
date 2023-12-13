import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

import { addSignAPI, signUploadAPI } from '@/helper/client/apis';
import { dataURItoBlob } from '@/helper/client/utils';
import { brideState, imageState } from '@/helper/store';

interface Props {
  id: string;
  refetch: () => void;
}

export function useBrideSign({ id, refetch }: Props) {
  const queryClient = useQueryClient();

  // Atoms
  const [currentImage, setCurrentImage] = useAtom(imageState);
  const [brideView, setBrideView] = useAtom(brideState);

  // Mutations
  const addSignMutate = useMutation({ mutationFn: addSignAPI });

  const onUploadBrideSign = async () => {
    if (currentImage) {
      const file = new File([dataURItoBlob(currentImage)], 'upload');
      const data = new FormData();

      data.set('file', file);

      const response = await signUploadAPI(data);

      if (response.target) {
        await addSignMutate.mutateAsync(
          {
            weddingId: id,
            sex: 'bride',
            image: response.target,
          },
          {
            onSuccess: () => {
              setCurrentImage('');
              setBrideView(false);
              queryClient.invalidateQueries({ queryKey: ['wedding', id] });
              refetch();
            },
            onError: (err: any) => {
              toast.error(err);
            },
          },
        );
      } else {
        return;
      }
    } else {
      return;
    }
  };

  return {
    brideView,
    onUploadBrideSign,
    onCancelBrideSign: () => setBrideView(false),
  };
}
