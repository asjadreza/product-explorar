import LoadingSkeleton from '@/components/LoadingSkeleton';

export default function Loading() {
  // Loading fallback should only show the skeleton. The page header is
  // rendered by the client component (`ProductExplorerClient`) to avoid
  // duplicate headers when the app router renders server-side loading UI.
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <LoadingSkeleton />
      </div>
    </div>
  );
}
