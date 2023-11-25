import type { KeyboardEvent, SyntheticEvent } from 'react';
import { useAtom } from 'jotai';

import { authState } from '@/helper/store';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

interface Props {
  onLogin: (e: SyntheticEvent) => void;
}

export function LoginForm({ onLogin }: Props) {
  const [state, dispatch] = useAtom(authState);
  const { username, password } = state;

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onLogin(e);
    }
  };

  return (
    <div className="h-auto bg-white p-8">
      <Input
        type="text"
        name="username"
        value={username}
        onChange={(e) => dispatch({ ...state, username: e.target.value })}
        label="아이디"
      />
      <Input
        type="password"
        name="password"
        value={password}
        onChange={(e) => dispatch({ ...state, password: e.target.value })}
        label="비밀번호"
        onKeyDown={onKeyDown}
      />

      <Button color="submit" fullSize onClick={onLogin}>
        로그인
      </Button>
    </div>
  );
}
