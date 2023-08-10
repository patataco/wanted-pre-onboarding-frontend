import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import GuestGuard from '../guards/guest-guard';

const SigninPage = lazy(() => import('../pages/Signin'));
const SignupPage = lazy(() => import('../pages/Signup'));

export const authRoutes = [
  {
    path: '/',
    element: (
      <GuestGuard>
        <Outlet />
      </GuestGuard>
    ),
    children: [
      { path: '/signin', element: <SigninPage /> },
      { path: '/signup', element: <SignupPage /> },
    ],
  },
];
