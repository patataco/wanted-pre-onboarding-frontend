import { Navigate, useRoutes } from 'react-router-dom';
import { paths } from './paths';
import { authRoutes } from './auth';
import { todoRoutes } from './todo';

const Router = () =>
  useRoutes([
    { path: '/', element: <Navigate to={paths.todoList.todo} replace /> },
    ...authRoutes,
    ...todoRoutes,
  ]);

export default Router;
