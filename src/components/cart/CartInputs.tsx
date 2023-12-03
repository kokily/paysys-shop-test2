import { useAtom } from 'jotai';

import { cartState } from '@/helper/store';
import { Input } from '../common/Input';

export function CartInputs() {
  const [state, dispatch] = useAtom(cartState);
  const { title, hall, etc } = state;

  return (
    <div className="bg-white">
      <Input
        type="text"
        name="title"
        value={title}
        onChange={(e) => dispatch({ ...state, title: e.target.value })}
        label="행사명 *"
      />
      <Input
        type="text"
        name="hall"
        value={hall}
        onChange={(e) => dispatch({ ...state, hall: e.target.value })}
        label="행사홀 *"
      />
      <Input
        type="text"
        name="etc"
        value={etc}
        onChange={(e) => dispatch({ ...state, etc: e.target.value })}
        label="기타사항"
      />
    </div>
  );
}
