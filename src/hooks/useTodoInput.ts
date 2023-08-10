import { ChangeEvent, useState } from 'react';

export const useTodoInput = (initialValue: string) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return {
    inputValue,
    setInputValue,
    handleInput,
  };
};
