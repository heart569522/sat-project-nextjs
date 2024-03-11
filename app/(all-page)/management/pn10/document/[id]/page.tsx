import Breadcrumbs from '@/app/components/breadcrumbs';
import { sarabun } from '@/app/components/fonts';
import { DocumentLoading } from '@/app/components/loading-screen';
import PN10Paper from '@/app/components/paper/pn10-paper';
import ToolBox from '@/app/components/paper/tool-box';
import { getDataById } from '@/app/lib/api-service';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'แบบฟอร์มลงชื่อเข้าร่วมโครงการ/กิจกรรม (พน.10)',
};

export default async function Page(context: { params: { id: string } }) {
  const { id } = context.params;
  const pn10Data = await getDataById('attendance', id);

  return (
    <main>
      <div className="mb-6 print:hidden">
        <Breadcrumbs
          breadcrumbs={[
            {
              label: 'รายการข้อมูลบันทึกการเข้าร่วมโครงการ/กิจกรรม พน.10',
              href: '/management/pn10',
              active: false,
            },
            {
              label: '...',
              href: '',
              active: false,
            },
            {
              label: 'เอกสารแบบฟอร์มลงชื่อเข้าร่วมโครงการ/กิจกรรม (พน.10)',
              href: '#',
              active: true,
            },
          ]}
        />
        <div className="flex text-xl md:text-2xl">
          เอกสารแบบฟอร์มลงชื่อเข้าร่วมโครงการ/กิจกรรม (พน.10)
        </div>
      </div>
      <div className="flex justify-center">
        <div id="pdf-content" className={`${sarabun.className}`}>
          <Suspense fallback={<DocumentLoading />}>
            <PN10Paper data={pn10Data} />
          </Suspense>
        </div>
        <ToolBox
          downloadFileName="แบบฟอร์มลงชื่อเข้าร่วมโครงการ/กิจกรรม(พน.10)"
          rootElementId="pdf-content"
          isPaperMargin={false}
        />
      </div>
    </main>
  );
}
