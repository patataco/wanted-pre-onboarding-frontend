import { Task } from 'src/type/type';
import Input from '../Input';
import Button from '../Button';
import { ChangeEvent, useState, KeyboardEvent, Dispatch, SetStateAction } from 'react';
import { useTodoInput } from 'src/hooks/useTodoInput';
import { useTodos } from 'src/hooks/useTodos';

type EditTodoItemProps = {
  item: Task;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

const EditTodoItem = (editTodoItemProps: EditTodoItemProps) => {
  const { item, setIsEditing } = editTodoItemProps;
  const { updateTodoItem, fetchTodos } = useTodos();
  const { inputValue, setInputValue } = useTodoInput(item.todo);
  const [draftValue, setDraftValue] = useState<Task['todo']>(item.todo);

  const handleDraftValue = (e: ChangeEvent<HTMLInputElement>) => {
    setDraftValue(e.target.value);
  };

  const saveEdit = () => {
    setIsEditing(false);
  };

  const editTodo = async (value: Task['todo']) => {
    const updatedTodo = { ...item, todo: value };
    const { userId: _, ...rest } = updatedTodo;

    try {
      await updateTodoItem(rest);
      await fetchTodos();
      setInputValue(value);
      saveEdit();
    } catch (e) {
      console.log(e);
    }
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      editTodo(draftValue);
      return;
    }
    if (e.key === 'Escape' && !e.nativeEvent.isComposing) {
      setDraftValue(inputValue);
      saveEdit();
    }
  };

  const handleSubmitButtonClick = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    editTodo(draftValue);
  };

  const handleCancelButtonClick = () => {
    setDraftValue(inputValue);
    saveEdit();
  };
  return (
    <form onSubmit={handleSubmitButtonClick} className="flex w-full items-center gap-4">
      <label htmlFor={item.id} className="flex flex-1 items-center gap-2 hover:cursor-pointer">
        <Input
          data-testid="modify-input"
          className="flex-1 pl-4 text-lg"
          value={draftValue}
          onChange={handleDraftValue}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </label>
      <div className="flex w-[112px] gap-2">
        <Button type="submit" data-testid="submit-button" className="flex-1  active:bg-blue-300">
          제출
        </Button>
        <Button
          type="button"
          data-testid="cancel-button"
          className="flex-1 active:bg-blue-300 "
          onClick={handleCancelButtonClick}
        >
          취소
        </Button>
      </div>
    </form>
  );
};

export default EditTodoItem;
