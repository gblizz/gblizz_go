import axios from 'axios';

//const API_URL = process.env.NODE_ENV === 'production' ? 'http://backend:8080/todos' : 'http://localhost:8080/todos';
const API_URL = 'http://localhost:8080/todos';


export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

export const getTodos = () => axios.get<Todo[]>(API_URL);
export const createTodo = (todo: Partial<Todo>) => axios.post(API_URL, todo);
export const updateTodo = (id: number, todo: Partial<Todo>) => axios.put(`${API_URL}/${id}`, todo);
//export const deleteTodo = (id: number) => axios.delete(`${API_URL}/${id}`);
export const deleteTodo = async (id: number): Promise<void> => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    // Ensure the response is valid
    if (response.status >= 200 && response.status < 300) {
      return; // Success, no need to parse response body
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    // Handle Axios-specific errors
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to delete todo: ${error.response?.data?.error || error.message}`);
    }
    throw error; // Rethrow non-Axios errors
  }
};