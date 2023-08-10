import { useTodos } from 'src/hooks/useTodos';
import TodoInput from '../components/todo/TodoInput';
import TodoListContainer from '../components/todo/TodoListContainer';

const TodoView = () => {
  const { todos } = useTodos();
  if (!todos) return null;

  return (
    <div className="mx-auto flex h-screen w-[560px] ">
      <div className="mt-20 flex h-[800px] w-full flex-col items-center gap-6 overflow-y-auto border p-4">
        <h1 className="text-2xl">TodoList</h1>
        <TodoInput />
        <TodoListContainer todoItems={todos} />
      </div>
    </div>
  );
};

export default TodoView;
