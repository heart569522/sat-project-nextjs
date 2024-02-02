import Image from 'next/image';
import {
  UpdateInvoice,
  DeleteInvoice,
  DeleteButton,
  EditButton,
} from '@/app/components/buttons/buttons';
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
                  ชื่อ-สกุล
                </th>
                <th scope="col" className="px-3 py-5">
                  รหัสนักศึกษา
                </th>
                <th scope="col" className="px-3 py-5">
                  โครงการ / กิจกรรม
                </th>
                <th scope="col" className="px-3 py-5">
                  จำนวนชั่วโมง
                </th>
                <th scope="col" className="px-3 py-5">
                  วันที่
                </th>
                <th scope="col" className="px-3 py-5">
                  แก้ไข / ลบ
                </th>
              </tr>
            </thead>
            <tbody className="justify-center bg-white text-center">
              <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                <td className="whitespace-nowrap px-3 py-3">1</td>
                <td className="whitespace-nowrap px-3 py-3">
                  นายสมศักดิ์ ใจงาม
                </td>
                <td className="whitespace-nowrap px-3 py-3">632901882</td>
                <td className="whitespace-nowrap px-3 py-3">ร่วมใจพายัพ</td>
                <td className="whitespace-nowrap px-3 py-3">4</td>
                <td className="whitespace-nowrap px-3 py-3">03-01-2024</td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-center gap-2">
                    <EditButton />
                    <DeleteButton id={1} apiPath=''/>
                  </div>
                </td>
              </tr>

              <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                <td className="whitespace-nowrap px-3 py-3">2</td>
                <td className="whitespace-nowrap px-3 py-3">
                  นางสาวนริวาศ วรชัย
                </td>
                <td className="whitespace-nowrap px-3 py-3">640125998</td>
                <td className="whitespace-nowrap px-3 py-3">ร่วมใจพายัพ</td>
                <td className="whitespace-nowrap px-3 py-3">4</td>
                <td className="whitespace-nowrap px-3 py-3">03-01-2024</td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-center gap-2">
                    <EditButton />
                    <DeleteButton id={1} apiPath=''/>
                  </div>
                </td>
              </tr>

              <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                <td className="whitespace-nowrap px-3 py-3">3</td>
                <td className="whitespace-nowrap px-3 py-3">
                  นายอภิชาติ จงตระกูล
                </td>
                <td className="whitespace-nowrap px-3 py-3">650981234</td>
                <td className="whitespace-nowrap px-3 py-3">ร่วมใจพายัพ</td>
                <td className="whitespace-nowrap px-3 py-3">4</td>
                <td className="whitespace-nowrap px-3 py-3">03-01-2024</td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-center gap-2">
                    <EditButton />
                    <DeleteButton id={1} apiPath=''/>
                  </div>
                </td>
              </tr>

              <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                <td className="whitespace-nowrap px-3 py-3">4</td>
                <td className="whitespace-nowrap px-3 py-3">
                  นายตงจิต จิตอาสา
                </td>
                <td className="whitespace-nowrap px-3 py-3">690128994</td>
                <td className="whitespace-nowrap px-3 py-3">
                  อาสาเก็บขยะโรงอาหาร
                </td>
                <td className="whitespace-nowrap px-3 py-3">3</td>
                <td className="whitespace-nowrap px-3 py-3">26-12-2023</td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-center gap-2">
                    <EditButton />
                    <DeleteButton id={1} apiPath=''/>
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
