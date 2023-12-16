// 'use client';
import Image from 'next/image';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

export default function page() {
  return (
    <div className={`online-scope text-black`}>
      <div id="online-view-v1" className="online-view-v1">
        <div className="relative">
          <table className="w-full">
            <tbody>
              <tr className="">
                <td className="w-[20%]">
                  <Image
                    src="/payap-logo-blue.png"
                    alt="payap-logo"
                    width={416}
                    height={122}
                    className="w-44 mb-10"
                  />
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
          <div className="flex gap-x-3 py-2 text-sm">
            <label className={`font-semibold`}>
              1.&nbsp;&nbsp;&nbsp;ชื่อคณะ/วิทยาลัย/หน่วยงาน:
            </label>
            <p>แพนนนนน</p>
          </div>
          <div className="flex gap-x-3 py-2 text-sm">
            <label className={`font-semibold`}>
              2.&nbsp;&nbsp;&nbsp;ชื่อโครงการ:
            </label>
            <p>ยานนนนน</p>
          </div>
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
                  <td className="w-[10%] border border-black p-1">ลำดับที่</td>
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
                  ด้านทักษะการวิเคราะห์เชิงตัวเลข การสื่อสาร และการใช้เทคโนโลยี
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
              <label className="whitespace-nowrap pl-3">อื่นๆ (โปรดระบุ)</label>
              <p className="whitespace-normal">...</p>
            </div>
          </div>
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
                  <td className="w-[25%] border border-black p-1">ตัวชี้วัด</td>
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
        </div>
      </div>
    </div>
  );
}
