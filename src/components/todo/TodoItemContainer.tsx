import { useEffect, useRef, useState } from 'react';
import { Task } from 'src/type/type';
import TodoItem from './TodoItem';
import EditTodoItem from './EditTodoItem';

const TodoItemContainer = ({ item }: { item: Task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const todoItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onCheckClickOutside = (e: MouseEvent) => {
      if (isEditing && todoItemRef.current && !todoItemRef.current.contains(e.target as Node)) {
        setIsEditing(false);
      }
    };

    document.addEventListener('mousedown', onCheckClickOutside);
    return () => {
      document.removeEventListener('mousedown', onCheckClickOutside);
    };
  }, [setIsEditing, isEditing]);

  return (
    <li key={item.id} className="flex items-center w-full gap-4" ref={todoItemRef}>
      {isEditing ? (
        <EditTodoItem item={item} setIsEditing={setIsEditing} />
      ) : (
        <TodoItem item={item} setIsEditing={setIsEditing} />
      )}
    </li>
  );
};

export default TodoItemContainer;
