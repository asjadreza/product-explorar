import LoadingSkeleton from '@/components/LoadingSkeleton';
import ThemeToggle from '@/components/ThemeToggle';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Product Explorer</h1>
          <ThemeToggle />
        </div>
        <LoadingSkeleton />
      </div>
    </div>
  );
}
