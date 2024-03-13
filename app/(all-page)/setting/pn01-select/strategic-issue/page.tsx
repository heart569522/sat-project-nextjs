import Breadcrumbs from '@/app/components/breadcrumbs';
import PN01SelectForm from '@/app/components/form/pn01-select-form';
import { getAllData } from '@/app/lib/api-service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'แก้ไขประเด็นยุทธศาสตร์',
};

export default async function StrategicIssue() {
  const data = await getAllData('pn01-select-list/strategic_issue_list');

  return (
    <main>
      <div>
        <Breadcrumbs
          breadcrumbs={[
            {
              label: 'ตั้งค่า',
              href: '/setting',
              active: false,
            },
            {
              label: 'แก้ไขประเด็นยุทธศาสตร์',
              href: '',
              active: true,
            },
          ]}
        />
        <div className="flex text-xl md:text-2xl">แก้ไขประเด็นยุทธศาสตร์</div>
      </div>
      <div className="mt-4 w-full">
        <PN01SelectForm data={data} />
      </div>
    </main>
  );
}
