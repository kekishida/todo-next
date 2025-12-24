'use client';

import { useState, FormEvent } from 'react';

interface TodoFormProps {
  onAdd: (text: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput) {
      onAdd(trimmedInput);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-foreground focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-foreground text-background rounded-lg hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
        >
          Add
        </button>
      </div>
    </form>
  );
}
