import PN11Form from '@/app/components/form/pn11-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'คำร้องขอหลักฐานการเข้าร่วมโครงการ (พน.11)',
};

export default async function Page({}: {}) {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>คำร้องขอหลักฐานการเข้าร่วมโครงการ (พน.11)</h1>
      </div>
      <div className='mt-4'>
        <PN11Form />
      </div>
    </div>
  );
}
