import React from 'react';
import { AuthProvider } from './context/authProvider';
import Router from './routes';

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
