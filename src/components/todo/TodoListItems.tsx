import { HTMLAttributes } from 'react';
import { Task } from 'src/type/type';
import TodoItem from './TodoItemContainer';

type TaskListProps = HTMLAttributes<HTMLUListElement> & { todoItems: Task[] };

const TodoListItems = ({ todoItems, ...props }: TaskListProps) => {
  return (
    <ul className="flex w-full flex-col gap-4 px-4" {...props}>
      {todoItems.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </ul>
  );
};
export default TodoListItems;
