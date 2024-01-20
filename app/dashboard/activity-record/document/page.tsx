import Breadcrumbs from '@/app/components/breadcrumbs';
import { sarabun } from '@/app/components/fonts';
import PN10Paper from '@/app/components/paper/pn10-paper';
import ToolBox from '@/app/components/paper/tool-box';
import pn10Data from '@/app/model/pn10Data.json';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'แบบฟอร์มลงชื่อเข้าร่วมโครงการ/กิจกรรม (พน.10)',
};

export default async function Page() {
  return (
    <main>
      <div className="mb-6 print:hidden">
        <Breadcrumbs
          breadcrumbs={[
            {
              label: 'บันทึกการเข้าร่วมโครงการ/กิจกรรม',
              href: '/dashboard/activity-record',
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
          <PN10Paper data={pn10Data} />
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
