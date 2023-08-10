import { Task } from 'src/type/type';
import Checkbox from '../Checkbox';
import Button from '../Button';
import { useTodoInput } from 'src/hooks/useTodoInput';
import { Dispatch, SetStateAction } from 'react';
import { useTodos } from 'src/hooks/useTodos';

type TodoItemProps = {
  item: Task;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

const TodoItem = (todoItemProps: TodoItemProps) => {
  const { deleteTodoItem, fetchTodos, toggleTodoStatus } = useTodos();
  const { item, setIsEditing } = todoItemProps;
  const { inputValue } = useTodoInput(item.todo);

  const handleCheck = async () => {
    try {
      await toggleTodoStatus(item);
    } catch (e) {
      console.error(e);
      alert('error occurred. please try again.');
    }
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleDeleteButtonClick = async () => {
    try {
      await deleteTodoItem(item.id);
      await fetchTodos();
    } catch (e) {
      console.error(e);
      alert('error occurred. please try again.');
    }
  };

  return (
    <>
      <label htmlFor={item.id} className="flex flex-1 items-center gap-2 hover:cursor-pointer">
        <Checkbox id={item.id} checked={item.isCompleted} onChange={handleCheck} />
        <div className="flex h-9 flex-1 items-center text-justify">
          <span
            role="button"
            className="max-w-[320px] break-words pl-4 text-lg leading-8"
            onClick={handleCheck}
          >
            {inputValue}
          </span>
        </div>
      </label>
      <div className="flex w-[112px] gap-2">
        <Button
          data-testid="modify-button"
          className="flex-1 active:bg-blue-300"
          onClick={handleEditButtonClick}
        >
          수정
        </Button>
        <Button
          data-testid="delete-button"
          className="flex-1  active:bg-blue-300"
          onClick={handleDeleteButtonClick}
        >
          삭제
        </Button>
      </div>
    </>
  );
};

export default TodoItem;
