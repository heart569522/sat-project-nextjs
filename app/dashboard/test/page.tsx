import PN01Form from '@/app/components/form/pn01-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'แบบฟอร์มเสนอโครงการ/กิจกรรม (พน.01)',
};

export default async function Page({}: {}) {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>แบบฟอร์มเสนอโครงการ/กิจกรรม (พน.01)</h1>
      </div>
      <div className='mt-4'>
        <PN01Form />
      </div>
    </div>
  );
}
