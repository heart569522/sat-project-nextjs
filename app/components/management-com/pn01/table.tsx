import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/components/buttons';
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
            <tbody className="bg-white justify-center text-center">
                <tr
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    1
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    00011
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    ร่วมใจพายัพ
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    อาจารย์ สมรชัย ชัยชนะ
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    28-12-2023
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    098-7658912
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-full">
                      อนุมัติ
                    </button>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex gap-2 justify-center">
                      <UpdateInvoice />
                      <DeleteInvoice />
                    </div>
                  </td>
                </tr>

                <tr
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    2
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    00012
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    อาสาเก็บขยะโรงอาหาร
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    ดร.กมลรัต สมรปัก
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    22-12-2023
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    085-9178452
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-full">
                      อนุมัติ
                    </button>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex gap-2 justify-center">
                      <UpdateInvoice />
                      <DeleteInvoice />
                    </div>
                  </td>
                </tr>

                <tr
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    3
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    00013
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    ร่วมใจคลองสะอาด
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    อาจารย์ สมกิต กิจใจใส่
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    02-01-2024
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    065-9814786
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-full">
                      ไม่อนุมัติ
                    </button>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex gap-2 justify-center">
                      <UpdateInvoice />
                      <DeleteInvoice />
                    </div>
                  </td>
                </tr>

                <tr
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    4
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    00014
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    67 นันทนาการ
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    อาจารย์ สมกิต กิจใจใส่
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    03-01-2024
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    065-9814786
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <button className="bg-yellow-300 text-white font-bold py-2 px-4 rounded-full">
                      กำลังพิจารณา
                    </button>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex gap-2 justify-center">
                      <UpdateInvoice />
                      <DeleteInvoice />
                    </div>
                  </td>
                </tr>

                <tr
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    5
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    00015
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    รับน้องสร้างสรรค์
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    ดร.ธรกฤติ สานสัมพันธ์
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    08-01-2024
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    053-9187452
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <button className="bg-gray-400 text-white font-bold py-2 px-4 rounded-full">
                      แบบร่าง
                    </button>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex gap-2 justify-center">
                      <UpdateInvoice />
                      <DeleteInvoice />
                    </div>
                  </td>
                </tr>

                <tr
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    6
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    00016
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    ส่งใจให้พระเจ้า
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    อาจารย์อันตการ นกกมล
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    12-01-2024
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    063-9184572
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <button className="bg-gray-400 text-white font-bold py-2 px-4 rounded-full">
                      แบบร่าง
                    </button>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex gap-2 justify-center">
                      <UpdateInvoice />
                      <DeleteInvoice />
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
