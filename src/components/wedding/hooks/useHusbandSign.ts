import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

import { addSignAPI, signUploadAPI } from '@/helper/client/apis';
import { dataURItoBlob } from '@/helper/client/utils';
import { husbandState, imageState } from '@/helper/store';

interface Props {
  id: string;
  refetch: () => void;
}

export function useHusbandSign({ id, refetch }: Props) {
  const queryClient = useQueryClient();

  // Atoms
  const [currentImage, setCurrentImage] = useAtom(imageState);
  const [husbandView, setHusbandView] = useAtom(husbandState);

  // Mutations
  const addSignMutate = useMutation({ mutationFn: addSignAPI });

  const onUploadHusbandSign = async () => {
    if (currentImage) {
      const file = new File([dataURItoBlob(currentImage)], 'upload');
      const data = new FormData();

      data.set('file', file);

      const response = await signUploadAPI(data);

      if (response.target) {
        await addSignMutate.mutateAsync(
          {
            weddingId: id,
            sex: 'husband',
            image: response.target,
          },
          {
            onSuccess: () => {
              setCurrentImage('');
              setHusbandView(false);
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
    husbandView,
    onUploadHusbandSign,
    onCancelHusbandSign: () => setHusbandView(false),
  };
}
