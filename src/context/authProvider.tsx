import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { AuthState, AuthContextType } from '../type/type';
import { signup, signin } from '../apis/auth';
import { isValidToken, setLocalStorage } from '../utils/utils';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

enum Types {
  INITIAL = 'INITIAL',
  SIGNIN = 'SIGNIN',
  SIGNUP = 'SIGNUP',
}

type ActionsType =
  | {
      type: Types.INITIAL;
      payload: {
        isAuthenticated: boolean;
      };
    }
  | {
      type: Types.SIGNIN;
      payload: {
        isAuthenticated: boolean;
      };
    }
  | {
      type: Types.SIGNUP;
      payload: {
        isAuthenticated: boolean;
      };
    };

const initialState: AuthState = {
  isAuthenticated: false,
  loading: true,
};

const reducer = (state: AuthState, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return { loading: false, isAuthenticated: action.payload.isAuthenticated };
  }
  if (action.type === Types.SIGNIN) {
    return {
      ...state,
      isAuthenticated: action.payload.isAuthenticated,
    };
  }
  if (action.type === Types.SIGNUP) {
    return {
      ...state,
      isAuthenticated: action.payload.isAuthenticated,
    };
  }
  return state;
};

const STORAGE_KEY = 'access_token';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isInitialized, setInitialized] = useState(false);

  const initialize = useCallback(() => {
    const accessToken = localStorage.getItem(STORAGE_KEY);
    if (accessToken && isValidToken(accessToken)) {
      setLocalStorage(accessToken);

      dispatch({
        type: Types.INITIAL,
        payload: { isAuthenticated: true },
      });
    } else {
      dispatch({
        type: Types.INITIAL,
        payload: { isAuthenticated: false },
      });
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = useCallback(async (email: string, password: string) => {
    const data = { email, password };
    const response = await signin(data);
    const { access_token } = response.data;
    if (access_token) {
      setLocalStorage(access_token);
      dispatch({
        type: Types.SIGNIN,
        payload: {
          isAuthenticated: true,
        },
      });
    }
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    const data = {
      email,
      password,
    };
    const status = await signup(data);
    if (status >= 200 && status < 300) {
      dispatch({
        type: Types.SIGNUP,
        payload: {
          isAuthenticated: false,
        },
      });
    }
  }, []);

  const checkAuthenticated = state.isAuthenticated ? 'authenticated' : 'unauthenticated';
  const status: AuthContextType['status'] = state.loading ? 'loading' : checkAuthenticated;

  if (!isInitialized) {
    return null;
  }
  1;

  return (
    <AuthContext.Provider
      value={{
        authenticated: state.isAuthenticated,
        unauthenticated: !state.isAuthenticated,
        loading: status === 'loading',
        status,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
