import PN10Form from '@/app/components/form/pn10-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'บันทึกการเข้าร่วมโครงการ/กิจกรรม',
};

export default async function Page({}: {}) {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>บันทึกการเข้าร่วมโครงการ/กิจกรรม</h1>
      </div>
      <div className='mt-4'>
        <PN10Form />
      </div>
    </div>
  );
}
