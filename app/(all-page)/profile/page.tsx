import UserProfile from '@/app/components/user-profile';
import { getUserLoginData } from '@/app/lib/api-service';
import { auth } from '@/auth';
import React from 'react'

export default async function Profile() {
  const authResult = (await auth()) as any;
  const { email } = authResult?.user || null;

  const userData = await getUserLoginData(email)
  console.log("🚀 ~ Profile ~ userData:", userData)

  return (
    <div className="w-full">
      <div className="flex text-xl md:text-2xl">โปรไฟล์</div>
      <div className="mt-4">
        <UserProfile data={userData}/>
      </div>
    </div>
  )
}
