import { Button, Checkbox, Input, List, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import { createTodo, deleteTodo, getTodos, Todo, updateTodo } from '../services/api';


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

const removeTodo = (id: number) => {
  deleteTodo(id).then(() => {
    setTodos(todos.filter(todo => todo.id !== id));
  });
};

  const toggleComplete = (todo: Todo) => {
    updateTodo(todo.id, { ...todo, completed: !todo.completed }).then(() => {
      setTodos(todos.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t));
    });
  };
 
  return (
    <div style={{ padding: 20 }}>
      <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <Input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} style={{ margin: '10px 0' }} />
      <Button type="primary" onClick={addTodo}>Add Todo</Button>
      <List
        bordered
        dataSource={todos}
        renderItem={todo => (
          <List.Item actions=
            {[
              <Popconfirm 
                title="Are you sure?" 
                onConfirm={() => {
                  console.log('Confirmed deletion for ID:', todo.id);
                  removeTodo(todo.id)
                }}
              >
                <Button>Delete</Button>
              </Popconfirm>
            ]}
          >
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