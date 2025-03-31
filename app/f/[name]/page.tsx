import { ThreadHeader, ThreadList } from '@/app/components/thread-list';
import { getThreadsForFolder } from '@/lib/db/queries';
import { Suspense } from 'react';

/**
 * Generate static paths for common folder names
 * This improves performance by pre-generating these pages at build time
 */
export function generateStaticParams() {
  const folderNames = [
    'inbox',
    'starred',
    'drafts',
    'sent',
    'archive',
    'trash',
  ];

  return folderNames.map((name) => ({ name }));
}

/**
 * ThreadsPage component - Shows list of email threads for a specific folder
 * Uses dynamic routing with the [name] parameter to determine which folder to display
 */
export default function ThreadsPage({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ q?: string; id?: string }>;
}) {
  return (
    <div className="flex h-screen">
      <Suspense fallback={<ThreadsSkeleton folderName="" />}>
        <Threads params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

/**
 * ThreadsSkeleton component - Loading placeholder for thread list
 * @param folderName - The name of the folder being loaded
 */
function ThreadsSkeleton({ folderName }: { folderName: string }) {
  return (
    <div className="grow overflow-hidden border-r border-gray-200">
      <ThreadHeader folderName={folderName} />
    </div>
  );
}

/**
 * Threads component - Fetches and displays threads for a specific folder
 * Handles search queries for filtering threads
 */
async function Threads({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ q?: string; id?: string }>;
}) {
  let { name } = await params;
  let { q } = await searchParams;
  let threads = await getThreadsForFolder(name);

  return <ThreadList folderName={name} threads={threads} searchQuery={q} />;
}
