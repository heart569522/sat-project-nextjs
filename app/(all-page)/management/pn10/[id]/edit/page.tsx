import Breadcrumbs from '@/app/components/breadcrumbs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getDataById } from '@/app/lib/api-service';
import PN10EditForm from '@/app/components/form/pn10-edit-form';
import IsAdminAuthen from '@/app/lib/isAuthen';

export const metadata: Metadata = {
  title: 'แก้ไขบันทึกการเข้าร่วมโครงการ/กิจกรรม',
};

export default async function Page({ params }: { params: { id: string } }) {
  const isAdmin = await IsAdminAuthen();
  
  const id = params.id;
  const data = await getDataById('attendance', id);

  if (data.error || !id || !isAdmin) {
    notFound();
  }

  return (
    <main>
      <div>
        <Breadcrumbs
          breadcrumbs={[
            {
              label: 'รายการข้อมูลบันทึกการเข้าร่วมโครงการ/กิจกรรม พน.10',
              href: '/management/pn10',
              active: false,
            },
            {
              label: 'แก้ไขบันทึกการเข้าร่วมโครงการ/กิจกรรม',
              href: '',
              active: true,
            },
          ]}
        />
        <div className="flex text-xl md:text-2xl">
          แก้ไขบันทึกการเข้าร่วมโครงการ/กิจกรรม
        </div>
      </div>
      <div className="mt-4 w-full">
        <PN10EditForm editData={data} isAdminManage={true} />
      </div>
    </main>
  );
}
