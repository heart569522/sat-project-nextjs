import Image from 'next/image';
import {
  UpdateInvoice,
  DeleteInvoice,
  EditButton,
  DeleteButton,
} from '@/app/components/buttons';
import InvoiceStatus from '@/app/components/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices } from '@/app/lib/data';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr className="text-center font-bold">
                <th scope="col" className="px-4 py-5 sm:pl-6">
                  ลำดับ
                </th>
                <th scope="col" className="px-3 py-5">
                  รหัสโครงการ
                </th>
                <th scope="col" className="px-3 py-5">
                  ชื่อโครงการ
                </th>
                <th scope="col" className="px-3 py-5">
                  ผู้ดำเนินโครงการ
                </th>
                <th scope="col" className="px-3 py-5">
                  วันที่เสนอโครงการ
                </th>
                <th scope="col" className="px-3 py-5">
                  หมายเลขโทรศัพท์ผู้ดำเนินการ <br /> / ผู้รับผิดชอบโครงการ
                </th>
                <th scope="col" className="px-3 py-5">
                  สถานะเอกสาร
                </th>
                <th scope="col" className="px-3 py-5">
                  แก้ไข / ลบ
                </th>
              </tr>
            </thead>
            <tbody className="justify-center bg-white text-center">
              <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                <td className="whitespace-nowrap px-3 py-3">1</td>
                <td className="whitespace-nowrap px-3 py-3">00011</td>
                <td className="whitespace-nowrap px-3 py-3">ร่วมใจพายัพ</td>
                <td className="whitespace-nowrap px-3 py-3">
                  อาจารย์ สมรชัย ชัยชนะ
                </td>
                <td className="whitespace-nowrap px-3 py-3">28-12-2023</td>
                <td className="whitespace-nowrap px-3 py-3">098-7658912</td>
                <td className="whitespace-nowrap px-3 py-3">
                  <button className="rounded-full bg-green-500 px-4 py-2 font-bold text-white">
                    อนุมัติ
                  </button>
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-center gap-2">
                    <EditButton />
                    <DeleteButton />
                  </div>
                </td>
              </tr>

              <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                <td className="whitespace-nowrap px-3 py-3">2</td>
                <td className="whitespace-nowrap px-3 py-3">00012</td>
                <td className="whitespace-nowrap px-3 py-3">
                  อาสาเก็บขยะโรงอาหาร
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  ดร.กมลรัต สมรปัก
                </td>
                <td className="whitespace-nowrap px-3 py-3">22-12-2023</td>
                <td className="whitespace-nowrap px-3 py-3">085-9178452</td>
                <td className="whitespace-nowrap px-3 py-3">
                  <button className="rounded-full bg-green-500 px-4 py-2 font-bold text-white">
                    อนุมัติ
                  </button>
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-center gap-2">
                    <EditButton />
                    <DeleteButton />
                  </div>
                </td>
              </tr>

              <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                <td className="whitespace-nowrap px-3 py-3">3</td>
                <td className="whitespace-nowrap px-3 py-3">00013</td>
                <td className="whitespace-nowrap px-3 py-3">ร่วมใจคลองสะอาด</td>
                <td className="whitespace-nowrap px-3 py-3">
                  อาจารย์ สมกิต กิจใจใส่
                </td>
                <td className="whitespace-nowrap px-3 py-3">02-01-2024</td>
                <td className="whitespace-nowrap px-3 py-3">065-9814786</td>
                <td className="whitespace-nowrap px-3 py-3">
                  <button className="rounded-full bg-red-500 px-4 py-2 font-bold text-white">
                    ไม่อนุมัติ
                  </button>
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-center gap-2">
                    <EditButton />
                    <DeleteButton />
                  </div>
                </td>
              </tr>

              <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                <td className="whitespace-nowrap px-3 py-3">4</td>
                <td className="whitespace-nowrap px-3 py-3">00014</td>
                <td className="whitespace-nowrap px-3 py-3">67 นันทนาการ</td>
                <td className="whitespace-nowrap px-3 py-3">
                  อาจารย์ สมกิต กิจใจใส่
                </td>
                <td className="whitespace-nowrap px-3 py-3">03-01-2024</td>
                <td className="whitespace-nowrap px-3 py-3">065-9814786</td>
                <td className="whitespace-nowrap px-3 py-3">
                  <button className="rounded-full bg-yellow-300 px-4 py-2 font-bold text-white">
                    กำลังพิจารณา
                  </button>
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-center gap-2">
                    <EditButton />
                    <DeleteButton />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
