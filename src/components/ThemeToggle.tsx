'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 cursor-pointer rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <Moon className="w-5 h-5 block dark:hidden" aria-hidden="true" />
      <Sun className="w-5 h-5 hidden dark:block" aria-hidden="true" />
    </button>
  );
}

