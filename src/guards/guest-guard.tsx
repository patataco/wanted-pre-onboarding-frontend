import { PropsWithChildren, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { paths } from '../routes/paths';
import { useRouter } from '../hooks/useRouter';
import { useAuthContext } from 'src/hooks/useAuthContext';

const GuestGuard = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const [SearchParams] = useSearchParams();

  const returnTo = SearchParams.get('returnTo') || paths.todoList.todo;

  const { authenticated } = useAuthContext();

  const check = useCallback(() => {
    if (authenticated) {
      router.replace(returnTo);
    }
  }, [authenticated, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
};

export default GuestGuard;
