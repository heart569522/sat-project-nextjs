'use client';

import React, { useEffect, useState } from 'react';
import LoginForm from './login-form';
import RegisterForm from './register-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TabLoginRegister() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      setActiveTab(hash || 'login');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    router.replace(`#${activeTab}`, undefined);
  }, [activeTab, router]);

  return (
    <React.Fragment>
      <div className="flex flex-col">
        <div className="mb-4 flex items-center justify-between gap-2">
          <Link
            href="/#login"
            className={`w-full rounded-md border px-4 py-2 text-center text-lg font-medium transition-colors ${
              activeTab === 'login'
                ? 'border-blue-500 bg-blue-50 text-blue-500 hover:bg-blue-200'
                : 'border-gray-200 bg-gray-50 text-gray-800 hover:bg-gray-100'
            }`}
            onClick={() => handleTabChange('login')}
          >
            เข้าสู่ระบบ
          </Link>
          <Link
            href="/#register"
            className={`w-full rounded-md border px-4 py-2 text-center text-lg font-medium transition-colors ${
              activeTab === 'register'
                ? 'border-blue-500 bg-blue-50 text-blue-500 hover:bg-blue-200'
                : 'border-gray-200 bg-gray-50 text-gray-800 hover:bg-gray-100'
            }`}
            onClick={() => handleTabChange('register')}
          >
            สมัครสมาชิก
          </Link>
        </div>
        <div className="rounded-md border border-gray-200 p-4">
          {activeTab === 'login' && (
            <div className="flex justify-center">
              <div className="w-2/4 max-lg:w-full">
                <LoginForm />
              </div>
            </div>
          )}

          {activeTab === 'register' && (
            <div>
              <RegisterForm />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
