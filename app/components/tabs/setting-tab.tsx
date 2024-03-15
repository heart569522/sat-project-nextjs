'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import PN01SelectMenu from './pn01-select-menu';
import FacultyMenu from './faculty-menu';
import { Faculties } from '@/app/model/faculties-majors';
import { getAllData } from '@/app/lib/api-service';

export default function SettingTab() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('pn01-select');
  const [facultyData, setFacultyData] = useState<Faculties[]>();

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    getFacultyMajorData();
  }, []);

  const getFacultyMajorData = async () => {
    try {
      const faculty = await getAllData('faculties');

      setFacultyData(faculty);
    } catch (error) {
      console.error(error);
    }
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
              href="/#faculty-major"
              className={`inline-block rounded-t-lg border-b-2 p-4 
                ${
                  activeTab === 'faculty-major'
                    ? 'border-blue-600 p-4 font-semibold text-blue-600'
                    : 'hover:border-gray-300 hover:text-gray-600'
                }`}
              onClick={() => handleTabChange('faculty-major')}
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
        {activeTab === 'faculty-major' && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <FacultyMenu facultyLength={facultyData?.length as number}/>
          </div>
        )}
      </div>
    </>
  );
}
