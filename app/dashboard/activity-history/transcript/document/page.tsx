import { sarabun } from '@/app/components/fonts';
import PN11Paper from '@/app/components/paper/pn11-paper';
import ToolBox from '@/app/components/paper/tool-box';
import pn11Data from '@/app/model/pn11Data.json';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'คำร้องขอหลักฐานการเข้าร่วมโครงการ (พน.11)',
};

export default function Page() {
  return (
    <div className="flex justify-center">
      <div id="pdf-content" className={`${sarabun.className}`}>
        <PN11Paper data={pn11Data} />
      </div>
      <ToolBox
        downloadFileName="คำร้องขอหลักฐานการเข้าร่วมโครงการ(พน.11)"
        rootElementId="pdf-content"
        isPaperMargin={true}
      />
    </div>
  );
}
