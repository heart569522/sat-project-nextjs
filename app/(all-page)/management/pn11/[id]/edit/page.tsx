import Breadcrumbs from '@/app/components/breadcrumbs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PN01Form from '@/app/components/form/pn01-form';
import { getDataById } from '@/app/lib/api-service';
import { auth } from '@/auth';
import PN11Form from '@/app/components/form/pn11-form';
import IsAdminAuthen from '@/app/lib/isAuthen';

export const metadata: Metadata = {
  title: 'แก้ไขคำร้องขอระเบียนกิจกรรม (พน.11)',
};

export default async function Page({ params }: { params: { id: string } }) {
  const isAdmin = await IsAdminAuthen();
  
  const id = params.id;
  const data = await getDataById('activity-transcript', id);

  const authResult = (await auth()) as any;
  const { user } = authResult;

  if (data.error || !id || !isAdmin) {
    notFound();
  }

  return (
    <main>
      <div>
        <Breadcrumbs
          breadcrumbs={[
            {
              label: 'จัดการคำร้องขอระเบียนกิจกรรม',
              href: '/management/pn11',
              active: false,
            },
            {
              label: 'แก้ไขคำร้องขอระเบียนกิจกรรม (พน.11)',
              href: '',
              active: true,
            },
          ]}
        />
        <div className="flex text-xl md:text-2xl">
          แก้ไขคำร้องขอระเบียนกิจกรรม (พน.11)
        </div>
      </div>
      <div className="mt-4 w-full">
        <PN11Form editData={data} isEditing={user.role === 'admin'} />
      </div>
    </main>
  );
}
