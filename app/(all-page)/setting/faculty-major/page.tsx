import Breadcrumbs from '@/app/components/breadcrumbs';
import FacultyMajorForm from '@/app/components/form/faculty-major-form';
import PN01SelectForm from '@/app/components/form/pn01-select-form';
import { getDataById } from '@/app/lib/api-service';
import { Metadata } from 'next';

const TITLE = 'เพิ่มคณะ/วิทยาลัย - สาขา';

export const metadata: Metadata = {
  title: TITLE,
};

export default async function FacultyMajor() {
  return (
    <main>
      <div>
        <Breadcrumbs
          breadcrumbs={[
            {
              label: 'ตั้งค่า',
              href: '/setting#faculty-major',
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
        <FacultyMajorForm pageTitle={TITLE} />
      </div>
    </main>
  );
}
