'use client';
import Image from 'next/image';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { useEffect, useRef } from 'react';

export default function PN01Paper() {
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const paragraph = paragraphRef.current;

    if (paragraph) {
      const text = `ในการนี้จึงเรียนมาเพื่อขออนุมัติจัดโครงการ...และขออนุมัติงบประมาณเพื่อดำเนินโครงการจำนวน...บาท (...บาทถ้วน)`;
      const lines = text.split('\n');
      if (lines.length > 1) {
        paragraph.innerHTML = lines
          .map((line, index) => {
            const isFirstLine = index === 0;
            const lineClass = isFirstLine
              ? 'whitespace-normal pl-10'
              : 'whitespace-normal pl-0';
            return `<span class="${lineClass}">${line}</span>`;
          })
          .join('<br>');
      } else {
        paragraph.innerHTML = `<span class="whitespace-normal pl-10">${text}</span>`;
      }
    }
  }, []);

  return (
    <section className={`box text-black`}>
      <div className="box-area">
        <div className="relative">
          <article>
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
                      <p>เลขที่รับ 66001</p>
                      <br />
                      <div className="flex justify-between">
                        <p>วันที่ 15/12/2566</p>
                        <p>เวลา 17.30</p>
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
          <article>
            <div className="flex gap-x-3 py-2 text-sm">
              <label className={`font-semibold`}>
                1.&nbsp;&nbsp;&nbsp;ชื่อคณะ/วิทยาลัย/หน่วยงาน:
              </label>
              <p>แพนนนนน</p>
            </div>
          </article>
          <article>
            <div className="flex gap-x-3 py-2 text-sm">
              <label className={`font-semibold`}>
                2.&nbsp;&nbsp;&nbsp;ชื่อโครงการ:
              </label>
              <p>ยานนนนน</p>
            </div>
          </article>
          <article>
            <div className="flex gap-x-3 py-2 text-sm">
              <label className={`font-semibold`}>
                3.&nbsp;&nbsp;&nbsp;ผู้ดำเนินการ/ผู้รับผิดชอบโครงการ:
              </label>
              <p>หาดเกก</p>
            </div>
            <div className="flex gap-x-3 py-2 pl-28 text-sm">
              <label className="font-semibold">หมายเลขโทรศัพท์:</label>
              <p>0885469875</p>
            </div>
            <div className="mb-1 flex justify-center">
              <table className="w-[95%] border border-black">
                <thead>
                  <tr className="text-center text-sm">
                    <td className="w-[10%] border border-black p-1">
                      ลำดับที่
                    </td>
                    <td className="w-[40%] border border-black p-1">
                      ชื่อ – สกุล
                    </td>
                    <td className="w-[25%] border border-black p-1">
                      ตำแหน่งในโครงการ
                    </td>
                    <td className="w-[25%] border border-black p-1">
                      ภาระงาน (ภารกิจ/สัปดาห์)
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-sm">
                    <td className="border border-black px-2 py-1 text-center">
                      1
                    </td>
                    <td className="border border-black px-2 py-1">ยาน ดาส</td>
                    <td className="border border-black px-2 py-1">นาา</td>
                    <td className="border border-black px-2 py-1  text-center">
                      3
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
          <article>
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
                <p className="whitespace-normal">
                  1 สร้างบัณฑิตที่มีคุณภาพตามปรัชญาการศึกษา
                  และมีความเป็นเลิศทางวิชาการ วิชาชีพ และวิชาชีวิต
                </p>
              </div>
              <div className="flex gap-x-1 py-2 text-sm">
                <label className="whitespace-nowrap">
                  4.2&nbsp;&nbsp;เป้าประสงค์ที่
                </label>
                <p className="whitespace-normal">
                  1.1
                  พัฒนาการเรียนการสอนและพัฒนานักศึกษาโดยจัดการศึกษาที่ยึดมั่นใน
                  “สัจจะ-บริการ” เพื่อสร้างสรรค์คนดี คนเก่ง และมีคุณธรรม
                  นำไปพัฒนารับใช้สังคม นำไปสู่ความเป็นเลิศทางวิชาการ
                  ความเป็นเลิศทางวิชาชีพ และ ความเป็นเลิศทางวิชาชีวิต
                </p>
              </div>
              <div className="flex gap-x-1 py-2 text-sm">
                <label className="whitespace-nowrap">
                  4.3&nbsp;&nbsp;กลยุทธ์ระดับมหาวิทยาลัยที่
                </label>
                <p className="whitespace-normal">
                  3.1.1 ส่งเสริมการผลิตผลงานวิชาการ วิจัย นวัตกรรม งานสร้างสรรค์
                  และแนวปฏิบัติที่ดี ที่สอดคล้องกับความต้องการของชุมชน สังคม
                  และก่อให้เกิดการเปลี่ยนแปลงในการพัฒนาชุมชนและสังคมตามเป้าหมายการพัฒนาที่ยั่งยืน
                </p>
              </div>
              <div className="flex gap-x-1 py-2 text-sm">
                <label className="whitespace-nowrap">
                  4.4&nbsp;&nbsp;ตัวชี้วัดแผนกลยุทธ์ที่
                </label>
                <p className="whitespace-normal">
                  7 จำนวนเงินทุน/มูลค่าการบูรณาการงานวิจัย การบริการวิชาการ
                  การทำนุบำรุงศิลปะและ/หรือวัฒนธรรมเพื่อเพิ่มมูลค่าเชิงพาณิชย์ =
                  10 ล้าน
                </p>
              </div>
              <div className="flex gap-x-1 py-2 text-sm">
                <label className="whitespace-nowrap">
                  4.5&nbsp;&nbsp;ตัวชี้วัดแผนปฏิบัติการที่
                </label>
                <p className="whitespace-normal">
                  (32)
                  ร้อยละความสำเร็จของกิจกรรมหรือโครงการที่ส่งเสริมการเรียนรู้ตลอดชีวิต
                  ความเป็นนานาชาติ การเรียนรู้ข้ามวัฒนธรรม และพหุวัฒนธรรม = 80
                </p>
              </div>
              <div className="flex gap-x-1 py-2 text-sm">
                <label className="whitespace-nowrap">
                  4.6&nbsp;&nbsp;ตัวชี้วัดโครงการ
                </label>
                <p className="whitespace-normal">ไม่รุ้</p>
              </div>
              <div className="flex gap-x-1 py-2 text-sm">
                <label className="whitespace-nowrap">
                  4.7&nbsp;&nbsp;สถานะโครงการ
                </label>
                <p className="whitespace-normal">
                  โครงการที่ดำเนินการเองในแผนปฏิบัติการของหน่วยงาน/คณะวิชา
                </p>
              </div>
            </div>
          </article>
          <article>
            <div className="flex gap-x-3 py-2 text-sm">
              <label className={`font-semibold`}>
                5.&nbsp;&nbsp;&nbsp;ประเภทโครงการ
              </label>
            </div>
            <div className="pl-6">
              <div className="grid grid-cols-2">
                <div className="flex gap-x-1 py-1 text-sm">
                  <CheckBoxOutlineBlankOutlinedIcon />
                  {/* <CheckBoxOutlinedIcon /> */}
                  <label className="whitespace-nowrap pl-3">
                    แผนทำนุบำรุงศิลปวัฒนธรรม
                  </label>
                </div>
                <div className="flex gap-x-1 py-1 text-sm">
                  <CheckBoxOutlineBlankOutlinedIcon />
                  {/* <CheckBoxOutlinedIcon /> */}
                  <label className="whitespace-nowrap pl-3">
                    แผนบริการวิชาการ
                  </label>
                </div>
                <div className="flex gap-x-1 py-1 text-sm">
                  <CheckBoxOutlineBlankOutlinedIcon />
                  {/* <CheckBoxOutlinedIcon /> */}
                  <label className="whitespace-nowrap pl-3">
                    แผนการจัดการความรู้
                  </label>
                </div>
                <div className="flex gap-x-1 py-1 text-sm">
                  <CheckBoxOutlineBlankOutlinedIcon />
                  {/* <CheckBoxOutlinedIcon /> */}
                  <label className="whitespace-nowrap pl-3">
                    แผนการส่งเสริมงานวิจัย
                  </label>
                </div>
                <div className="flex gap-x-1 py-1 text-sm">
                  <CheckBoxOutlineBlankOutlinedIcon />
                  {/* <CheckBoxOutlinedIcon /> */}
                  <label className="whitespace-nowrap pl-3">
                    แผนการประกันคุณภาพการศึกษา
                  </label>
                </div>
                <div className="flex gap-x-1 py-1 text-sm">
                  <CheckBoxOutlineBlankOutlinedIcon />
                  {/* <CheckBoxOutlinedIcon /> */}
                  <label className="whitespace-nowrap pl-3">
                    แผนพัฒนาบุคลากร
                  </label>
                </div>
                <div className="flex gap-x-1 py-1 text-sm">
                  <CheckBoxOutlineBlankOutlinedIcon />
                  {/* <CheckBoxOutlinedIcon /> */}
                  <label className="whitespace-nowrap pl-3">
                    แผนบริหารความเสี่ยง
                  </label>
                </div>
              </div>

              <div className="flex gap-x-1 py-1 text-sm">
                {/* <CheckBoxOutlineBlankOutlinedIcon /> */}
                <CheckBoxOutlinedIcon />
                <label className="flex whitespace-nowrap pl-3">
                  แผนพัฒนานักศึกษาตามกรอบมาตรฐานคุณวุฒิ และกิจกรรมพัฒนานักศึกษา
                  <p className="font-semibold">
                    &nbsp;(เลือกได้มากกว่า 1 ประเภท)
                  </p>
                </label>
              </div>
              <div className="grid grid-cols-2 pl-9">
                <div className="flex gap-x-1 py-1 text-sm">
                  <CheckBoxOutlineBlankOutlinedIcon />
                  {/* <CheckBoxOutlinedIcon /> */}
                  <label className="whitespace-nowrap pl-3">
                    ด้านคุณธรรม จริยธรรม
                  </label>
                </div>
                <div className="flex gap-x-1 py-1 text-sm">
                  <CheckBoxOutlineBlankOutlinedIcon />
                  {/* <CheckBoxOutlinedIcon /> */}
                  <label className="whitespace-nowrap pl-3">
                    กิจกรรมด้านวิชาการที่ส่งเสริมคุณลักษณะที่พึงประสงค์
                  </label>
                </div>
                <div className="flex gap-x-1 py-1 text-sm">
                  <CheckBoxOutlineBlankOutlinedIcon />
                  {/* <CheckBoxOutlinedIcon /> */}
                  <label className="whitespace-nowrap pl-3">ด้านความรู้</label>
                </div>
                <div className="flex gap-x-1 py-1 text-sm">
                  <CheckBoxOutlineBlankOutlinedIcon />
                  {/* <CheckBoxOutlinedIcon /> */}
                  <label className="whitespace-nowrap pl-3">
                    กิจกรรมบำเพ็ญประโยชน์หรือรักษาสิ่งแวดล้อม
                  </label>
                </div>
                <div className="flex gap-x-1 py-1 text-sm">
                  <CheckBoxOutlineBlankOutlinedIcon />
                  {/* <CheckBoxOutlinedIcon /> */}
                  <label className="whitespace-nowrap pl-3">
                    ด้านทักษะทางปัญญา
                  </label>
                </div>
                <div className="flex gap-x-1 py-1 text-sm">
                  <CheckBoxOutlineBlankOutlinedIcon />
                  {/* <CheckBoxOutlinedIcon /> */}
                  <label className="whitespace-nowrap pl-3">
                    กิจกรรมกีฬา และการส่งเสริมสุขภาพ
                  </label>
                </div>
                <div className="flex gap-x-1 py-1 text-sm">
                  <CheckBoxOutlineBlankOutlinedIcon />
                  {/* <CheckBoxOutlinedIcon /> */}
                  <label className="whitespace-normal pl-3">
                    ด้านทักษะด้านความสัมพันธ์ระหว่างบุคคลและความรับผิดชอบ
                  </label>
                </div>
                <div className="flex gap-x-1 py-1 text-sm">
                  <CheckBoxOutlineBlankOutlinedIcon />
                  {/* <CheckBoxOutlinedIcon /> */}
                  <label className="whitespace-nowrap pl-3">
                    กิจกรรมส่งเสริมศิลปะและวัฒนธรรม
                  </label>
                </div>
                <div className="flex gap-x-1 py-1 text-sm">
                  <CheckBoxOutlineBlankOutlinedIcon />
                  {/* <CheckBoxOutlinedIcon /> */}
                  <label className="whitespace-normal pl-3">
                    ด้านทักษะการวิเคราะห์เชิงตัวเลข การสื่อสาร
                    และการใช้เทคโนโลยี
                  </label>
                </div>
                <div className="flex gap-x-1 py-1 text-sm">
                  <CheckBoxOutlineBlankOutlinedIcon />
                  {/* <CheckBoxOutlinedIcon /> */}
                  <label className="whitespace-nowrap pl-3">
                    กิจกรรมเสริมสร้างคุณธรรม จริยธรรม
                  </label>
                </div>
                <div className="flex gap-x-1 py-1 text-sm">
                  <CheckBoxOutlineBlankOutlinedIcon />
                  <label className="whitespace-nowrap pl-3">
                    อื่นๆ (โปรดระบุ)
                  </label>
                  <p className="whitespace-normal">...</p>
                </div>
                <div className="flex gap-x-1 py-1 text-sm">
                  {/* <CheckBoxOutlineBlankOutlinedIcon /> */}
                  <CheckBoxOutlinedIcon />
                  <label className="whitespace-nowrap pl-3">
                    กิจกรรมส่งเสริมพัฒนาทักษะชีวิตความเป็นผู้นำ
                  </label>
                </div>
              </div>
              <div className="flex gap-x-1 py-1 text-sm">
                <CheckBoxOutlineBlankOutlinedIcon />
                <label className="whitespace-nowrap pl-3">
                  อื่นๆ (โปรดระบุ)
                </label>
                <p className="whitespace-normal">...</p>
              </div>
            </div>
          </article>
          <article>
            <div className="flex gap-x-3 py-2 text-sm">
              <label className={`font-semibold`}>
                6.&nbsp;&nbsp;&nbsp;การตอบสนองต่อคุณลักษณะของบัณฑิตที่พึงประสงค์/อัตลักษณ์ของมหาวิทยาลัยพายัพ
              </label>
            </div>
            <div className="px-10">
              <div className="grid grid-cols-4">
                <div className="flex gap-x-1 py-1 text-sm">
                  <CheckBoxOutlineBlankOutlinedIcon />
                  {/* <CheckBoxOutlinedIcon /> */}
                  <label className="whitespace-nowrap pl-1">คุณธรรมนำใจ</label>
                </div>
                <div className="flex gap-x-1 py-1 text-sm">
                  <CheckBoxOutlineBlankOutlinedIcon />
                  {/* <CheckBoxOutlinedIcon /> */}
                  <label className="whitespace-nowrap pl-1">รับใช้สังคม</label>
                </div>
                <div className="flex gap-x-1 py-1 text-sm">
                  <CheckBoxOutlineBlankOutlinedIcon />
                  {/* <CheckBoxOutlinedIcon /> */}
                  <label className="whitespace-nowrap pl-1">
                    วิชาการก้าวหน้า
                  </label>
                </div>
                <div className="flex gap-x-1 py-1 text-sm">
                  <CheckBoxOutlineBlankOutlinedIcon />
                  {/* <CheckBoxOutlinedIcon /> */}
                  <label className="whitespace-nowrap pl-1">พัฒนาสู่สากล</label>
                </div>
              </div>
            </div>
          </article>
          <article>
            <div className="flex gap-x-3 py-2 text-sm">
              <label className={`font-semibold`}>
                7.&nbsp;&nbsp;&nbsp;หลักการและเหตุผล
              </label>
            </div>
            <div className="pl-6">
              <div className="flex gap-x-3 py-1 text-sm">
                <p className="whitespace-normal">
                  โครงการที่ดำเนินการเองในแผนปฏิบัติการของหน่วยงาน/คณะวิชา
                </p>
              </div>
            </div>
          </article>
          <article>
            <div className="flex gap-x-3 py-2 text-sm">
              <label className={`font-semibold`}>
                8.&nbsp;&nbsp;&nbsp;วัตถุประสงค์ ตัวชี้วัด
                ค่าเป้าหมาย/เกณฑ์ความสำเร็จ และ
                เครื่องมือ/วิธีการเก็บรวบรวมข้อมูลตามตัวชี้วัด
              </label>
            </div>
            <div className="mb-1 flex justify-center">
              <table className="w-[95%] border border-black">
                <thead>
                  <tr className="text-center text-sm">
                    <td className="w-[25%] border border-black p-1">
                      วัตถุประสงค์โครงการ
                    </td>
                    <td className="w-[25%] border border-black p-1">
                      ตัวชี้วัด
                    </td>
                    <td className="w-[25%] border border-black p-1">
                      เป้าหมาย <br /> (เกณฑ์ความสำเร็จ)
                    </td>
                    <td className="w-[25%] border border-black p-1">
                      เครื่องมือ/วิธีการเก็บรวบรวมข้อมูลตามตัวชี้วัด
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-sm">
                    <td className="border border-black px-2 py-1">แงง</td>
                    <td className="border border-black px-2 py-1">แงง</td>
                    <td className="border border-black px-2 py-1">แงง</td>
                    <td className="border border-black px-2 py-1">แงง</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
          <article>
            <div className="flex gap-x-3 py-2 text-sm">
              <label className={`font-semibold`}>
                9.&nbsp;&nbsp;&nbsp;ประโยชน์ที่คาดว่าจะได้รับ
              </label>
            </div>
            <div className="pl-6">
              <div className="flex gap-x-1 py-1 text-sm">
                <label className="whitespace-nowrap">9.1&nbsp;&nbsp;</label>
                <p className="whitespace-normal">...</p>
              </div>
            </div>
          </article>
          <article>
            <div className="flex gap-x-3 py-2 text-sm">
              <label className={`font-semibold`}>
                10.&nbsp;&nbsp;&nbsp;วิธีดำเนินงานและระยะเวลาดำเนินโครงการ
              </label>
            </div>
            <div className="pl-6">
              <div className="flex gap-x-1 py-1 text-sm">
                <label className="whitespace-nowrap">10.1&nbsp;&nbsp;</label>
                <p className="whitespace-normal">...</p>
              </div>
            </div>
          </article>
          <article>
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
                <p className="whitespace-normal">...</p>
              </div>
              <div className="flex gap-x-1 py-1 text-sm">
                <label className="whitespace-nowrap">
                  11.2&nbsp;&nbsp;วัน/เวลา ที่จัดโครงการ
                </label>
                <p className="whitespace-normal">...</p>
              </div>
              <div className="flex gap-x-1 py-2 text-sm">
                <label className="whitespace-nowrap">
                  11.3&nbsp;&nbsp;กำหนดการ (โดยละเอียด)
                </label>
              </div>
              <div className="mb-1 flex justify-center">
                <table className="w-[95%] border border-black">
                  <thead>
                    <tr className="text-center text-sm">
                      <td className="w-[20%] border border-black p-1">
                        วันที่
                      </td>
                      <td className="w-[20%] border border-black p-1">เวลา</td>
                      <td className="w-[60%] border border-black p-1">
                        รายการกิจกรรม
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-sm">
                      <td className="border border-black px-2 py-1">
                        12/12/2566
                      </td>
                      <td className="border border-black px-2 py-1">
                        08:00 - 16:00
                      </td>
                      <td className="border border-black px-2 py-1">แงง</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </article>
          <article>
            <div className="flex gap-x-3 py-2 text-sm">
              <label className={`font-semibold`}>
                12.&nbsp;&nbsp;&nbsp;วิทยากร (ถ้ามี)
              </label>
              <p className="whitespace-normal">...</p>
            </div>
          </article>
          <article>
            <div className="flex gap-x-3 py-2 text-sm">
              <label className={`font-semibold`}>
                13.&nbsp;&nbsp;&nbsp;ผู้เข้าร่วมโครงการ/กลุ่มเป้าหมาย
              </label>
              <p className="whitespace-normal">(รวมจำนวน ... คน)</p>
            </div>
            <div className="mb-1 flex justify-center">
              <table className="w-[95%]">
                <tbody>
                  <tr className="text-sm">
                    <td className="w-[8%] px-2 py-1">13.1</td>
                    <td className="w-[62%] px-2 py-1">....</td>
                    <td className="w-[10%] px-2 py-1 text-center">จำนวน</td>
                    <td className="w-[12%] px-2 py-1 text-center">...</td>
                    <td className="w-[8%]px-2 py-1 text-center">คน</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
          <article>
            <div className="flex gap-x-3 py-2 text-sm">
              <label className={`font-semibold`}>
                14.&nbsp;&nbsp;&nbsp;การปรับปรุงจากข้อเสนอแนะของโครงการที่ผ่านมา/โครงการที่มีลักษณะใกล้เคียงกัน
              </label>
            </div>
            <div className="pl-6">
              <div className="flex gap-x-3 py-1 text-sm">
                <p className="whitespace-normal">...</p>
              </div>
            </div>
          </article>
          <article>
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
              <div className="mb-1 flex justify-center">
                <table className="w-[95%]">
                  <thead>
                    <tr className="text-center text-sm">
                      <td className="w-[10%] border border-black p-1">
                        ลำดับที่
                      </td>
                      <td className="w-[45%] border border-black p-1">
                        รายการ
                      </td>
                      <td className="w-[15%] border border-black p-1">
                        จำนวนเงิน
                      </td>
                      <td className="w-[30%] border border-black p-1">
                        แหล่งที่มาของรายรับ
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-sm">
                      <td className="border border-black px-2 py-1 text-center">
                        1
                      </td>
                      <td className="border border-black px-2 py-1">...</td>
                      <td className="border border-black px-2 py-1 text-center">
                        ...
                      </td>
                      <td className="border border-black px-2 py-1">...</td>
                    </tr>
                    <tr className="text-sm">
                      <td colSpan={2} className="px-2 py-1 text-right">
                        รวมงบประมาณรายรับ
                      </td>
                      <td className="border border-black px-2 py-1 text-center">
                        0
                      </td>
                      <td className="px-2 py-1 text-left">บาท</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex gap-x-1 py-2 text-sm">
                <label className="whitespace-nowrap">
                  15.2&nbsp;&nbsp;งบประมาณรายจ่าย
                </label>
              </div>
              <div className="mb-1 flex justify-center">
                <table className="w-[95%]">
                  <thead>
                    <tr className="text-center text-sm">
                      <td className="w-[10%] border border-black p-1">
                        ลำดับที่
                      </td>
                      <td className="w-[45%] border border-black p-1">
                        รายการ
                      </td>
                      <td className="w-[15%] border border-black p-1">
                        จำนวนเงิน
                      </td>
                      <td className="w-[30%] border border-black p-1">
                        หมายเหตุ
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-sm">
                      <td className="border border-black px-2 py-1 text-center">
                        1
                      </td>
                      <td className="border border-black px-2 py-1">...</td>
                      <td className="border border-black px-2 py-1 text-center">
                        ...
                      </td>
                      <td className="border border-black px-2 py-1">...</td>
                    </tr>
                    <tr className="text-sm">
                      <td colSpan={2} className="px-2 py-1 text-right">
                        รวมงบประมาณรายจ่าย
                      </td>
                      <td className="border border-black px-2 py-1 text-center">
                        0
                      </td>
                      <td className="px-2 py-1 text-left">บาท</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </article>
          <article>
            <div className="flex gap-x-3 py-1 text-sm">
              <p
                ref={paragraphRef}
                dangerouslySetInnerHTML={{ __html: '' }}
              ></p>
            </div>
          </article>
          <article>
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
          <figure></figure>
        </div>
      </div>
    </section>
  );
}
