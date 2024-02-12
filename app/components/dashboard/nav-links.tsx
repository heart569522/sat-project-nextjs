'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
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
  //   href: '/invoices',
  //   icon: DocumentDuplicateIcon,
  // },
  // { name: 'Customers', href: '/customers', icon: UserGroupIcon },
  {
    name: 'โครงการ/กิจกรรม',
    href: '/project-proposal',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'บันทึกการเข้าร่วมโครการ/กิจกรรม',
    href: '/activity-record',
    icon: ContactPageOutlinedIcon,
  },
  {
    name: 'ประวัติการเข้าร่วมโครงการ/กิจกรรม',
    href: '/activity-history',
    icon: FindInPageOutlinedIcon,
  },
  {
    name: 'จัดการคำร้องขอเสนอโครงการ/กิจกรรม (พน.01)',
    href: '/management/pn01',
    icon: FindInPageOutlinedIcon,
  },
  {
    name: 'จัดการข้อมูลบันทึกการเข้าร่วมโครงการกิจกรรม (พน.10)',
    href: '/management/pn10',
    icon: FindInPageOutlinedIcon,
  },
  {
    name: 'จัดการคำร้องขอระเบียนกิจกรรม (พน.11)',
    href: '/management/pn11',
    icon: FindInPageOutlinedIcon,
  },
  {
    name: 'จัดการข้อมูลผู้ใช้งานระบบ',
    href: '/management/user-management',
    icon: FindInPageOutlinedIcon,
  },
  {
    name: 'เข้าสู่ระบบ/สมัครสมาชิก',
    href: '/',
    icon: LoginOutlinedIcon,
  },
  { name: 'test', href: '/test', icon: DocumentDuplicateIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive =
          pathname.startsWith(link.href) &&
          (link.href === '/' ? pathname === '/' : true);

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
