import Breadcrumbs from '@/app/components/breadcrumbs';
import PN10Form from '@/app/components/form/pn10-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'บันทึกการเข้าร่วมโครงการ/กิจกรรม',
};

export default async function Page({}: {}) {
  return (
    <div className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'บันทึกการเข้าร่วมโครงการ/กิจกรรม',
            href: '/dashboard/activity-record',
            active: true,
          },
        ]}
      />
      <div className="mt-4">
        <PN10Form />
      </div>
    </div>
  );
}
