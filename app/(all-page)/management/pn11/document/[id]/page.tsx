import Breadcrumbs from '@/app/components/breadcrumbs';
import { sarabun } from '@/app/components/fonts';
import { DocumentLoading } from '@/app/components/loading-screen';
import PN11Paper from '@/app/components/paper/pn11-paper';
import ToolBox from '@/app/components/paper/tool-box';
import { getDataById } from '@/app/lib/api-service';
import IsAdminAuthen from '@/app/lib/isAuthen';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'คำร้องขอหลักฐานการเข้าร่วมโครงการ (พน.11)',
};

export default async function Page(context: { params: { id: string } }) {
  const isAdmin = await IsAdminAuthen();
  if (!isAdmin) {
    notFound();
  }
  
  const { id } = context.params;
  const pn11Data = await getDataById('activity-transcript', id);

  return (
    <main>
      <div className="mb-6 print:hidden">
        <Breadcrumbs
          breadcrumbs={[
            {
              label: 'จัดการคำร้องขอระเบียนกิจกรรม',
              href: '/management/pn11',
              active: false,
            },
            {
              label: '...',
              href: '',
              active: false,
            },
            {
              label: 'เอกสารคำร้องขอหลักฐานการเข้าร่วมโครงการ (พน.11)',
              href: '#',
              active: true,
            },
          ]}
        />
        <div className="flex text-xl md:text-2xl">
          เอกสารคำร้องขอหลักฐานการเข้าร่วมโครงการ (พน.11)
        </div>
      </div>
      <div className="flex justify-center">
        <div id="pdf-content" className={`${sarabun.className}`}>
          <Suspense fallback={<DocumentLoading />}>
            <PN11Paper data={pn11Data} />
          </Suspense>
        </div>
        <ToolBox
          downloadFileName="คำร้องขอหลักฐานการเข้าร่วมโครงการ(พน.11)"
          rootElementId="pdf-content"
          isPaperMargin={true}
        />
      </div>
    </main>
  );
}
