import { PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const menu = [
  {
    title: 'ประเด็นยุทธศาสตร์',
    path: '/setting/pn01-select/strategic-issue',
  },
  {
    title: 'เป้าประสงค์',
    path: '/setting/pn01-select/objective',
  },
  {
    title: 'กลยุทธ์ระดับมหาวิทยาลัย',
    path: '/setting/pn01-select/university_strategic',
  },
  {
    title: 'ตัวชี้วัดแผนกลยุทธ์',
    path: '/setting/pn01-select/strategic_plan_kpi',
  },
  {
    title: 'ตัวชี้วัดแผนปฏิบัติการ',
    path: '/setting/pn01-select/operational_plan_kpi',
  },
  {
    title: 'ตัวชี้วัดโครงการ',
    path: '/setting/pn01-select/project_kpi',
  },
  {
    title: 'สถานะโครงการ',
    path: '/setting/pn01-select/project_status',
  },
];

export default function PN01SelectMenu() {
  return (
    <>
      {menu.map((menuItem, index) => (
        <div
          key={index}
          className="flex h-20 w-full items-center justify-between gap-1 rounded-md border bg-gray-50 p-4 hover:border-blue-500"
        >
          <p className="text-lg font-semibold text-gray-800">
            {menuItem.title}
          </p>
          <div className={`rounded-md border p-2 bg-gray-100 hover:bg-gray-200`}>
            <Link href={menuItem.path}>
              <PencilIcon className="w-5" />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
