'use client';
import React from 'react';
import { Users } from '@/app/model/user';
import { EditProfile } from '@/app/components/buttons/buttons';

export default function UserProfile({ data }: { data: Users }) {


  return (
  <div className="flex flex-col p-5 border shadow-sm rounded-md">
    <div className="w-full p-3 py-4 bg-blue-500 rounded-md">
      <h1 className="text-center font-bold text-zinc-50 text-md md:text-2xl">ข้อมูลโปรไฟล์</h1>
    </div>
    <div className="grid grid-cols-2 mt-6 text-start text-xs md:text-2xl">
      <div className="w-full">
        <p className="mb-3">ชื่อ - นามสกุล : {data.firstname} {data.lastname}</p>
        <p className="mb-3">ตำแหน่ง : {data.role}</p>
        <p className="mb-3">คณะ : {data.faculty_name}</p>
        <p className="mb-3">สาขา : {data.major_name}</p>
        <p className="mb-3">ชื่อผู้ใช้งาน : {data.username}</p>
        <p className="mb-3">รหัสผ่าน :
          <button 
          className="ms-3 h-10 items-center focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 rounded-md text-base font-medium px-4 dark:focus:ring-yellow-900" 
          type="button">
              แก้ไขรหัสผ่าน
          </button>
        </p>
      </div>
      <div className="w-full border-l-2 border-gray-800 ps-4 ">
        <p className="mb-3">อีเมล : {data.email}</p>
        <p className="mb-3">เบอร์โทรศัพย์ : {data.phone}</p>
      </div>
    </div>
    <div className='flex flex-col mb-2 mt-6 gap-5'>
      <div className="justify-start">
        อัพเดตรั้งล่าสุด : {data.updated_at}
      </div>
        <EditProfile id={data.id}/>
    </div>
  </div>
  );
}
