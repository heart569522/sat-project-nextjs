
import Breadcrumbs from '@/app/components/breadcrumbs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PN01Form from '@/app/components/form/pn01-form';
import { getDataById } from '@/app/lib/api-service';

export const metadata: Metadata = {
  title: 'แก้ไขการโครงการ/กิจกรรม (พน.01)',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const data = await getDataById('project-proposal', id);
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
              label: 'โครงการ/กิจกรรม',
              href: '/project-proposal',
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
          isEditing={data.is_edit}
          isDrafting={data.is_draft}
        />
      </div>
    </main>
  );
}
