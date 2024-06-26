import Breadcrumbs from '@/app/components/breadcrumbs';
import FacultyMajorForm from '@/app/components/form/faculty-major-form';
import { getDataById } from '@/app/lib/api-service';
import IsAdminAuthen from '@/app/lib/isAuthen';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

const TITLE = 'แก้ไขคณะ/วิทยาลัย - สาขา';

export const metadata: Metadata = {
  title: TITLE,
};

export default async function FacultyMajor({
  params,
}: {
  params: { id: string };
}) {
  const isAdmin = await IsAdminAuthen();
  if (!isAdmin) {
    notFound();
  }

  const id = params.id;
  const data = await getDataById('faculties', id);

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
        <FacultyMajorForm data={data[0]} pageTitle={TITLE} isEditing={true} />
      </div>
    </main>
  );
}
