import Breadcrumbs from '@/app/components/breadcrumbs';
import PN10Form from '@/app/components/form/pn10-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'บันทึกการเข้าร่วมโครงการ/กิจกรรม',
};

export default async function Page({}: {}) {
  return (
    <>
      <div className='flex text-xl md:text-2xl'>บันทึกการเข้าร่วมโครงการ/กิจกรรม</div>
      <div className="my-6 rounded-md border-2 border-gray-100 p-4 md:p-6">
        <PN10Form />
      </div>
    </>
  );
}
