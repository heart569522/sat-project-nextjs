'use client';
import Image from 'next/image';
import CheckBoxOutlineBlankSharpIcon from '@mui/icons-material/CheckBoxOutlineBlankSharp';
import CheckBoxSharpIcon from '@mui/icons-material/CheckBoxSharp';
import { PaperPN01 } from '@/app/model/pn01';
import {
  convertStringToThaiBathText,
  convertToLocaleString,
} from '@/app/lib/services';
import { useEffect, useRef } from 'react';

export default function PN01Paper({ data }: { data: PaperPN01 }) {
  console.log(data);

  const paperRef = useRef<HTMLDivElement>(null);

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

    container.appendChild(newSection);

    return newPageHeightDiv;
  };

  useEffect(() => {
    const checkPageBreak = () => {
      if (paperRef.current) {
        const marginTop = 16;
        const marginBottom = 24;
        const pageHeight = 1123 - marginTop - marginBottom;

        let currentPage = createNewPage(paperRef.current);
        let currentPageHeight = 0;
        let currentPageNumber = 1;

        const section = paperRef.current.querySelector('.box');
        const boxAreaDiv = paperRef.current.querySelector('.box-area');
        const pageHeightDiv = paperRef.current.querySelector('.page-height');
        const articles = Array.from(paperRef.current.querySelectorAll('.part'));

        articles.forEach((article, index) => {
          const articleHeight = article.getBoundingClientRect().height;
          // console.log(`Article ${index + 1} height: ${articleHeight}`);

          if (currentPageHeight + articleHeight > pageHeight) {
            // console.log(`Creating new page. Total pages: ${currentPageNumber}`);

            currentPage = createNewPage(paperRef.current!);
            currentPageHeight = 0;
            currentPageNumber += 1;
          }

          const clonedArticle = article.cloneNode(true) as HTMLElement;
          currentPage.appendChild(clonedArticle);
          currentPageHeight += articleHeight;

          // Hide the original article
          article.remove();
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
            <article id="part" className="part">
              <table className="w-full">
                <tbody>
                  <tr className="">
                    <td className="w-[20%]">
                      <figure>
                        <Image
                          src="/payap-logo-blue.png"
                          alt="payap-logo"
                          width={416}
                          height={122}
                          className="mb-10 w-44"
                        />
                      </figure>
                    </td>
                    <td className="w-2/4 text-center">
                      <p className={`pt-8 text-base font-semibold leading-8`}>
                        แบบฟอร์มเสนอโครงการ/กิจกรรม (พน.01) <br />
                        สำนักพัฒนานักศึกษามหาวิทยาลัยพายัพ
                      </p>
                    </td>
                    <td className="w-[20%]">
                      <div className={`border border-black p-3 text-xs`}>
                        <p>รหัสโครงการ.......{data.project_code}........</p>
                        <br />
                        <div className="flex justify-start">
                          <p>วันที่..................</p>
                          <p>เวลา..............</p>
                        </div>
                        <br />
                        <p>ผู้รับ.......................................</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="text-center">
                ********************************************************************************************************
              </p>
            </article>
            <article id="part" className="part">
              <div className="flex gap-x-3 py-2 text-sm">
                <label className={`font-semibold`}>
                  1.&nbsp;&nbsp;&nbsp;ชื่อคณะ/วิทยาลัย/หน่วยงาน:
                </label>
                <p>{data.faculty}</p>
              </div>
            </article>
            <article id="part" className="part">
              <div className="flex gap-x-3 py-2 text-sm">
                <label className={`font-semibold`}>
                  2.&nbsp;&nbsp;&nbsp;ชื่อโครงการ:
                </label>
                <p>{data.project_name}</p>
              </div>
            </article>
            <article id="part" className="part">
              <div className="flex gap-x-3 py-2 text-sm">
                <label className={`font-semibold`}>
                  3.&nbsp;&nbsp;&nbsp;ผู้ดำเนินการ/ผู้รับผิดชอบโครงการ:
                </label>
                <p>{data.project_head}</p>
              </div>
              <div className="flex gap-x-3 py-2 pl-28 text-sm">
                <label className="font-semibold">หมายเลขโทรศัพท์:</label>
                <p>{data.project_head_phone}</p>
              </div>
              <div className="flex justify-center py-1">
                <table className="w-[95%]">
                  <thead>
                    <tr className="text-center text-sm">
                      <td className="table-p w-[10%] border border-black">
                        ลำดับที่
                      </td>
                      <td className="table-p w-[40%] border border-black">
                        ชื่อ – สกุล
                      </td>
                      <td className="table-p w-[25%] border border-black">
                        ตำแหน่งในโครงการ
                      </td>
                      <td className="table-p w-[25%] border border-black">
                        ภาระงาน (ภารกิจ/สัปดาห์)
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {data.project_responsible?.map((row) => (
                      <tr className="text-sm" key={row.id}>
                        <td className="table-p border border-black text-center">
                          {row.id}
                        </td>
                        <td className="table-p border border-black">
                          {row.firstname}&nbsp;{row.lastname}
                        </td>
                        <td className="table-p border border-black">
                          {row.position}
                        </td>
                        <td className="table-p border border-black text-center">
                          {row.work}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
            <article id="part" className="part">
              <div className="flex gap-x-3 py-2 text-sm">
                <label className={`font-semibold`}>
                  4.&nbsp;&nbsp;&nbsp;ความสอดคล้องกับยุทธศาสตร์ของคณะวิชา/มหาวิทยาลัยพายัพ
                </label>
              </div>
              <div className="pl-6">
                <div className="flex gap-x-1 py-2 text-sm">
                  <label className="whitespace-nowrap">
                    4.1&nbsp;&nbsp;ประเด็นยุทธศาสตร์ที่
                  </label>
                  <p className="whitespace-normal">{data.strategic_issue}</p>
                </div>
                <div className="flex gap-x-1 py-2 text-sm">
                  <label className="whitespace-nowrap">
                    4.2&nbsp;&nbsp;เป้าประสงค์ที่
                  </label>
                  <p className="whitespace-normal">{data.objective}</p>
                </div>
                <div className="flex gap-x-1 py-2 text-sm">
                  <label className="whitespace-nowrap">
                    4.3&nbsp;&nbsp;กลยุทธ์ระดับมหาวิทยาลัยที่
                  </label>
                  <p className="whitespace-normal">
                    {data.university_strategic}
                  </p>
                </div>
                <div className="flex gap-x-1 py-2 text-sm">
                  <label className="whitespace-nowrap">
                    4.4&nbsp;&nbsp;ตัวชี้วัดแผนกลยุทธ์ที่
                  </label>
                  <p className="whitespace-normal">{data.strategic_plan_kpi}</p>
                </div>
                <div className="flex gap-x-1 py-2 text-sm">
                  <label className="whitespace-nowrap">
                    4.5&nbsp;&nbsp;ตัวชี้วัดแผนปฏิบัติการที่
                  </label>
                  <p className="whitespace-normal">
                    {data.operational_plan_kpi}
                  </p>
                </div>
                <div className="flex gap-x-1 py-2 text-sm">
                  <label className="whitespace-nowrap">
                    4.6&nbsp;&nbsp;ตัวชี้วัดโครงการ
                  </label>
                  <p className="whitespace-normal">{data.project_kpi}</p>
                </div>
                <div className="flex gap-x-1 py-2 text-sm">
                  <label className="whitespace-nowrap">
                    4.7&nbsp;&nbsp;สถานะโครงการ
                  </label>
                  <p className="whitespace-normal">{data.project_status}</p>
                </div>
              </div>
            </article>
            <article id="part" className="part">
              <div className="flex gap-x-3 py-2 text-sm">
                <label className={`font-semibold`}>
                  5.&nbsp;&nbsp;&nbsp;ประเภทโครงการ
                </label>
              </div>
              <div className="pl-6">
                <div className="grid grid-cols-2">
                  <div className="flex gap-x-1 py-1 text-sm">
                    {data.project_type?.maintenance ? (
                      <CheckBoxSharpIcon />
                    ) : (
                      <CheckBoxOutlineBlankSharpIcon />
                    )}
                    <label className="whitespace-nowrap pl-3">
                      แผนทำนุบำรุงศิลปวัฒนธรรม
                    </label>
                  </div>
                  <div className="flex gap-x-1 py-1 text-sm">
                    {data.project_type?.academic_service ? (
                      <CheckBoxSharpIcon />
                    ) : (
                      <CheckBoxOutlineBlankSharpIcon />
                    )}
                    <label className="whitespace-nowrap pl-3">
                      แผนบริการวิชาการ
                    </label>
                  </div>
                  <div className="flex gap-x-1 py-1 text-sm">
                    {data.project_type?.knowledge_management ? (
                      <CheckBoxSharpIcon />
                    ) : (
                      <CheckBoxOutlineBlankSharpIcon />
                    )}
                    <label className="whitespace-nowrap pl-3">
                      แผนการจัดการความรู้
                    </label>
                  </div>
                  <div className="flex gap-x-1 py-1 text-sm">
                    {data.project_type?.research_promotion ? (
                      <CheckBoxSharpIcon />
                    ) : (
                      <CheckBoxOutlineBlankSharpIcon />
                    )}
                    <label className="whitespace-nowrap pl-3">
                      แผนการส่งเสริมงานวิจัย
                    </label>
                  </div>
                  <div className="flex gap-x-1 py-1 text-sm">
                    {data.project_type?.education_quality_assurance ? (
                      <CheckBoxSharpIcon />
                    ) : (
                      <CheckBoxOutlineBlankSharpIcon />
                    )}
                    <label className="whitespace-nowrap pl-3">
                      แผนการประกันคุณภาพการศึกษา
                    </label>
                  </div>
                  <div className="flex gap-x-1 py-1 text-sm">
                    {data.project_type?.personnel_development ? (
                      <CheckBoxSharpIcon />
                    ) : (
                      <CheckBoxOutlineBlankSharpIcon />
                    )}
                    <label className="whitespace-nowrap pl-3">
                      แผนพัฒนาบุคลากร
                    </label>
                  </div>
                  <div className="flex gap-x-1 py-1 text-sm">
                    {data.project_type?.risk_management ? (
                      <CheckBoxSharpIcon />
                    ) : (
                      <CheckBoxOutlineBlankSharpIcon />
                    )}
                    <label className="whitespace-nowrap pl-3">
                      แผนบริหารความเสี่ยง
                    </label>
                  </div>
                </div>

                <div className="flex gap-x-1 py-1 text-sm">
                  {data.project_type?.student_development ? (
                    <CheckBoxSharpIcon />
                  ) : (
                    <CheckBoxOutlineBlankSharpIcon />
                  )}
                  <label className="flex whitespace-nowrap pl-3">
                    แผนพัฒนานักศึกษาตามกรอบมาตรฐานคุณวุฒิ
                    และกิจกรรมพัฒนานักศึกษา
                    <p className="font-semibold">
                      &nbsp;(เลือกได้มากกว่า 1 ประเภท)
                    </p>
                  </label>
                </div>
                <div className="grid grid-cols-2 pl-9">
                  <div className="flex gap-x-1 py-1 text-sm">
                    {data.project_type?.moral_ethical ? (
                      <CheckBoxSharpIcon />
                    ) : (
                      <CheckBoxOutlineBlankSharpIcon />
                    )}
                    <label className="whitespace-nowrap pl-3">
                      ด้านคุณธรรม จริยธรรม
                    </label>
                  </div>
                  <div className="flex gap-x-1 py-1 text-sm">
                    {data.project_type?.academic_promotion ? (
                      <CheckBoxSharpIcon />
                    ) : (
                      <CheckBoxOutlineBlankSharpIcon />
                    )}
                    <label className="whitespace-nowrap pl-3">
                      กิจกรรมด้านวิชาการที่ส่งเสริมคุณลักษณะที่พึงประสงค์
                    </label>
                  </div>
                  <div className="flex gap-x-1 py-1 text-sm">
                    {data.project_type?.knowledge ? (
                      <CheckBoxSharpIcon />
                    ) : (
                      <CheckBoxOutlineBlankSharpIcon />
                    )}
                    <label className="whitespace-nowrap pl-3">
                      ด้านความรู้
                    </label>
                  </div>
                  <div className="flex gap-x-1 py-1 text-sm">
                    {data.project_type?.environment ? (
                      <CheckBoxSharpIcon />
                    ) : (
                      <CheckBoxOutlineBlankSharpIcon />
                    )}
                    <label className="whitespace-nowrap pl-3">
                      กิจกรรมบำเพ็ญประโยชน์หรือรักษาสิ่งแวดล้อม
                    </label>
                  </div>
                  <div className="flex gap-x-1 py-1 text-sm">
                    {data.project_type?.intellectual_skill ? (
                      <CheckBoxSharpIcon />
                    ) : (
                      <CheckBoxOutlineBlankSharpIcon />
                    )}
                    <label className="whitespace-nowrap pl-3">
                      ด้านทักษะทางปัญญา
                    </label>
                  </div>
                  <div className="flex gap-x-1 py-1 text-sm">
                    {data.project_type?.sport ? (
                      <CheckBoxSharpIcon />
                    ) : (
                      <CheckBoxOutlineBlankSharpIcon />
                    )}
                    <label className="whitespace-nowrap pl-3">
                      กิจกรรมกีฬา และการส่งเสริมสุขภาพ
                    </label>
                  </div>
                  <div className="flex gap-x-1 py-1 text-sm">
                    {data.project_type
                      ?.knowledge_analysis_communication_technology ? (
                      <CheckBoxSharpIcon />
                    ) : (
                      <CheckBoxOutlineBlankSharpIcon />
                    )}
                    <label className="whitespace-normal pl-3">
                      ด้านทักษะด้านความสัมพันธ์ระหว่างบุคคลและความรับผิดชอบ
                    </label>
                  </div>
                  <div className="flex gap-x-1 py-1 text-sm">
                    {data.project_type?.art_culture_development ? (
                      <CheckBoxSharpIcon />
                    ) : (
                      <CheckBoxOutlineBlankSharpIcon />
                    )}
                    <label className="whitespace-nowrap pl-3">
                      กิจกรรมส่งเสริมศิลปะและวัฒนธรรม
                    </label>
                  </div>
                  <div className="flex gap-x-1 py-1 text-sm">
                    {data.project_type
                      ?.numerical_analysis_communication_technology ? (
                      <CheckBoxSharpIcon />
                    ) : (
                      <CheckBoxOutlineBlankSharpIcon />
                    )}
                    <label className="whitespace-normal pl-3">
                      ด้านทักษะการวิเคราะห์เชิงตัวเลข การสื่อสาร
                      และการใช้เทคโนโลยี
                    </label>
                  </div>
                  <div className="flex gap-x-1 py-1 text-sm">
                    {data.project_type?.moral_ethical_development ? (
                      <CheckBoxSharpIcon />
                    ) : (
                      <CheckBoxOutlineBlankSharpIcon />
                    )}
                    <label className="whitespace-nowrap pl-3">
                      กิจกรรมเสริมสร้างคุณธรรม จริยธรรม
                    </label>
                  </div>
                  <div className="flex gap-x-1 py-1 text-sm">
                    {data.project_type?.sub_other ? (
                      <CheckBoxSharpIcon />
                    ) : (
                      <CheckBoxOutlineBlankSharpIcon />
                    )}
                    <label className="whitespace-nowrap pl-3">
                      อื่นๆ (โปรดระบุ)
                    </label>
                    <p className="whitespace-normal">
                      {data.project_type?.sub_other_detail}
                    </p>
                  </div>
                  <div className="flex gap-x-1 py-1 text-sm">
                    {data.project_type?.leadership_development ? (
                      <CheckBoxSharpIcon />
                    ) : (
                      <CheckBoxOutlineBlankSharpIcon />
                    )}
                    <label className="whitespace-nowrap pl-3">
                      กิจกรรมส่งเสริมพัฒนาทักษะชีวิตความเป็นผู้นำ
                    </label>
                  </div>
                </div>
                <div className="flex gap-x-1 py-1 text-sm">
                  {data.project_type?.other ? (
                    <CheckBoxSharpIcon />
                  ) : (
                    <CheckBoxOutlineBlankSharpIcon />
                  )}
                  <label className="whitespace-nowrap pl-3">
                    อื่นๆ (โปรดระบุ)
                  </label>
                  <p className="whitespace-normal">
                    {data.project_type?.other_detail}
                  </p>
                </div>
              </div>
            </article>
            <article id="part" className="part">
              <div className="flex gap-x-3 py-2 text-sm">
                <label className={`font-semibold`}>
                  6.&nbsp;&nbsp;&nbsp;การตอบสนองต่อคุณลักษณะของบัณฑิตที่พึงประสงค์/อัตลักษณ์ของมหาวิทยาลัยพายัพ
                </label>
              </div>
              <div className="px-10">
                <div className="grid grid-cols-4">
                  <div className="flex gap-x-1 py-1 text-sm">
                    {data.university_identity?.moral ? (
                      <CheckBoxSharpIcon />
                    ) : (
                      <CheckBoxOutlineBlankSharpIcon />
                    )}
                    <label className="whitespace-nowrap pl-1">
                      คุณธรรมนำใจ
                    </label>
                  </div>
                  <div className="flex gap-x-1 py-1 text-sm">
                    {data.university_identity?.serve ? (
                      <CheckBoxSharpIcon />
                    ) : (
                      <CheckBoxOutlineBlankSharpIcon />
                    )}
                    <label className="whitespace-nowrap pl-1">
                      รับใช้สังคม
                    </label>
                  </div>
                  <div className="flex gap-x-1 py-1 text-sm">
                    {data.university_identity?.academic ? (
                      <CheckBoxSharpIcon />
                    ) : (
                      <CheckBoxOutlineBlankSharpIcon />
                    )}
                    <label className="whitespace-nowrap pl-1">
                      วิชาการก้าวหน้า
                    </label>
                  </div>
                  <div className="flex gap-x-1 py-1 text-sm">
                    {data.university_identity?.develop ? (
                      <CheckBoxSharpIcon />
                    ) : (
                      <CheckBoxOutlineBlankSharpIcon />
                    )}
                    <label className="whitespace-nowrap pl-1">
                      พัฒนาสู่สากล
                    </label>
                  </div>
                </div>
              </div>
            </article>
            <article id="part" className="part">
              <div className="flex gap-x-3 py-2 text-sm">
                <label className={`font-semibold`}>
                  7.&nbsp;&nbsp;&nbsp;หลักการและเหตุผล
                </label>
              </div>
              <div className="pl-6">
                <div className="flex gap-x-3 py-1 text-sm">
                  <p className="whitespace-normal">{data.principle_reason}</p>
                </div>
              </div>
            </article>
            <article id="part" className="part">
              <div className="flex gap-x-3 py-2 text-sm">
                <label className={`font-semibold`}>
                  8.&nbsp;&nbsp;&nbsp;วัตถุประสงค์ ตัวชี้วัด
                  ค่าเป้าหมาย/เกณฑ์ความสำเร็จ และ
                  เครื่องมือ/วิธีการเก็บรวบรวมข้อมูลตามตัวชี้วัด
                </label>
              </div>
              <div className="flex justify-center py-1">
                <table className="w-[95%]">
                  <thead>
                    <tr className="text-center text-sm">
                      <td className="table-p w-[25%] border border-black">
                        วัตถุประสงค์โครงการ
                      </td>
                      <td className="table-p w-[25%] border border-black">
                        ตัวชี้วัด
                      </td>
                      <td className="table-p w-[25%] border border-black">
                        เป้าหมาย <br /> (เกณฑ์ความสำเร็จ)
                      </td>
                      <td className="table-p w-[25%] border border-black">
                        เครื่องมือ/วิธีการเก็บรวบรวมข้อมูลตามตัวชี้วัด
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {data.objective_indicator_value_tool?.map((row) => (
                      <tr className="text-sm" key={row.id}>
                        <td className="table-p border border-black">
                          {row.objective}
                        </td>
                        <td className="table-p border border-black">
                          {row.indicator}
                        </td>
                        <td className="table-p border border-black">
                          {row.tool}
                        </td>
                        <td className="table-p border border-black">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
            <article id="part" className="part">
              <div className="flex gap-x-3 py-2 text-sm">
                <label className={`font-semibold`}>
                  9.&nbsp;&nbsp;&nbsp;ประโยชน์ที่คาดว่าจะได้รับ
                </label>
              </div>
              <div className="pl-6">
                {data.expected_result?.map((row) => (
                  <div className="flex gap-x-1 py-1 text-sm" key={row.id}>
                    <label className="whitespace-nowrap">
                      9.{row.id}&nbsp;&nbsp;
                    </label>
                    <p className="whitespace-normal">{row.expected_result}</p>
                  </div>
                ))}
              </div>
            </article>
            <article id="part" className="part">
              <div className="flex gap-x-3 py-2 text-sm">
                <label className={`font-semibold`}>
                  10.&nbsp;&nbsp;&nbsp;วิธีดำเนินงานและระยะเวลาดำเนินโครงการ
                </label>
              </div>
              <div className="pl-6">
                {data.operation_duration?.map((row) => (
                  <div className="flex gap-x-1 py-1 text-sm" key={row.id}>
                    <label className="whitespace-nowrap">
                      10.{row.id}&nbsp;&nbsp;
                    </label>
                    <p className="whitespace-normal">
                      {row.operation_duration}
                    </p>
                  </div>
                ))}
              </div>
            </article>
            <article id="part" className="part">
              <div className="flex gap-x-3 py-2 text-sm">
                <label className={`font-semibold`}>
                  11.&nbsp;&nbsp;&nbsp;สถานที่จัดโครงการและกำหนดการ
                </label>
              </div>
              <div className="pl-6">
                <div className="flex gap-x-1 py-1 text-sm">
                  <label className="whitespace-nowrap">
                    11.1&nbsp;&nbsp;สถานที่จัดโครงการ
                  </label>
                  <p className="whitespace-normal">{data.project_location}</p>
                </div>
                <div className="flex gap-x-1 py-1 text-sm">
                  <label className="whitespace-nowrap">
                    11.2&nbsp;&nbsp;วัน/เวลา ที่จัดโครงการ
                  </label>
                  <p className="whitespace-normal">{data.project_datetime}</p>
                </div>
                <div className="flex gap-x-1 py-1 text-sm">
                  <label className="whitespace-nowrap">
                    11.3&nbsp;&nbsp;กำหนดการ (โดยละเอียด)
                  </label>
                </div>
                <div className="flex justify-center py-1">
                  <table className="w-[95%]">
                    <thead>
                      <tr className="text-center text-sm">
                        <td className="table-p w-[20%] border border-black">
                          วันที่
                        </td>
                        <td className="table-p w-[20%] border border-black">
                          เวลา
                        </td>
                        <td className="table-p w-[60%] border border-black">
                          รายการกิจกรรม
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {data.project_schedule?.map((row) => (
                        <tr className="text-sm" key={row.id}>
                          <td className="table-p border border-black text-center">
                            {row.date}
                          </td>
                          <td className="table-p border border-black text-center">
                            {row.time}
                          </td>
                          <td className="table-p border border-black">
                            {row.detail}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </article>
            <article id="part" className="part">
              <div className="flex gap-x-3 py-2 text-sm">
                <label className={`font-semibold`}>
                  12.&nbsp;&nbsp;&nbsp;วิทยากร (ถ้ามี)
                </label>
                <p className="whitespace-normal">{data.lecturer}</p>
              </div>
            </article>
            <article id="part" className="part">
              <div className="flex gap-x-3 py-2 text-sm">
                <label className={`font-semibold`}>
                  13.&nbsp;&nbsp;&nbsp;ผู้เข้าร่วมโครงการ/กลุ่มเป้าหมาย
                </label>
                <p className="whitespace-normal">
                  (รวมจำนวน {convertToLocaleString(data.target_total)} คน)
                </p>
              </div>
              <div className="flex justify-center py-1">
                <table className="w-[95%]">
                  <tbody>
                    {data.target?.map((row) => (
                      <tr className="text-sm" key={row.id}>
                        <td className="w-[8%] px-2 py-1">13.{row.id}</td>
                        <td className="w-[62%] px-2 py-1">{row.detail}</td>
                        <td className="w-[10%] px-2 py-1 text-center">จำนวน</td>
                        <td className="w-[12%] px-2 py-1 text-center">
                          {convertToLocaleString(row.count)}
                        </td>
                        <td className="w-[8%]px-2 py-1 text-center">คน</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
            <article id="part" className="part">
              <div className="flex gap-x-3 py-2 text-sm">
                <label className={`font-semibold`}>
                  14.&nbsp;&nbsp;&nbsp;การปรับปรุงจากข้อเสนอแนะของโครงการที่ผ่านมา/โครงการที่มีลักษณะใกล้เคียงกัน
                </label>
              </div>
              <div className="pl-6">
                <div className="flex gap-x-3 py-1 text-sm">
                  <p className="whitespace-normal">{data.improvement}</p>
                </div>
              </div>
            </article>
            <article id="part" className="part">
              <div className="flex gap-x-3 py-2 text-sm">
                <label className={`font-semibold`}>
                  15.&nbsp;&nbsp;&nbsp;งบประมาณ
                </label>
              </div>
              <div className="pl-6">
                <div className="flex gap-x-1 py-2 text-sm">
                  <label className="whitespace-nowrap">
                    15.1&nbsp;&nbsp;งบประมาณรายรับ
                  </label>
                </div>
                <div className="flex justify-center py-1">
                  <table className="w-[95%]">
                    <thead>
                      <tr className="text-center text-sm">
                        <td className="table-p w-[10%] border border-black">
                          ลำดับที่
                        </td>
                        <td className="table-p w-[45%] border border-black">
                          รายการ
                        </td>
                        <td className="table-p w-[15%] border border-black">
                          จำนวนเงิน
                        </td>
                        <td className="table-p w-[30%] border border-black">
                          แหล่งที่มาของรายรับ
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {data.budget_income?.map((row) => (
                        <tr className="text-sm" key={row.id}>
                          <td className="table-p border border-black text-center">
                            {row.id}
                          </td>
                          <td className="table-p border border-black">
                            {row.detail}
                          </td>
                          <td className="table-p border border-black text-center">
                            {convertToLocaleString(row.amount)}
                          </td>
                          <td className="table-p border border-black">
                            {row.source}
                          </td>
                        </tr>
                      ))}
                      <tr className="text-sm">
                        <td colSpan={2} className="table-p text-right">
                          รวมงบประมาณรายรับ
                        </td>
                        <td className="table-p border border-black text-center">
                          {data.budget_income_total}
                        </td>
                        <td className="table-p text-left">บาท</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex gap-x-1 py-2 text-sm">
                  <label className="whitespace-nowrap">
                    15.2&nbsp;&nbsp;งบประมาณรายจ่าย
                  </label>
                </div>
                <div className="flex justify-center py-1">
                  <table className="w-[95%]">
                    <thead>
                      <tr className="text-center text-sm">
                        <td className="table-p w-[10%] border border-black">
                          ลำดับที่
                        </td>
                        <td className="table-p w-[45%] border border-black">
                          รายการ
                        </td>
                        <td className="table-p w-[15%] border border-black">
                          จำนวนเงิน
                        </td>
                        <td className="table-p w-[30%] border border-black">
                          หมายเหตุ
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {data.budget_expense?.map((row) => (
                        <tr className="text-sm" key={row.id}>
                          <td className="table-p border border-black text-center">
                            {row.id}
                          </td>
                          <td className="table-p border border-black">
                            {row.detail}
                          </td>
                          <td className="table-p border border-black text-center">
                            {convertToLocaleString(row.amount)}
                          </td>
                          <td className="table-p border border-black">
                            {row.note}
                          </td>
                        </tr>
                      ))}
                      <tr className="text-sm">
                        <td colSpan={2} className="table-p text-right">
                          รวมงบประมาณรายจ่าย
                        </td>
                        <td className="table-p border border-black text-center">
                          {data.budget_expense_total}
                        </td>
                        <td className="table-p text-left">บาท</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </article>
            <article id="part" className="part">
              <div className="flex gap-x-3 py-1 text-sm">
                <p className="pl-10 pt-4">
                  ในการนี้จึงเรียนมาเพื่อขออนุมัติจัดโครงการ{data.project_name}
                  &nbsp; และขออนุมัติงบประมาณเพื่อดำเนินโครงการจำนวน{' '}
                  {data.budget_expense_total} บาท (
                  {convertStringToThaiBathText(data.budget_expense_total)})
                </p>
              </div>
              <div className="mt-10 pl-6 text-center text-sm">
                <p className="py-1">
                  ลงชื่อ............................................................ผู้เสนอโครงการ/กิจกรรม
                </p>
                <p className="py-1 pr-[105px]">
                  (.........................................................)
                </p>
                <p className="py-1 pr-[105px]">
                  ............/.............................../................
                </p>
              </div>
            </article>
            <article id="part" className="part">
              <Image
                src="/pn01-lastpage.png"
                width={1654}
                height={2339}
                className="h-fulls w-full"
                alt="last-page"
              />
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
