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
            {
              label: 'โครงการ/กิจกรรม',
              href: '/dashboard/project-proposal',
              active: false,
            },
            {
              label: 'เสนอโครงการ/กิจกรรม (พน.01)',
              href: '/dashboard/project-proposal/request',
              active: true,
            },
          ]}
        />
        <div className="flex text-xl md:text-2xl">
          เสนอโครงการ/กิจกรรม (พน.01)
        </div>
      </div>
      <div className="mt-4 w-full">
        <PN01Form />
      </div>
    </>
  );
}
