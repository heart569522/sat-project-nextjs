'use client';

import { FaceFrownIcon } from '@heroicons/react/24/outline';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <main className="flex h-full flex-col items-center justify-center gap-2">
          <FaceFrownIcon className="w-10 text-gray-400" />
          <h2 className="text-xl font-semibold">Something went wrong!</h2>
          <button
            onClick={() => reset()}
            className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
