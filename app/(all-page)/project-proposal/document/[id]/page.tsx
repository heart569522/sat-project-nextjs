import Breadcrumbs from '@/app/components/breadcrumbs';
import { sarabun } from '@/app/components/fonts';
import { DocumentLoading } from '@/app/components/loading-screen';
import PN01Paper from '@/app/components/paper/pn01-paper';
import ToolBox from '@/app/components/paper/tool-box';
import { getDataById } from '@/app/lib/api-service';
import pn01Data from '@/app/model/pn01Data.json';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'แบบฟอร์มเสนอโครงการ/กิจกรรม (พน.01)',
};

export default async function Page(context: { params: { id: string } }) {
  const { id } = context.params;
  const pn01Data = await getDataById('project-proposal', id);

  return (
    <main>
      <div className="mb-6 print:hidden">
        <Breadcrumbs
          breadcrumbs={[
            {
              label: 'โครงการ/กิจกรรม',
              href: '/project-proposal',
              active: false,
            },
            {
              label: '...',
              href: '',
              active: false,
            },
            {
              label: 'เอกสารแบบฟอร์มเสนอโครงการ/กิจกรรม (พน.01)',
              href: '#',
              active: true,
            },
          ]}
        />
        <div className="flex text-xl md:text-2xl">
          เอกสารแบบฟอร์มเสนอโครงการ/กิจกรรม (พน.01)
        </div>
      </div>
      <div className="flex justify-center">
        <div id="pdf-content" className={`${sarabun.className}`}>
          <Suspense fallback={<DocumentLoading />}>
            <PN01Paper data={pn01Data} />
          </Suspense>
        </div>
        <ToolBox
          downloadFileName="แบบฟอร์มเสนอโครงการ/กิจกรรม(พน.01)"
          rootElementId="pdf-content"
          isPaperMargin={false}
        />
      </div>
    </main>
  );
}
