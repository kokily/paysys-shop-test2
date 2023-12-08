import { useAtom } from 'jotai';

import { expenseState } from '@/helper/store';
import { OneInput } from './common/OneInput';

export function ContentsName() {
  const [state, dispatch] = useAtom(expenseState);
  const { husbandName, brideName } = state;

  return (
    <div className="flex flex-col items-center my-4">
      <strong className="mb-2">
        <OneInput
          title="신랑 성명"
          name="husbandName"
          value={husbandName}
          onChange={(e) => dispatch({ ...state, husbandName: e.target.value })}
          husband={true}
        />
      </strong>
      <strong>
        <OneInput
          title="신부 성명"
          name="brideName"
          value={brideName}
          onChange={(e) => dispatch({ ...state, brideName: e.target.value })}
          bride={true}
        />
      </strong>
    </div>
  );
}
