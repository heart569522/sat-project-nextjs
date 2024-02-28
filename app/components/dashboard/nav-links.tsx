'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  ChartPieIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useRouter } from 'next/router';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  // { name: 'Home', href: '/dashboard', icon: HomeIcon },
  // {
  //   name: 'Invoices',
  //   href: '/dashboard/invoices',
  //   icon: DocumentDuplicateIcon,
  // },
  // { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
  {
    name: 'แผงรายงาน',
    href: '/dashboard/dashboardEx',
    icon: ChartPieIcon,
  },
  {
    name: 'โครงการ/กิจกรรม',
    href: '/dashboard/project-proposal',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'บันทึกการเข้าร่วมโครการ/กิจกรรม',
    href: '/dashboard/activity-record',
    icon: ContactPageOutlinedIcon,
  },
  {
    name: 'ประวัติการเข้าร่วมโครงการ/กิจกรรม',
    href: '/dashboard/activity-history',
    icon: FindInPageOutlinedIcon,
  },
  {
    name: 'จัดการคำร้องขอเสนอโครงการ/กิจกรรม (พน.01)',
    href: '/dashboard/management/pn01',
    icon: Cog6ToothIcon,
  },
  {
    name: 'จัดการข้อมูลบันทึกการเข้าร่วมโครงการกิจกรรม (พน.10)',
    href: '/dashboard/management/pn10',
    icon: Cog6ToothIcon,
  },
  {
    name: 'จัดการคำร้องขอระเบียนกิจกรรม (พน.11)',
    href: '/dashboard/management/pn11',
    icon: Cog6ToothIcon,
  },
  {
    name: 'จัดการข้อมูลผู้ใช้งานระบบ',
    href: '/dashboard/management/user-management',
    icon: Cog6ToothIcon,
  },
  {
    name: 'เข้าสู่ระบบ/สมัครสมาชิก',
    href: '/dashboard/login-register',
    icon: LoginOutlinedIcon,
  },
  { name: 'test', href: '/dashboard/test', icon: DocumentDuplicateIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive =
          pathname.startsWith(link.href) &&
          (link.href === '/dashboard' ? pathname === '/dashboard' : true);

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': isActive,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
