'use client';

import { signIn, signOut } from 'next-auth/react';

/**
 * SignIn component - Authentication page for users to log in
 * Provides buttons for sign in and sign out functionality
 * Uses NextAuth.js for authentication handling
 */
export default function SignIn() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-semibold">
          Sign in to your account
        </h1>

        {/* Sign in button */}
        <button
          onClick={() => signIn()}
          className="focus:ring-opacity-50 mb-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          Sign in
        </button>

        <div className="my-4 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Sign out button */}
        <button
          onClick={() => signOut()}
          className="focus:ring-opacity-50 w-full rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:outline-none"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
