'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import PN01SelectMenu from './pn01-select-menu';
import FacultyMajorForm from '../form/faculty-major-form';

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
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <PN01SelectMenu />
          </div>
        )}
        {activeTab === 'facuty-major' && (
          
            <FacultyMajorForm
              pageTitle={'แก้ไขคณะ/วิทยาลัย — สาขา'}
            />
          
        )}
      </div>
    </>
  );
}
