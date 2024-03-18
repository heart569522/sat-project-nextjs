import Breadcrumbs from '@/app/components/breadcrumbs';
import PN01SelectForm from '@/app/components/form/pn01-select-form';
import { getAllData } from '@/app/lib/api-service';
import IsAdminAuthen from '@/app/lib/isAuthen';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

const TITLE = 'แก้ไขตัวชี้วัดแผนกลยุทธ์';

export const metadata: Metadata = {
  title: TITLE,
};

export default async function StrategicPlanKPI() {
  const isAdmin = await IsAdminAuthen();
  if (!isAdmin) {
    notFound();
  }
  
  const data = await getAllData('pn01-select-list/strategic_plan_kpi_list');

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
