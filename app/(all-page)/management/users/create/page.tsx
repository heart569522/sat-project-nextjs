import Breadcrumbs from '@/app/components/breadcrumbs';
import UserForm from '@/app/components/form/user-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'เพิ่มผู้ใช้',
};

export default async function Page() {
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
              label: 'เพิ่มผู้ใช้',
              href: '',
              active: true,
            },
          ]}
        />
        <div className="flex text-xl md:text-2xl">เพิ่มผู้ใช้</div>
      </div>
      <div className="mt-4 w-full">
        <UserForm isCreating={true} />
      </div>
    </main>
  );
}
