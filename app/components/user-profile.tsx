'use client';
import React from 'react';
import { Users } from '@/app/model/user';
import { EditProfile } from '@/app/components/buttons/buttons';

export default function UserProfile({ data }: { data: Users }) {
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
    <div className="w-2/3">
      <div className="w-full rounded-md border p-5 shadow-sm">
        {/* <div className="w-full rounded-md bg-blue-500 p-3 py-4">
          <h1 className="text-md text-center font-bold text-zinc-50 md:text-2xl">
            ข้อมูลโปรไฟล์
          </h1>
        </div> */}
        {/* <div className="grid grid-cols-2 text-start text-xs md:text-2xl">
          <div className="w-full">
            <p className="mb-3">
              ชื่อ - นามสกุล : {data.firstname} {data.lastname}
            </p>
            <p className="mb-3">
              ตำแหน่ง : <CheckRole />
            </p>
            <p className="mb-3">คณะ : {data.faculty_name}</p>
            <p className="mb-3">สาขา : {data.major_name}</p>
            <p className="mb-3">ชื่อผู้ใช้งาน : {data.username}</p>
            <p className="mb-3">
              รหัสผ่าน :
              <button
                className="ms-3 h-10 items-center rounded-md bg-yellow-400 px-4 text-base font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
                type="button"
              >
                แก้ไขรหัสผ่าน
              </button>
            </p>
          </div>
          <div className="w-full border-l-2 border-gray-800 ps-4 ">
            <p className="mb-3">อีเมล : {data.email}</p>
            <p className="mb-3">เบอร์โทรศัพท์ : {data.phone}</p>
          </div>
        </div>
        <div className="mb-2 mt-6 flex flex-col gap-5">
          <EditProfile id={data.id} />
        </div> */}
        <div className="flex flex-col gap-y-6">
          <h2 className="text-4xl font-bold tracking-wide">
            คุณ{data.firstname}&nbsp;{data.lastname}
          </h2>
          <div className="flex gap-x-2">
            <p className="text-2xl font-semibold">ตำแหน่ง :</p>
            <p className="text-2xl">
              <CheckRole />
            </p>
          </div>
          {data.faculty_name && (
            <div className="flex gap-x-2">
              <p className="text-2xl font-semibold">คณะ/วิทยาลัย :</p>
              <p className="text-2xl">{data.faculty_name}</p>
            </div>
          )}
          {data.major_name && (
            <div className="flex gap-x-2">
              <p className="text-2xl font-semibold">สาขา :</p>
              <p className="text-2xl">{data.major_name}</p>
            </div>
          )}
          <div className="flex gap-x-2">
            <p className="text-2xl font-semibold">เบอร์โทรศัพท์ :</p>
            <p className="text-2xl">{data.phone}</p>
          </div>
          <div className="flex gap-x-2">
            <p className="text-2xl font-semibold">อีเมล :</p>
            <p className="text-2xl">{data.email}</p>
          </div>
          <div className="flex gap-x-2">
            <p className="text-2xl font-semibold">ชื่อผู้ใช้ :</p>
            <p className="text-2xl">{data.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
