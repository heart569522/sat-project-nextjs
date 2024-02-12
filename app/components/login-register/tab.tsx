'use client';

import React, { useState } from 'react';
import LoginForm from './login-form';
import RegisterForm from './register-form';

export default function TabLoginRegister() {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <React.Fragment>
      <div className="flex flex-col">
        <div className="mb-4 flex items-center justify-between gap-2">
          <button
            className={`w-full rounded-md border px-4 py-2 text-lg font-medium transition-colors ${
              activeTab === 'login'
                ? 'border-blue-500 bg-blue-50 text-blue-500 hover:bg-blue-200'
                : 'border-gray-200 bg-gray-50 text-gray-800 hover:bg-gray-100'
            }`}
            onClick={() => handleTabChange('login')}
          >
            เข้าสู่ระบบ
          </button>
          <button
            className={`w-full rounded-md border px-4 py-2 text-lg font-medium transition-colors ${
              activeTab === 'register'
                ? 'border-blue-500 bg-blue-50 text-blue-500 hover:bg-blue-200'
                : 'border-gray-200 bg-gray-50 text-gray-800 hover:bg-gray-100'
            }`}
            onClick={() => handleTabChange('register')}
          >
            สมัครสมาชิก
          </button>
        </div>
        <div className="rounded-md border border-gray-200 p-4">
          {activeTab === 'login' && (
            <div className="flex justify-center">
              <div className="w-2/4 max-lg:w-full">
                <LoginForm />
              </div>
            </div>
          )}
          {activeTab === 'register' && <RegisterForm />}
        </div>
      </div>
    </React.Fragment>
  );
}
