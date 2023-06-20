import React, { useState, useEffect } from 'react';
import './TodoApp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputSubject, setInputSubject] = useState('');
  const [inputBody, setInputBody] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      setTodos(parsedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubjectChange = (event) => {
    setInputSubject(event.target.value);
  };

  const handleBodyChange = (event) => {
    setInputBody(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputSubject !== '' && inputBody !== '') {
      const newTodo = {
        id: Date.now(),
        title: inputSubject,
        description: inputBody,
        status: false,
      };
      setTodos([...todos, newTodo]);
      setInputSubject('');
      setInputBody('');
    }
  };

  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: !todo.status,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Title"
          value={inputSubject}
          onChange={handleSubjectChange}
        />
        <textarea
          placeholder="Description"
          value={inputBody}
          onChange={handleBodyChange}
        ></textarea>
        <button onClick={handleAddTodo}>Add Task</button>
      </div>
            <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.status ? 'completed' : ''}>
            <div className="todo-item">
              <div className="toggle-container">
                <button
                  className="toggle-button"
                  onClick={() => handleToggleTodo(todo.id)}
                >
                  <FontAwesomeIcon
                    icon={todo.status ? faToggleOn : faToggleOff}
                  />
                </button>
              </div>
              <div className="todo-content">
                <span className="subject">{todo.title}</span>
                <p className="todobody">{todo.description}</p>
              </div>
              <div className="date-container">
                <span className="date">{formatDate(todo.id)}</span>
              </div>
              <div className="delete-container">
                <button
                  className="delete-button"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;