import { sarabun } from '@/app/components/fonts';
import PN01Paper from '@/app/components/paper/pn01-paper';
import ToolBox from '@/app/components/paper/tool-box';
import formData from '@/app/model/formData.json';
import './style.css';
import { Box } from '@mui/material';

export default function page() {
  return (
    <div className='flex justify-center'>
      <div id="pdf-content" className={`${sarabun.className} w-[794px]`}>
        <PN01Paper data={formData} />
      </div>
      <ToolBox
        downloadFileName="แบบฟอร์มเสนอโครงการ/กิจกรรม(พน.01)"
        rootElementId="pdf-content"
      />
    </div>
  );
}
