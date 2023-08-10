import { useContext } from 'react';
import { AuthContext } from 'src/context/authProvider';

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Cannot find AuthProvider');
  }
  return context;
};
