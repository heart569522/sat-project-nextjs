import Breadcrumbs from '@/app/components/breadcrumbs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getDataById } from '@/app/lib/api-service';
import PN10EditForm from '@/app/components/form/pn10-edit-form';

export const metadata: Metadata = {
  title: 'แก้ไขบันทึกการเข้าร่วมโครงการ/กิจกรรม',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const data = await getDataById('attendance', id);
  console.log('🚀 ~ Page ~ data:', data);
  // console.log("is_draft", data.is_draft)
  // console.log("is_edit", data.is_edit)

  if (data.error || !id) {
    notFound();
  }

  return (
    <main>
      <div>
        <Breadcrumbs
          breadcrumbs={[
            {
              label: 'บันทึกการเข้าร่วมโครงการ/กิจกรรม',
              href: '/activity-record',
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
      {/* <Form invoice={invoice} customers={customers} /> */}
      <div className="mt-4 w-full">
        <PN10EditForm editData={data} />
      </div>
    </main>
  );
}
