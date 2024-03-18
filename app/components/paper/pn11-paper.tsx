import { PN11 } from '@/app/model/pn11';
import Image from 'next/image';
import CheckBoxOutlineBlankSharpIcon from '@mui/icons-material/CheckBoxOutlineBlankSharp';
import CheckBoxSharpIcon from '@mui/icons-material/CheckBoxSharp';

export default async function PN11Paper({ data }: { data: any }) {
  console.log('🚀 ~ PN11Paper ~ data:', data);

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
      left: 'left-1/3',
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
            className={`absolute ${positionClasses[position]} -translate-x-1/2 transform whitespace-nowrap pb-3`}
          >
            {text}
          </span>
        )}
      </div>
    );
  };

  return (
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
                      คำร้องขอหลักฐานการเข้าร่วมโครงการ (พน.11) <br />
                      สำนักพัฒนานักศึกษา มหาวิทยาลัยพายัพ
                    </p>
                  </td>
                  <td className="w-[20%]"></td>
                </tr>
              </tbody>
            </table>
            <p className="text-center">
              ********************************************************************************************************
            </p>
          </article>
          <article id="part" className="part">
            <div className="flex justify-end gap-x-0 py-2">
              <label className={`font-semibold`}>วันที่</label>
              <DotsPlaceholder
                numOfDots={30}
                text={data.date}
                position="center"
              />
            </div>
            <div className="flex justify-start gap-x-6 py-2">
              <label className={`font-semibold`}>เรื่อง</label>
              <p>ขอหลักฐานการเข้าร่วมโครงการ</p>
            </div>
            <div className="flex justify-start gap-x-6 py-2">
              <label className={`font-semibold`}>เรียน</label>
              <p>ผู้อำนวยการสำนักพัฒนานักศึกษา</p>
            </div>
          </article>
          <article id="part" className="part">
            <div className="flex flex-row justify-start py-1">
              <label className={`whitespace-nowrap pl-28 font-semibold`}>
                ข้าพเจ้า
              </label>
              <DotsPlaceholder
                numOfDots={145}
                text={`${data.firstname} ${data.lastname}`}
                position="left"
              />
            </div>
            <div className="flex flex-row justify-start py-1">
              <label className={`whitespace-nowrap font-semibold`}>
                รหัสประจำตัวนักศึกษา
              </label>
              <DotsPlaceholder
                numOfDots={60}
                text={data.student_id}
                position="center"
              />
              <label className={`whitespace-nowrap font-semibold`}>
                หมายเลขโทรศัพท์
              </label>
              <DotsPlaceholder
                numOfDots={59}
                text={data.phone}
                position="center"
              />
            </div>
            <div className="flex flex-row justify-start py-1">
              <label className={`whitespace-nowrap font-semibold`}>
                สาขาวิชา
              </label>
              <DotsPlaceholder
                numOfDots={170}
                text={data.major_name}
                position="left"
              />
            </div>
            <div className="flex flex-row justify-start py-1">
              <label className={`whitespace-nowrap font-semibold`}>
                คณะ/วิทยาลัย
              </label>
              <DotsPlaceholder
                numOfDots={162}
                text={data.faculty_name}
                position="left"
              />
            </div>
            <div className="flex flex-row justify-start py-1">
              <label className={`whitespace-nowrap font-semibold`}>
                มีความประสงค์ขอหลักฐานการเข้าร่วมโครงการ
              </label>
            </div>
          </article>
          <article id="part" className="part">
            <div className="mt-12 flex justify-end pr-16">
              <p className={`whitespace-nowrap`}>ลงชื่อ</p>
              <DotsPlaceholder numOfDots={60} position="center" />
              <p className={`whitespace-nowrap`}>ผู้ยื่นคำร้อง</p>
            </div>
            <div className="mt-4 flex justify-end pr-28">
              (<DotsPlaceholder numOfDots={68} position="center" />)
            </div>
          </article>
          <article id="part" className="part">
            <div className="mt-12">
              <label className={`whitespace-nowrap font-semibold underline`}>
                การรับเอกสาร
              </label>
              <div className="flex justify-start py-1 pl-6">
                {data.delivery_method == 'receive' ? (
                  <CheckBoxSharpIcon className="mt-[4px]" />
                ) : (
                  <CheckBoxOutlineBlankSharpIcon className="mt-[4px]" />
                )}
                <label className="whitespace-nowrap pl-1">
                  รับเอกสารด้วยตนเอง ที่ สำนักพัฒนานักศึกษา
                </label>
              </div>
              <div className="flex justify-start py-1 pl-6">
                {data.delivery_method == 'send' ? (
                  <CheckBoxSharpIcon className="mt-[4px]" />
                ) : (
                  <CheckBoxOutlineBlankSharpIcon className="mt-[4px]" />
                )}
                <label className="whitespace-nowrap pl-1">
                  จัดส่งทางไปรษณีย์ (ลงทะเบียน) ค่าบริการไปรษณีย์ 33 บาท
                </label>
              </div>
              <div className="flex justify-start pl-16">
                <p className="whitespace-nowrap">ชื่อ-นามสกุล (ผู้รับ)</p>
                <DotsPlaceholder
                  numOfDots={140}
                  text={data.recipient_name || null}
                  position="left"
                />
              </div>
              <div className="flex justify-start pl-16">
                <p className="whitespace-nowrap">ที่อยู่ในการจัดส่ง (ผู้รับ)</p>
                <DotsPlaceholder
                  numOfDots={134}
                  text={data.recipient_address || null}
                  position="center"
                />
              </div>
              <div className="flex justify-start pl-16">
                <p className="whitespace-nowrap">หมายเลขโทรศัพท์ (ผู้รับ)</p>
                <DotsPlaceholder
                  numOfDots={131}
                  text={data.recipient_phone || null}
                  position="left"
                />
              </div>
            </div>
          </article>
          <article id="part" className="part">
            <div className="mt-16">
              <p className="whitespace-nowrap text-center font-semibold">
                สำนักพัฒนานักศึกษา มหาวิทยาลัยพายัพ อาคารพันธกร หมายเลขโทรศัพท์
                0-5385-1478 ต่อ 316
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
