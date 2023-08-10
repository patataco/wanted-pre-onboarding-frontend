import AuthGuard from 'src/guards/auth-guard';
import TodoView from 'src/pages/Todo';
import { TodosProvider } from '../context/TodosProvider';

export const todoRoutes = [
  {
    path: '/todo',
    element: (
      <AuthGuard>
        <TodosProvider>
          <TodoView />
        </TodosProvider>
      </AuthGuard>
    ),
  },
];
