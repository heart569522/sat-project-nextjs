'use client';

import { Users } from '@/app/model/user';
import WavingHandOutlinedIcon from '@mui/icons-material/WavingHandOutlined';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

export default function CheckUserVerifyCard({ userData }: { userData: Users }) {
  const router = useRouter();
  const isVerified = userData.is_verify;
  const [loading, setLoading] = useState(true);

  const redirect = () => {
    if (isVerified) {
      if (userData.role === 'teacher') {
        router.replace('/project-proposal');
        setLoading(false);
      } else if (userData.role === 'admin') {
        router.replace('/dashboard');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    redirect();
  }, [isVerified, userData.role, router]);

  return (
    <>
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <CircularProgress />
          <span className="ml-4 text-lg font-medium">Loading...</span>
        </div>
      ) : (
        <div
          className={`${
            loading
              ? 'hidden'
              : 'rounded-md border border-gray-400 p-10 shadow-md'
          }`}
        >
          <div className="text-center">
            <div className="mb-2 flex flex-col items-center justify-center gap-3">
              <WavingHandOutlinedIcon className="h-16 w-16 text-gray-700" />
              <p className="text-2xl font-semibold">ยินดีต้อนรับ</p>
            </div>
            <p className="text-xl">
              คุณ{`${userData.firstname} ${userData.lastname}`}
            </p>
            <div className="mb-1 mt-2 flex items-center justify-center gap-2">
              <p className="text-lg">สถานะบัญชี : </p>
              {userData.is_verify ? (
                <div className="rounded-md bg-green-500 px-3 py-2 font-semibold text-white">
                  ยืนยันแล้ว
                </div>
              ) : (
                <div className="rounded-md bg-gray-300 px-3 py-2 font-semibold text-gray-800">
                  ไม่ยืนยัน
                </div>
              )}
            </div>
            {!userData.is_verify && (
              <p className="text-base text-red-500">
                **รอการยืนยันจากเจ้าหน้าที่
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
