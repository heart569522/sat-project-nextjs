'use client';
import { getAllData } from '@/app/lib/api-service';
import { Faculties } from '@/app/model/faculties-majors';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SettingSkeleton } from '../skeletons';
import { ButtonDialog } from '../buttons/button-dialog';

export default function FacultyMenu({
  facultyLength,
}: {
  facultyLength: number;
}) {
  const [facultyData, setFacultyData] = useState<Faculties[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFacultyMajorData();
  }, []);

  const getFacultyMajorData = async () => {
    try {
      const faculty = await getAllData('faculties');

      setFacultyData(faculty);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <>
          {Array.from({ length: facultyLength }, (_, index) => (
            <SettingSkeleton key={index} />
          ))}
        </>
      ) : (
        <>
          {facultyData?.map((menuItem, index) => (
            <div
              key={index}
              className="flex h-20 w-full items-center justify-between gap-1 rounded-md border bg-gray-50 p-4 hover:border-blue-500"
            >
              <p className="text-lg font-semibold text-gray-800">
                {menuItem.name}
              </p>
              <div className="flex gap-1">
                <div
                  className={`rounded-md border bg-white p-2 hover:bg-gray-200`}
                >
                  <Link href={`setting/faculty-major/${menuItem.id}/edit`}>
                    <PencilIcon className="w-5" />
                  </Link>
                </div>
                <ButtonDialog
                  id={menuItem.id}
                  apiPath="faculties/faculty-major/delete"
                  action="delete"
                  title={`ลบคณะ/วิทยาลัย : ${menuItem.name}`}
                  detail={`ระบบจะลบข้อมูลสาขาที่อยู่ภายในคณะ/วิทยาลัยนี้ออกทั้งหมด`}
                  onSuccess={getFacultyMajorData}
                  className="bg-white hover:bg-gray-200"
                />
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
