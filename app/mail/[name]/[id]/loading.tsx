import { LeftSidebar } from '@/app/components/left-sidebar';

/**
 * LoadingThreadSkeleton component - Displays while an email thread is loading
 * Provides a consistent UI structure with the sidebar visible during loading
 * The empty content area indicates to users that thread content is being fetched
 */
export default function LoadingThreadSkeleton() {
  return (
    <div className="flex h-full grow">
      {/* Show the sidebar even during loading for better UX */}
      <LeftSidebar />
      <div className="grow overflow-auto p-2 sm:p-6">
        <div className="mx-auto max-w-4xl"></div>
      </div>
    </div>
  );
}
