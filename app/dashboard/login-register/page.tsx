import { Metadata } from 'next';
import Form from '@/app/components/login-register/form';

export const metadata: Metadata = {
    title: 'เข้าสู่ระบบ/สมัครสมาชิก',
};

export default async function Page({}: {}) {
  return (
    <>
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`text-2xl`}>เข้าสู่ระบบ / สมัครสมาชิก</h1>
        </div>
      </div>
      <div className="container-md mt-3 rounded-md bg-slate-100 p-0 shadow-md">
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <Form />
          </div>
        </div>
      </div>
    </>
  );
}
