
import Breadcrumbs from '@/app/components/breadcrumbs';
import PN01Form from '@/app/components/form/pn01-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'แบบฟอร์มเสนอโครงการ/กิจกรรม (พน.01)',
};

export default async function Page({}: {}) {
  return (
    <>
      <div>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'โครงการ/กิจกรรม', href: '/dashboard/project-proposal' },
            {
              label: 'แบบฟอร์มเสนอโครงการ/กิจกรรม (พน.01)',
              href: '/dashboard/project-proposal/request',
              active: true,
            },
          ]}
        />
      </div>
      <div className="w-full mt-4">
        <PN01Form />
      </div>
    </>
  );
}
