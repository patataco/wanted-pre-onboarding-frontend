import { useContext } from 'react';
import { TodosContext } from 'src/context/TodosProvider';

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error('Cannot find TodosProvider');
  }
  return context;
};
