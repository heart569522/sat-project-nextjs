import React from 'react';
import { Users } from '@/app/model/user';
import { EditProfile } from '@/app/components/buttons/buttons';
import Link from 'next/link';
import { EditPassword } from '@/app/components/buttons/buttons';
import { LockClosedIcon, PaperClipIcon } from '@heroicons/react/24/outline';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import SettingsAccessibilityOutlinedIcon from '@mui/icons-material/SettingsAccessibilityOutlined';

export default async function UserProfile({ data }: { data: Users }) {
  const CheckRole = () => {
    if (data.role === 'admin') {
      return 'ผู้ดูแลระบบ';
    } else if (data.role === 'teacher') {
      return 'อาจารย์';
    } else {
      return null;
    }
  };

  return (
    <div className="">
      <div className="mt-10 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">
              ชื่อผู้ใช้
            </dt>
            <dd className="mt-1 text-lg font-semibold leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data.username}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">
              ชื่อ - นามสกุล
            </dt>
            <dd className="mt-1 text-lg font-semibold leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data.firstname} {data.lastname}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">
              ตำแหน่ง
            </dt>
            <dd className="mt-1 text-lg font-semibold leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <CheckRole />
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">
              คณะ/วิทยาลัย
            </dt>
            <dd className="mt-1 text-lg font-semibold leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data.faculty_name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">
              สาขา
            </dt>
            <dd className="mt-1 text-lg font-semibold leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data.major_name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">
              Email
            </dt>
            <dd className="mt-1 text-lg font-semibold leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data.email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">
              เบอร์โทรศัพท์
            </dt>
            <dd className="mt-1 text-lg font-semibold leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data.phone}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">
              จัดการ
            </dt>
            <dd className="mt-4 text-lg text-gray-900 sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                className="divide-y divide-gray-200 rounded-md border border-gray-200"
              >
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-lg leading-6 hover:bg-gray-50">
                  <div className="flex w-0 flex-1 items-center">
                    <LockPersonOutlinedIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        แก้ไขรหัสผ่าน
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <Link
                      href={`/profile/change-password/${data.id}/edit`}
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      แก้ไข
                    </Link>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-lg leading-6 hover:bg-gray-50">
                  <div className="flex w-0 flex-1 items-center">
                    <SettingsAccessibilityOutlinedIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        แก้ไขข้อมูลโปรไฟล์
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <Link
                      href={`/profile/${data.id}/edit`}
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      แก้ไข
                    </Link>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
    // </div>
  );
}
