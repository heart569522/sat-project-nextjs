import { sarabun } from '@/app/components/fonts';
import PN01Paper from '@/app/components/paper/pn01-paper';
import ToolBox from '@/app/components/paper/tool-box';
import pn01Data from '@/app/model/pn01Data.json';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'แบบฟอร์มเสนอโครงการ/กิจกรรม (พน.01)',
};

export default function Page() {
  return (
    <div className="flex justify-center">
      <div id="pdf-content" className={`${sarabun.className}`}>
        <PN01Paper data={pn01Data} />
      </div>
      <ToolBox
        downloadFileName="แบบฟอร์มเสนอโครงการ/กิจกรรม(พน.01)"
        rootElementId="pdf-content"
        isPaperMargin={false}
      />
    </div>
  );
}
