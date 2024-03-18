import Form from '@/app/components/invoices/edit-form';
import Breadcrumbs from '@/app/components/breadcrumbs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PN01Form from '@/app/components/form/pn01-form';
import { getDataById } from '@/app/lib/api-service';
import { auth } from '@/auth';
import IsAdminAuthen from '@/app/lib/isAuthen';

export const metadata: Metadata = {
  title: 'แก้ไขการโครงการ/กิจกรรม (พน.01)',
};

export default async function Page({ params }: { params: { id: string } }) {
  const isAdmin = await IsAdminAuthen();

  const id = params.id;
  const data = await getDataById('project-proposal', id);

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
              label: 'จัดการคำร้องขอเสนอโครงการ/กิจกรรม',
              href: '/management/pn01',
              active: false,
            },
            {
              label: 'แก้ไขโครงการ/กิจกรรม (พน.01)',
              href: '',
              active: true,
            },
          ]}
        />
        <div className="flex text-xl md:text-2xl">
          แก้ไขการเสนอโครงการ/กิจกรรม (พน.01)
        </div>
      </div>
      {/* <Form invoice={invoice} customers={customers} /> */}
      <div className="mt-4 w-full">
        <PN01Form
          editData={data}
          isEditing={data.is_edit || user.role === 'admin'}
          isDrafting={data.is_draft}
          isAdminManage={user.role === 'admin'}
        />
      </div>
    </main>
  );
}
