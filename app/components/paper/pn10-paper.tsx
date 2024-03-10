'use client';
import { PN10 } from '@/app/model/pn10';
import { convertISOStringToDateText } from '@/app/lib/services';
import { useEffect, useRef } from 'react';

const DotsPlaceholder = ({
  numOfDots,
  text,
  position,
}: {
  numOfDots: number;
  text?: any;
  position: keyof typeof positionClasses;
}) => {
  const positionClasses = {
    left: 'left-[18%]',
    center: 'left-1/2',
    right: 'left-3/4',
  };

  return (
    <div className="relative flex items-center">
      {Array.from({ length: numOfDots }).map((_, index) => (
        <span key={index}>.</span>
      ))}
      {text && (
        <span
          className={`absolute ${positionClasses[position]} lef left -translate-x-1/2 transform whitespace-nowrap pb-3`}
        >
          {text}
        </span>
      )}
    </div>
  );
};

export default function PN10Paper({ data }: { data: any }) {
  const paperRef = useRef<HTMLDivElement>(null);
  const theadRef = useRef<HTMLTableSectionElement>(null);
  const headerRef = useRef<HTMLHeadElement>(null);

  const createNewPage = (container: HTMLDivElement): HTMLDivElement => {
    let newSection = document.createElement('section');
    newSection.id = 'box';
    newSection.classList.add('box', 'text-black');

    let newBoxArea = document.createElement('div');
    newBoxArea.id = 'box-area';
    newBoxArea.classList.add('box-area');
    newSection.appendChild(newBoxArea);

    let newPageHeightDiv = document.createElement('div');
    newPageHeightDiv.id = 'page-height';
    newPageHeightDiv.classList.add('page-height');
    newBoxArea.appendChild(newPageHeightDiv);

    const clonedHeader = headerRef.current?.cloneNode(true) as HTMLHeadElement;
    newPageHeightDiv.appendChild(clonedHeader);
    container.appendChild(newSection);

    return newPageHeightDiv;
  };

  useEffect(() => {
    const checkPageBreak = () => {
      if (paperRef.current) {
        const headerPageHeight =
          headerRef.current?.getBoundingClientRect().height;
        const theadHeight = theadRef.current?.getBoundingClientRect().height;

        let currentPage = createNewPage(paperRef.current);
        let currentPageHeight = headerPageHeight! + theadHeight!;
        let currentPageNumber = 1;

        const section = paperRef.current.querySelector('.box');
        const boxAreaDiv = paperRef.current.querySelector('.box-area');
        const pageHeightDiv = paperRef.current.querySelector('.page-height');
        const rows = Array.from(paperRef.current.querySelectorAll('.part'));
        const table = document.createElement('table');
        table.className = 'w-full';

        const clonedThead = theadRef.current?.cloneNode(true) as HTMLElement;
        table.appendChild(clonedThead);
        currentPage.appendChild(table);

        const marginTop = 16;
        const marginBottom = 24;
        const pageHeight = 1123 - marginTop - marginBottom;

        rows.forEach((row, index) => {
          const rowHeight = row.getBoundingClientRect().height;

          console.log(`Row ${index + 1} Height:`, rowHeight);

          if (currentPageHeight + rowHeight > pageHeight) {
            console.log(
              `Creating new page. Total pages: ${currentPageNumber}, Current Page Height: ${currentPageHeight}`,
            );

            currentPage = createNewPage(paperRef.current!);
            currentPageHeight = headerPageHeight! + theadHeight!;
            currentPageNumber += 1;

            const newTable = document.createElement('table');
            newTable.className = 'w-full';
            const newThead = clonedThead.cloneNode(true) as HTMLElement;
            newTable.appendChild(newThead);
            currentPage.appendChild(newTable);
          }

          const clonedRow = row.cloneNode(true) as HTMLElement;
          clonedRow.setAttribute('key', String(index));
          const currentTable = currentPage.querySelector('table');
          currentTable?.appendChild(clonedRow);
          currentPageHeight += rowHeight;

          // Hide the original row
          row.remove();
        });

        section?.remove();
        boxAreaDiv?.remove();
        pageHeightDiv?.remove();
      }
    };

    checkPageBreak();
  }, []);

  return (
    <div ref={paperRef}>
      <section id="box" className="box text-black">
        <div id="box-area" className="box-area">
          <div id="page-height" className="page-height">
            <header id="header" className="mb-4" ref={headerRef}>
              <div className="py-2">
                <p className={`text-center text-base font-semibold leading-8`}>
                  แบบฟอร์มลงชื่อเข้าร่วมโครงการ/กิจกรรม (พน.10)
                </p>
              </div>
              <div className="flex flex-row justify-center px-2">
                <p className={`whitespace-nowrap`}>โครงการ/กิจกรรม</p>
                <DotsPlaceholder
                  numOfDots={90}
                  text={`${data.project_name}`}
                  position="left"
                />
                <p className={`whitespace-nowrap`}>จำนวน</p>
                <DotsPlaceholder
                  numOfDots={10}
                  text={data.project_hour}
                  position="center"
                />
                <p className="whitespace-nowrap">ชั่วโมง</p>
                <p className="whitespace-nowrap pl-1">วันที่</p>
                <DotsPlaceholder
                  numOfDots={29}
                  text={convertISOStringToDateText(data.created_at)}
                  position="center"
                />
              </div>
            </header>
            <article id="part">
              <div className="my-4">
                <table className="w-full">
                  <thead ref={theadRef}>
                    <tr className="bg-gray-300 text-center">
                      <td className="table-p w-[10%] border border-black">
                        ลำดับ
                      </td>
                      <td className="table-p w-[25%] border border-black">
                        รหัสนักศึกษา
                      </td>
                      <td className="table-p w-[45%] border border-black">
                        ชื่อ-นามสกุล
                      </td>
                      <td className="table-p w-[20%] border border-black">
                        หมายเหตุ
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {data.students.map((row: any, i: any) => (
                      <tr className="part bg-white" key={i}>
                        <td className="table-p border border-black text-center">
                          {i + 1}
                        </td>
                        <td className="table-p border border-black text-center">
                          {row.Std}
                        </td>
                        <td className="table-p border border-black text-left">
                          {row.Name}
                        </td>
                        <td className="table-p border border-black text-center"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
