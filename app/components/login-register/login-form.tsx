'use client';

import { authenticate } from '@/app/lib/actions';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/app/components/buttons/button';
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg h-[740px] px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-center text-2xl font-semibold text-gray-800`}>
          เข้าสู่ระบบ
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-base font-medium text-gray-900"
              htmlFor="username"
            >
              ชื่อผู้ใช้ / Username
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-base outline-2 placeholder:text-gray-500"
                id="username"
                type="text"
                name="username"
                placeholder="username"
                autoComplete='off'
                required
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-base font-medium text-gray-900"
              htmlFor="password"
            >
              รหัสผ่าน / Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-base outline-2 placeholder:text-gray-500"
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                required
                minLength={6}
                autoComplete='off'
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              <button
                type="button"
                onClick={handleShowPassword}
                className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 cursor-pointer peer-focus:text-gray-900"
              >
                {showPassword ? (
                  <EyeSlashIcon className="text-gray-500" />
                ) : (
                  <EyeIcon className="text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </div>
        <LoginButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
        <div className="mt-4">
          <div className="flex cursor-pointer justify-center text-gray-600 underline">
            ลืมรหัสผ่าน
          </div>
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      เข้าสู่ระบบ <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}