'use client';

import { sendEmail, verifyData } from '@/app/lib/api-service';
import { CircularProgress } from '@mui/material';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import Link from 'next/link';

export default function Verify({ params }: { params: { token: string } }) {
  const token = params.token;

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [verifiedError, setVerifiedError] = useState(false);
  const [pn11Data, setPN11Data] = useState<any>([]);

  if (!token) {
    notFound();
  }

  useEffect(() => {
    verifyToken();
  }, [token]);

  const verifyToken = async () => {
    try {
      const response = await verifyData(
        'activity-transcript/update-verify',
        token,
      );

      if (response && response.status === 200) {
        const documentLink = `${process.env.API_URL}/activity-history/transcript/document/${response.data.id}`;
        const formDataEmail = {
          firstname: response.data.data.firstname,
          lastname: response.data.data.lastname,
          email: response.data.data.email,
          documentLink: documentLink,
        };

        const emailResponse = await sendEmail(
          'send-email/notification/pn11',
          formDataEmail,
        );
        if (emailResponse && emailResponse.status === 200) {
          setLoading(false);
          setVerified(true);
          setPN11Data(response.data.data);
        }
      } else {
        setLoading(false);
        setVerifiedError(true);
      }
    } catch (error) {
      console.log('🚀 ~ verifyToken ~ error:', error);
      setLoading(false);
      setVerifiedError(true);
    }
  };

  return (
    <div className="flex h-modal items-center justify-center">
      <div className="rounded-md border border-gray-400 p-4 shadow-md">
        <div className="text-center">
          {loading && (
            <>
              <div className="mb-2 flex flex-col items-center justify-center gap-3">
                <CircularProgress />
                <p className="text-2xl">กำลังตรวจสอบข้อมูล</p>
              </div>
              <p className="text-lg">โปรดรอจนกว่าระบบจะยืนยันเสร็จสิ้น</p>
            </>
          )}

          {verifiedError && (
            <>
              <div className="mb-2 flex flex-col items-center justify-center gap-3">
                <ErrorOutlineOutlinedIcon className="h-14 w-14 text-red-500" />
                <p className="text-2xl">ผิดพลาด</p>
              </div>
              <p className="text-lg">โปรดตรวจสอบข้อมูลแล้วลองอีกครั้ง</p>
            </>
          )}

          {verified && (
            <>
              <div className="mb-2 flex flex-col items-center justify-center gap-3">
                <CheckCircleOutlinedIcon className="h-14 w-14 text-green-500" />
                <p className="text-2xl">ยืนยันสำเร็จ</p>
              </div>
              <p className="mb-2 text-lg">
                ระบบได้ส่งลิ้งค์คำร้องขอหลักฐานการเข้าร่วมโครงการ (พน.11) <br />
                ไปยังอีเมล {pn11Data.email}
              </p>
              <Link
                href={`/activity-history/transcript/document/${pn11Data.id}`}
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700"
              >
                ไปยังเอกสารคำร้องขอระเบียนกิจกรรม
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
