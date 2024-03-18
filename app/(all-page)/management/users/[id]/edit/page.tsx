import Breadcrumbs from '@/app/components/breadcrumbs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PN01Form from '@/app/components/form/pn01-form';
import { getDataById } from '@/app/lib/api-service';
import { auth } from '@/auth';
import PN11Form from '@/app/components/form/pn11-form';
import UserForm from '@/app/components/form/user-form';

export const metadata: Metadata = {
  title: 'แก้ไขข้อมูลผู้ใช้',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const data = await getDataById('users', id);
  console.log('🚀 ~ Page ~ data:', data);

  if (data.error || !id) {
    notFound();
  }

  return (
    <main>
      <div>
        <Breadcrumbs
          breadcrumbs={[
            {
              label: 'รายการผู้ใช้งานระบบ',
              href: '/management/users',
              active: false,
            },
            {
              label: 'แก้ไขข้อมูลผู้ใช้',
              href: '',
              active: true,
            },
          ]}
        />
        <div className="flex text-xl md:text-2xl">แก้ไขข้อมูลผู้ใช้</div>
      </div>
      <div className="mt-4 w-full">
        <UserForm editData={data} isEditing={true} isAdminTable={true} />
      </div>
    </main>
  );
}
