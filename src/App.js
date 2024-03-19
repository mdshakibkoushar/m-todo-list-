import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = { ...formData, id: todos.length + 1, completed: false };
    setTodos([...todos, newTodo]);
    setFormData({ title: '', description: '' });
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleCheckboxChange = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          placeholder="Title" 
          required 
        />
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          placeholder="Description" 
          required 
        />
        <button type="submit">Add Todo</button>
      </form>
      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo.id} className={`todo-card ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-info">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheckboxChange(todo.id)}
              />
              <div>
                <h2>{todo.title}</h2>
                <p>{todo.description}</p>
              </div>
            </div>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
