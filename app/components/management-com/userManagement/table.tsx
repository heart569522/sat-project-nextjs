import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice, EditButton, DeleteButton } from '@/app/components/buttons/buttons';
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
                  ชื่อผู้ใช้งาน
                </th>
                <th scope="col" className="px-3 py-5">
                  ตำแหน่ง
                </th>
                <th scope="col" className="px-3 py-5">
                  คณะ / สังกัด
                </th>
                <th scope="col" className="px-3 py-5">
                  สาขา
                </th>
                <th scope="col" className="px-3 py-5">
                  เบอร์โทร
                </th>
                <th scope="col" className="px-3 py-5">
                  อีเมล
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
                    อาจารย์ สมรชัย ชัยชนะ
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    smonchai889
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    superAdmin
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    บริหารธุรกิจและวิทยาศาสตร์
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    วิศวกรรมซอฟต์แวร์
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    098-7658912
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    smonchai1972@test.com
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex gap-2 justify-center">
                      <EditButton />
                      <DeleteButton id='1' apiPath=''/>
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
                    ดร.กมลรัต สมรปัก
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    kmonrak1982
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    Admin
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    ศิลปศาสตรบัณฑิต
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    จิตวิทยา
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    085-9178452
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    kmonraklover@test.com
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex gap-2 justify-center">
                      <EditButton />
                      <DeleteButton id='1' apiPath=''/>
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
                    อาจารย์ สมกิต กิจใจใส่
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    Somkait1976
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    user
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    เภสัชศาสตรบัณฑิต
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    การบริบาลทางเภสัชกรรม
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    065-9814786
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    somkit1976@test.com
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex gap-2 justify-center">
                      <EditButton />
                      <DeleteButton id='1' apiPath=''/>
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
                    ดร.ธรกฤติ สานสัมพันธ์
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    Dr_thanakrit
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    user
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    บริหารธุรกิจบัณฑิต
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    ธุรกิจดิจิทัลและเทคโนโลยีทางการเงิน
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    053-9187452
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    Dr_thanakrity1979@test.com
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex gap-2 justify-center">
                      <EditButton />
                      <DeleteButton id='1' apiPath=''/>
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
