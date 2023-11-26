import { useAtom } from 'jotai';

import { cartState } from '@/helper/store';
import { Input } from '../common/Input';

export function CartInputs() {
  const [state, dispatch] = useAtom(cartState);
  const { title, hall, etc } = state;

  return (
    <div className="bg-white">
      <Input
        type="title"
        name="title"
        value={title}
        onChange={(e) => dispatch({ ...state, title: e.target.value })}
        label="행사명 *"
      />
      <Input
        type="hall"
        name="hall"
        value={hall}
        onChange={(e) => dispatch({ ...state, hall: e.target.value })}
        label="행사홀 *"
      />
      <Input
        type="etc"
        name="etc"
        value={etc}
        onChange={(e) => dispatch({ ...state, etc: e.target.value })}
        label="기타사항"
      />
    </div>
  );
}
