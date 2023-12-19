import { Metadata } from 'next';
import Breadcrumbs from '@/app/components/breadcrumbs';
export const metadata: Metadata = {
  title: 'ค้นหาประวัติการเข้าร่วมโครงการ/กิจกรรมนักศึกษา',
};

export default async function Page({}: {}) {
  return (
    <>
      <div>
      <Breadcrumbs
          breadcrumbs={[
            { label: 'ค้นหาประวัติการเข้าร่วมโครงการ/กิจกรรม', href: '/dashboard/activity-history' },
            {
              label: 'ค้นหาประวัติการเข้าร่วมโครงการ/กิจกรรม',
              href: '/dashboard/activity-history/history',
              active: true,
            },
          ]}
        />
      </div>
    </>
  );
}
