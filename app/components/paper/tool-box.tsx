'use client';
import { notoThai } from '@/app/components/fonts';
import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import { jsPDF } from 'jspdf';

export default function ToolBox({
  rootElementId,
  downloadFileName,
}: {
  rootElementId: string;
  downloadFileName: string;
}) {
  const handlePrint = () => {
    window.print();
  };

  const getTargetElement = () => document.getElementById(rootElementId);

  const adjustScaleAndDownloadPdf = async () => {
    const originalTargetElement = getTargetElement();
    if (!originalTargetElement) {
      console.error(`Element with ID '${rootElementId}' not found.`);
      return;
    }

    const clonedTargetElement = originalTargetElement.cloneNode(
      true,
    ) as HTMLElement;

    const boxElement = clonedTargetElement.querySelector('#box');
    const boxAreaElement = clonedTargetElement.querySelector('#box-area');

    // Modify classes of the found elements
    if (boxElement) {
      boxElement.classList.remove('box', 'text-black');
      boxElement.classList.add('box-pdf', 'text-black');
    }

    if (boxAreaElement) {
      boxAreaElement.classList.remove('box-area');
      boxAreaElement.classList.add('box-area-pdf');
    }

    console.log(clonedTargetElement);

    originalTargetElement.parentNode?.replaceChild(
      clonedTargetElement,
      originalTargetElement,
    );

    try {
      await generatePDF(getTargetElement, {
        resolution: Resolution.MEDIUM,
        filename: `${downloadFileName}.pdf`,
        page: {
          margin: Margin.MEDIUM,
        },
      });

      clonedTargetElement.parentNode?.replaceChild(
        originalTargetElement,
        clonedTargetElement,
      );
    } catch (error) {
      console.error('Error generating PDF:', error);
      clonedTargetElement.parentNode?.replaceChild(
        originalTargetElement,
        clonedTargetElement,
      );
    }
  };

  return (
    <div className="fixed end-16 top-1/4 w-[150px] rounded-md border bg-white p-2 shadow-md shadow-blue-200 print:hidden">
      <h4 className={`${notoThai.className} text-center text-lg`}>เมนู</h4>
      <div className="mt-2 flex flex-col items-center justify-center gap-1 text-center">
        <button
          onClick={handlePrint}
          className={`${notoThai.className} flex h-12 w-full items-center justify-center gap-x-1 rounded-md bg-gray-200 px-4 text-base transition-colors hover:bg-gray-300`}
        >
          พิมพ์
          <PrintIcon />
        </button>
        <button
          onClick={adjustScaleAndDownloadPdf}
          className={`${notoThai.className} flex h-12 w-full items-center justify-center gap-x-1 rounded-md bg-gray-200 px-4 text-base transition-colors hover:bg-gray-300`}
        >
          ดาวน์โหลด
          <PictureAsPdfIcon />
        </button>
      </div>
    </div>
  );
}
