import { sarabun } from '@/app/components/fonts';
import { DocumentLoading } from '@/app/components/loading-screen';
import PN11Paper from '@/app/components/paper/pn11-paper';
import ToolBox from '@/app/components/paper/tool-box';
import { getDataById } from '@/app/lib/api-service';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'คำร้องขอหลักฐานการเข้าร่วมโครงการ (พน.11)',
};

export default async function Page(context: { params: { id: string } },) {
  const { id } = context.params;
  const pn11Data = await getDataById('activity-transcript', id);
  
  return (
    <div className="flex justify-center">
      <div id="pdf-content" className={`${sarabun.className}`}>
        <Suspense fallback={<DocumentLoading />}>
          <PN11Paper docData={pn11Data} />
        </Suspense>
      </div>
      <ToolBox
        downloadFileName="คำร้องขอหลักฐานการเข้าร่วมโครงการ(พน.11)"
        rootElementId="pdf-content"
        isPaperMargin={true}
      />
    </div>
  );
}
