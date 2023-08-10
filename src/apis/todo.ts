import { AxiosPromise } from 'axios';
import { Task } from 'src/type/type';
import { apiClient } from 'src/utils/axios';

export type CreateTodoPayload = Pick<Task, 'todo'>;
export type UpdateTodoPayload = Omit<Task, 'userId'>;

export const getTodos = async (): AxiosPromise<Task[]> => {
  return apiClient.get<Task[]>('/todos');
};

export const createTodo = async (payload: CreateTodoPayload): AxiosPromise<Task> => {
  return apiClient.post('/todos', payload);
};

export const updateTodo = async (payload: UpdateTodoPayload): AxiosPromise<Task> => {
  const { id, ...rest } = payload;
  return apiClient.put(`/todos/${id}`, rest);
};

export const deleteTodo = async (id: string): AxiosPromise<void> => {
  return apiClient.delete(`/todos/${id}`);
};
