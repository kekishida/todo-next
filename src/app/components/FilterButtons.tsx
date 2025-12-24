'use client';

import type { FilterType } from '@/app/types';

interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
}

export default function FilterButtons({
  currentFilter,
  onFilterChange,
  activeCount,
  completedCount,
}: FilterButtonsProps) {
  const filters: { type: FilterType; label: string }[] = [
    { type: 'all', label: 'All' },
    { type: 'active', label: 'Active' },
    { type: 'completed', label: 'Completed' },
  ];

  return (
    <div className="mb-6">
      <div className="flex gap-2 mb-2">
        {filters.map(({ type, label }) => (
          <button
            key={type}
            onClick={() => onFilterChange(type)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentFilter === type
                ? 'bg-foreground text-background'
                : 'bg-zinc-100 dark:bg-zinc-800 text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        {activeCount} active, {completedCount} completed
      </div>
    </div>
  );
}
