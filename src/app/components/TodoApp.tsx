'use client';

import { useState, useEffect } from 'react';
import type { Todo, FilterType } from '@/app/types';
import TodoForm from './TodoForm';
import FilterButtons from './FilterButtons';
import TodoList from './TodoList';

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isHydrated, setIsHydrated] = useState(false);

  // Load todos from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('todos-app');
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load todos', e);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('todos-app', JSON.stringify(todos));
    }
  }, [todos, isHydrated]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: generateId(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  // Compute filtered todos based on current filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Don't render until hydrated to prevent mismatch
  if (!isHydrated) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold text-center mb-8 text-foreground">
        TODO App
      </h1>

      <TodoForm onAdd={addTodo} />

      <FilterButtons
        currentFilter={filter}
        onFilterChange={setFilter}
        activeCount={todos.filter(t => !t.completed).length}
        completedCount={todos.filter(t => t.completed).length}
      />

      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </div>
  );
}
