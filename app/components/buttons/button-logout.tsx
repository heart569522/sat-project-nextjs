import { signOut } from '@/auth';
import { PowerIcon } from '@heroicons/react/24/outline';
import React from 'react';

export function ButtonLogoutMoblie() {
  return (
    // <form
    //   action={async () => {
    //     'use server';
    //     await signOut();
    //   }}
    // >
    <button
      onClick={() => signOut()}
      className="flex h-8 items-center justify-start gap-2 rounded-md bg-gray-200 p-2 px-3 text-sm font-medium text-gray-900 transition hover:bg-gray-300"
    >
      ออกจากระบบ
    </button>
    // </form>
  );
}
