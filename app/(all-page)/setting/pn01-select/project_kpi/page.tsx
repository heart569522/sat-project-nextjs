import Breadcrumbs from '@/app/components/breadcrumbs';
import PN01SelectForm from '@/app/components/form/pn01-select-form';
import { getAllData } from '@/app/lib/api-service';
import { Metadata } from 'next';

const TITLE = 'แก้ไขตัวชี้วัดโครงการ';

export const metadata: Metadata = {
  title: TITLE,
};

export default async function ProjectKPI() {
  const data = await getAllData('pn01-select-list/project_kpi_list');

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
              label: TITLE,
              href: '',
              active: true,
            },
          ]}
        />
        <div className="flex text-xl md:text-2xl">{TITLE}</div>
      </div>
      <div className="mt-4 w-full">
        <PN01SelectForm data={data} pageTitle={TITLE} />
      </div>
    </main>
  );
}
