import PN11Form from '@/app/components/form/pn11-form';
import Breadcrumbs from '@/app/components/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'คำร้องขอหลักฐานการเข้าร่วมโครงการ (พน.11)',
};

export default async function Page({}: {}) {
  return (
    <>
      <div>
        <Breadcrumbs
          breadcrumbs={[
            {
              label: 'ประวัติการเข้าร่วมโครงการ/กิจกรรม',
              href: '/activity-history',
              active: false,
            },
            {
              label: 'ร้องขอเอกสารระเบียนกิจกรรม',
              href: '/activity-history/transcript',
              active: true,
            },
          ]}
        />
        <div className="flex text-xl md:text-2xl">
          ร้องขอเอกสารระเบียนกิจกรรม
        </div>
      </div>
      <div className="mt-4 w-full">
        <PN11Form />
      </div>
    </>
  );
}
