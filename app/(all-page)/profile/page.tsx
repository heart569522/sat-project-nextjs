import UserProfile from '@/app/components/user-profile';
import { getDataById, getUserLoginData } from '@/app/lib/api-service';
import { auth } from '@/auth';
import React from 'react'

export default async function Profile() {
  const authResult = (await auth()) as any;
  const { id } = authResult?.user || null;
  const userData = await getUserLoginData(id)

  return (
    <div className="w-full">
      <div className="flex text-xl md:text-2xl">จัดการโปรไฟล์</div>
      <div className="mt-4">
        <UserProfile data={userData}/>
      </div>
    </div>
  )
}
