import { getAllData } from '@/app/lib/api-service';
import { Faculties } from '@/app/model/faculties-majors';
import { PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function FacultyMenu() {
  const [facultyData, setFacultyData] = useState<Faculties[]>();

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

  
  return (
    <>
      {facultyData?.map((menuItem, index) => (
        <div
          key={index}
          className="flex h-20 w-full items-center justify-between gap-1 rounded-md border bg-gray-50 p-4 hover:border-blue-500"
        >
          <p className="text-lg font-semibold text-gray-800">
            {menuItem.name}
          </p>
          <div
            className={`rounded-md border bg-gray-100 p-2 hover:bg-gray-200`}
          >
            <Link href={`setting/faculty-major/${menuItem.id}/edit`}>
              <PencilIcon className="w-5" />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
