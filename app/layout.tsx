import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './providers';

// Load Inter font with Latin subset
const inter = Inter({ subsets: ['latin'] });

// Define metadata for SEO and browser tabs
export const metadata: Metadata = {
  title: 'STEV - Email Client',
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
    <AuthProvider>
      <html lang="en" className={`bg-white text-gray-800 ${inter.className}`}>
        <body className="flex h-screen">
          {/* Main content area */}
          <main className="grow overflow-hidden">{children}</main>

          {/* Right sidebar with user information - wrapped in Suspense for async loading */}
          {/* <Suspense fallback={}></Suspense> */}
        </body>
      </html>
    </AuthProvider>
  );
}
