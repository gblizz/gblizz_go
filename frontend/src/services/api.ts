// frontend/src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080';

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTodos = () =>
  api.get<Todo[]>('/todos').catch(error => {
    console.error('getTodos error:', error);
    throw error;
  });

export const createTodo = (todo: Partial<Todo>) =>
  api.post<Todo>('/todos', todo).catch(error => {
    console.error('createTodo error:', error);
    throw error;
  });

export const updateTodo = (id: number, todo: Partial<Todo>) =>
  api.put<Todo>(`/todos/${id}`, todo).catch(error => {
    console.error('updateTodo error:', error);
    throw error;
  });

export const deleteTodo = async (id: number): Promise<void> => {
  try {
    const response = await api.delete(`/todos/${id}`);
    if (response.status >= 200 && response.status < 300) {
      return;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    console.error('deleteTodo error:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to delete todo: ${error.response?.data?.error || error.message}`);
    }
    throw error;
  }
};