import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'src/hooks/useRouter';
import { useAuthContext } from 'src/hooks/useAuthContext';

const AuthGuard = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { authenticated, loading } = useAuthContext();
  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const loginPath = '/signin';

      const href = `${loginPath}?${searchParams}`;

      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [authenticated, router]);

  useEffect(() => {
    check();
  }, []);

  if (loading) {
    return null;
  }

  if (!checked) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
