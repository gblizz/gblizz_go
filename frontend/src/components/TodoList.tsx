import React, { useEffect, useState } from 'react';
import { List, Input, Button, Checkbox, Modal } from 'antd';
import { ModalFuncProps } from 'antd';
import { getTodos, createTodo, updateTodo, deleteTodo, Todo } from '../services/api';


const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    getTodos().then(res => setTodos(res.data));
  }, []);

  const addTodo = () => {
    createTodo({ title, description }).then(res => setTodos([...todos, res.data]));
    setTitle(''); setDescription('');
  };

  const toggleComplete = (todo: Todo) => {
    updateTodo(todo.id, { ...todo, completed: !todo.completed }).then(() => {
      setTodos(todos.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t));
    });
  };

  const removeTodo = (id: number) => {
    console.log("Delete button clicked for ID:", id);
      try {
        console.log('Attempting to call Modal.confirm');
        const modal = Modal.confirm({
          title: 'Delete Todo?',
          content: 'Are you sure you want to delete this todo?',
          getContainer: () => document.body,
          onOk: async () => {
            console.log('Confirmed deletion for ID:', id);
            modal.destroy();
          },
          onCancel: () => {
            console.log('Deletion cancelled');
            modal.destroy();
          },
        } as ModalFuncProps);
        console.log('After Modal.confirm');
      } catch (error) {
        console.error('Error rendering Modal.confirm:', error);
      }
  };
 

  return (
    <div style={{ padding: 20 }}>
      <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <Input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} style={{ margin: '10px 0' }} />
      <Button type="primary" onClick={addTodo}>Add Todo</Button>
      <Button onClick={() => Modal.info({ title: 'Test Modal', content: 'This is a test' })}>Test Modal</Button>
      <List
        bordered
        dataSource={todos}
        renderItem={todo => (
          <List.Item actions={[<Button onClick={() => removeTodo(todo.id)}>Delete</Button>]}>
            <Checkbox checked={todo.completed} onChange={() => toggleComplete(todo)}>
              {todo.title} - {todo.description}
            </Checkbox>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TodoList;