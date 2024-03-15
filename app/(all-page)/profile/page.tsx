import UserProfile from '@/app/components/user-profile';
import { getDataById, getUserLoginData } from '@/app/lib/api-service';
import { auth } from '@/auth';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: 'ข้อมูลโปรไฟล์',
};

export default async function Profile() {
  
  const authResult = (await auth()) as any;
  const { id } = authResult?.user || null;
  const userData = await getUserLoginData(id)

  return (
    <div className="">
      <div className="flex text-xl md:text-2xl">ข้อมูลโปรไฟล์</div>
      <div className="mt-4">
        <UserProfile data={userData}/>
      </div>
    </div>
  )
}
