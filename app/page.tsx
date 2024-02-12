import { Metadata } from 'next';
import Form from '@/app/components/login-register/form';
import TabLoginRegister from '@/app/components/login-register/tab';

export const metadata: Metadata = {
  title: 'เข้าสู่ระบบ/สมัครสมาชิก',
};

export default async function Page({}: {}) {
  return (
    <>
      <div className="w-full">
        <div className="flex text-xl md:text-2xl">
          เข้าสู่ระบบ / สมัครสมาชิก
        </div>
        <div className="mt-8">
          {/* <Form /> */}
          <TabLoginRegister />
        </div>
      </div>
    </>
  );
}
