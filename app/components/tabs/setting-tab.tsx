'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { EditButton } from '../buttons/buttons';
import { PencilIcon } from '@heroicons/react/24/outline';

const title = ['Applied', 'Phone Screening', 'Interview', 'Offer', 'Hired'];

export default function SettingTab() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('pn01-select');

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      setActiveTab(hash || 'pn01-select');
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
    <>
      <div className="border-b border-gray-300 text-center text-base font-medium text-gray-500">
        <ul className="-mb-px flex flex-wrap">
          <li className="me-2">
            <Link
              href="/#pn01-select"
              className={`inline-block rounded-t-lg border-b-2 p-4 
                ${
                  activeTab === 'pn01-select'
                    ? 'border-blue-600 p-4 font-semibold text-blue-600'
                    : 'hover:border-gray-300 hover:text-gray-600'
                }`}
              onClick={() => handleTabChange('pn01-select')}
            >
              เมนูตัวเลือกฟอร์ม พน.01
            </Link>
          </li>
          <li className="me-2">
            <Link
              href="/#facuty-major"
              className={`inline-block rounded-t-lg border-b-2 p-4 
                ${
                  activeTab === 'facuty-major'
                    ? 'border-blue-600 p-4 font-semibold text-blue-600'
                    : 'hover:border-gray-300 hover:text-gray-600'
                }`}
              onClick={() => handleTabChange('facuty-major')}
            >
              คณะ/วิทยาลัย — สาขา
            </Link>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        {activeTab === 'pn01-select' && (
          <div className="grid grid-cols-3 gap-2 max-md:grid-cols-2">
            <div className="flex h-16 w-full items-center justify-between rounded-md border bg-gray-50 p-4 hover:border-sky-100">
              <p className="text-lg font-semibold">ประเด็นยุทธศาสตร์</p>
              <div className={`rounded-md border p-2 hover:bg-gray-100`}>
                <Link href={'/setting/pn01-select/strategic-issue'}>
                  <PencilIcon className="w-5" />
                </Link>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'facuty-major' && (
          <div className="grid grid-cols-4 gap-2 max-md:grid-cols-2">
            faasfa
          </div>
        )}
      </div>
    </>
  );
}
