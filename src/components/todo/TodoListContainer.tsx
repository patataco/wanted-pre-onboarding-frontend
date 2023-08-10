import { Task } from 'src/type/type';
import TodoListItems from './TodoListItems';
import EmptyTodoList from './EmptyTodoList';

const TodoListContainer = ({ todoItems }: { todoItems: Task[] }) => {
  return <>{todoItems.length > 0 ? <TodoListItems todoItems={todoItems} /> : <EmptyTodoList />}</>;
};

export default TodoListContainer;
