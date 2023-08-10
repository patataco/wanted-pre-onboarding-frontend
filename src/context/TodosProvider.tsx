import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { createTodo, deleteTodo, getTodos, updateTodo } from 'src/apis/todo';
import { Task } from 'src/type/type';

export interface TodosContextProps {
  todos: Task[];
  setTodos: Dispatch<SetStateAction<Task[]>>;
  addTodo: (item: Pick<Task, 'todo'>) => Promise<void>;
  updateTodoItem: (item: Omit<Task, 'userId'>) => Promise<void>;
  toggleTodoStatus: (todo: Task) => Promise<void>;
  deleteTodoItem: (id: string) => Promise<void>;
  fetchTodos: () => Promise<void>;
}

export const TodosContext = createContext({} as TodosContextProps);

export function TodosProvider({ children }: PropsWithChildren) {
  const [todos, setTodos] = useState<Task[]>([]);

  const fetchTodos = async () => {
    try {
      const { data } = await getTodos();
      if (data) {
        setTodos(data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = useCallback(async (item: Pick<Task, 'todo'>) => {
    await createTodo(item);
  }, []);

  const updateTodoItem = useCallback(async (item: Omit<Task, 'userId'>) => {
    await updateTodo(item);
  }, []);

  const toggleTodoStatus = async (todo: Task) => {
    if (!todos) throw new Error('todos is null');
    const selectedTodo = todos.find((todoItem) => todoItem.id === todo.id);
    if (selectedTodo) {
      const { userId: _, ...rest } = selectedTodo;
      const newStatus: Task['isCompleted'] = !selectedTodo.isCompleted;
      const changedItem = {
        ...rest,
        isCompleted: newStatus,
      };
      await updateTodoItem(changedItem);
      await fetchTodos();
    }
  };

  const deleteTodoItem = useCallback(async (id: string) => {
    await deleteTodo(id);
  }, []);

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        addTodo,
        updateTodoItem,
        deleteTodoItem,
        fetchTodos,
        toggleTodoStatus,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}
