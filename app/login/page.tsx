'use client';

import { signIn, signOut } from 'next-auth/react';

export default function SignIn() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="max-w-md rounded-lg border p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-semibold">Sign in to your account</h1>
        <button
          onClick={() => signIn()}
          className="focus:ring-opacity-50 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          Sign in
        </button>

        {/* Sign out button */}
        <button
          onClick={() => signOut()}
          className="focus:ring-opacity-50 mt-4 w-full rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
