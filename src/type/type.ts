export type AuthState = {
  loading: boolean;
  isAuthenticated: boolean;
  // user: User | null;
};

export type AuthContextType = {
  unauthenticated: boolean;
  authenticated: boolean;
  loading: boolean;
  status?: 'loading' | 'authenticated' | 'unauthenticated';
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
};

export type Task = {
  id: string;
  todo: string;
  isCompleted: boolean;
  userId: string;
};

export type UserAuthInput = {
  email: string;
  password: string;
};
