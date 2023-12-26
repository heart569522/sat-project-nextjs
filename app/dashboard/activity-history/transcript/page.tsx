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
              href: '/dashboard/activity-history',
            },
            {
              label: 'แบบร้องขอหลักฐานการเข้าร่วมโครงการ (พน.11)',
              href: '/dashboard/activity-history/transcript',
              active: true,
            },
          ]}
        />
      </div>
      <div className="mt-4 w-full">
        <PN11Form />
      </div>
    </>
  );
}
