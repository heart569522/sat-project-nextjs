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
                  ชื่อ-สกุลผู้รับ
                </th>
                <th scope="col" className="px-3 py-5">
                  รหัสนักศึกษา
                </th>
                <th scope="col" className="px-3 py-5">
                  วันที่ยื่นคำร้อง
                </th>
                <th scope="col" className="px-3 py-5">
                  รูปแบบการรับ
                </th>
                <th scope="col" className="px-3 py-5">
                  อีเมล
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
                    นายสมศักดิ์ ใจงาม
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    632901882
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    08-01-2024
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    รับเอกสารด้วยตนเอง
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    wanasin@test.com
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
                    2
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    นางสาวนริวาศ วรชัย
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    640125998
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    07-01-2024
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    จัดส่งทางไปรษณีย์
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    somjai@test.com
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
                    นายอภิชาติ จงตระกูล
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    650981234
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    11-01-2024
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    จัดส่งทางไปรษณีย์
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    apichartfarm@test.com
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
                    4
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    นายตงจิต จิตอาสา
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    690128994
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    18-01-2024
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    รับเอกสารด้วยตนเอง
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    asddawd@gmail.com
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
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
