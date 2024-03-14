import Breadcrumbs from '@/app/components/breadcrumbs';
import FacultyMajorForm from '@/app/components/form/faculty-major-form';
import PN01SelectForm from '@/app/components/form/pn01-select-form';
import { getAllData } from '@/app/lib/api-service';
import { Metadata } from 'next';

const TITLE = 'แก้ไขคณะ/วิทยาลัย — สาขา';

export const metadata: Metadata = {
  title: TITLE,
};

export default async function FacultyMajor() {
  const data = await getAllData('faculties/faculty-major');

  return (
    <main>
      <div>
        <Breadcrumbs
          breadcrumbs={[
            {
              label: 'ตั้งค่า',
              href: '/setting#facuty-major',
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
        {/* <FacultyMajorForm data={data} pageTitle={TITLE}/> */}
      </div>
    </main>
  );
}
