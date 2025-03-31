'use client';

import Form from 'next/form';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * Search component - Provides search functionality for the application
 * Client-side component that manages search input state and focus
 * Preserves search query from URL parameters
 */
export function Search() {
  // Reference to the search input for focus management
  let inputRef = useRef<HTMLInputElement>(null);
  // Get current search parameters from the URL
  let searchParams = useSearchParams();

  // Auto-focus the search input and position cursor at end when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length,
      );
    }
  }, []);

  return (
    <Form action="/search" className="w-full">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        ref={inputRef}
        id="search"
        name="q"
        className="w-full bg-transparent py-2 focus:outline-hidden"
        placeholder="Search"
        defaultValue={searchParams.get('q')?.toString()}
      />
    </Form>
  );
}
