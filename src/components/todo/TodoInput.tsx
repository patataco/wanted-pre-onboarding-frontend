import { KeyboardEvent, useState } from 'react';

import { useTodoInput } from 'src/hooks/useTodoInput';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import { useTodos } from 'src/hooks/useTodos';

const TodoInput = () => {
  const { inputValue, setInputValue, handleInput } = useTodoInput('');
  const { addTodo, fetchTodos } = useTodos();

  const [isPending, setIsPending] = useState(false);

  const createTodoItem = async () => {
    try {
      setIsPending(true);
      await addTodo({ todo: inputValue });
      await fetchTodos();
    } catch (e) {
      console.log(e);
    } finally {
      setIsPending(false);
    }
    setInputValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      if (inputValue.length < 1) {
        e.preventDefault();
      } else {
        if (isPending) {
          return;
        }
        createTodoItem();
      }
    }
  };

  const handleAddButtonClick = () => {
    createTodoItem();
  };

  return (
    <div className="flex w-full items-center justify-center gap-3 px-6">
      <Input
        className="flex-1 border border-blue-300 p-3 "
        data-testid="new-todo-input"
        placeholder="todo"
        value={inputValue}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
      />
      <Button
        data-testid="new-todo-add-button"
        disabled={inputValue.length < 1 || isPending}
        onClick={handleAddButtonClick}
      >
        추가
      </Button>
    </div>
  );
};

export default TodoInput;
