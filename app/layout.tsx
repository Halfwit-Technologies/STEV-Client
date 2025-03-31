import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import { Toaster } from 'sonner';
import { RightSidebar } from './components/right-sidebar';
import { WelcomeToast } from './components/welcome-toast';
import './globals.css';

// Load Inter font with Latin subset
const inter = Inter({ subsets: ['latin'] });

// Define metadata for SEO and browser tabs
export const metadata: Metadata = {
  title: 'Next.js Mail',
  description: 'An email client template using the Next.js App Router.',
};

/**
 * RootLayout component - Main application wrapper
 * Sets up the basic HTML structure, fonts, and global components
 * @param children - The page content to render inside the layout
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`bg-white text-gray-800 ${inter.className}`}>
      <body className="flex h-screen">
        {/* Main content area */}
        <main className="grow overflow-hidden">{children}</main>

        {/* Right sidebar with user information - wrapped in Suspense for async loading */}
        <Suspense fallback={<RightSidebarSkeleton />}>
          <RightSidebar userId={1} />
        </Suspense>

        {/* Toast notifications system */}
        <Toaster closeButton />

        {/* Welcome message for new users */}
        <WelcomeToast />
      </body>
    </html>
  );
}

/**
 * RightSidebarSkeleton component - Loading placeholder for sidebar
 * Displayed while the actual sidebar data is being fetched
 */
function RightSidebarSkeleton() {
  return (
    <div className="hidden w-[350px] shrink-0 overflow-auto bg-neutral-50 p-6 sm:flex" />
  );
}
