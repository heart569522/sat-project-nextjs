import PN11Form from '@/app/components/form/pn11-form';
import Breadcrumbs from '@/app/components/invoices/breadcrumbs';
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
            { label: 'ประวัติการเข้าร่วมโครงการ/กิจกรรม', href: '/dashboard/activity-history' },
            {
              label: 'แบบร้องขอหลักฐานการเข้าร่วมโครงการ (พน.11)',
              href: '/dashboard/activity-history/pn11',
              active: true,
            },
          ]}
        />
      </div>
      <div className="w-full mt-4">
        <PN11Form />
      </div>
    </>
  );
}
