import Breadcrumbs from '@/app/components/breadcrumbs';
import PN01Form from '@/app/components/form/pn01-form';
import { getUserLoginData } from '@/app/lib/api-service';
import { auth } from '@/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'แบบฟอร์มเสนอโครงการ/กิจกรรม (พน.01)',
};

export default async function Page() {
  const authResult = (await auth()) as any;
  const { id } = authResult?.user || null;
  const userData = await getUserLoginData(id)
  
  return (
    <>
      <div>
        <Breadcrumbs
          breadcrumbs={[
            {
              label: 'โครงการ/กิจกรรม',
              href: '/project-proposal',
              active: false,
            },
            {
              label: 'เสนอโครงการ/กิจกรรม (พน.01)',
              href: '/project-proposal/request',
              active: true,
            },
          ]}
        />
        <div className="flex text-xl md:text-2xl">
          เสนอโครงการ/กิจกรรม (พน.01)
        </div>
      </div>
      <div className="mt-4 w-full">
        <PN01Form userId={userData.id}/>
      </div>
    </>
  );
}
