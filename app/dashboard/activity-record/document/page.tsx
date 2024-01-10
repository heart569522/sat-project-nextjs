import { sarabun } from '@/app/components/fonts';
import PN10Paper from '@/app/components/paper/pn10-paper';
import ToolBox from '@/app/components/paper/tool-box';
import pn10Data from '@/app/model/pn10Data.json';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'แบบฟอร์มลงชื่อเข้าร่วมโครงการ/กิจกรรม (พน.10)',
};

export default function Page() {
  return (
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
  );
}
