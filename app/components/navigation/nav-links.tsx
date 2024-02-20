'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React from 'react';
// import { ButtonLogoutMoblie } from '../buttons/button-logout';
import { Users } from '@/app/model/user';
import { signOut } from '@/auth';

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

export default function NavLinks({ userData }: { userData: Users }) {
  const pathname = usePathname();

  const allowedPaths = {
    teacher: [
      '/project-proposal',
      '/activity-record',
      '/activity-history',
      '/test',
    ],
    admin: [
      '/project-proposal',
      '/activity-record',
      '/activity-history',
      '/test',
      '/management',
      '/dashboard',
    ],
  };

  // Get the allowed paths based on the user's role or use default for other roles
  const allowedPathsForRole = allowedPaths[
    userData?.role as keyof typeof allowedPaths
  ] || ['/', '/activity-history', '/test'];

  // Filter links based on allowed paths
  const filteredLinks = links.filter((link) =>
    allowedPathsForRole.some((allowedPath) =>
      allowedPath === '/'
        ? link.href === '/'
        : link.href.startsWith(allowedPath),
    ),
  );

  return (
    <>
      {filteredLinks.map((link, index) => {
        const LinkIcon = link.icon;
        const isActive =
          pathname.startsWith(link.href) &&
          (link.href === '/' ? pathname === '/' : true);

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'hidden h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium transition hover:bg-sky-100 hover:text-blue-600 md:flex md:flex-none md:justify-start md:p-2 md:px-3',
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

export function NavLinksMobile({
  userData,
  closeMobileNav,
}: {
  userData: Users;
  closeMobileNav: () => void;
}) {
  const pathname = usePathname();

  const allowedPaths = {
    teacher: [
      '/project-proposal',
      '/activity-record',
      '/activity-history',
      '/test',
    ],
    admin: [
      '/project-proposal',
      '/activity-record',
      '/activity-history',
      '/test',
      '/management',
      '/dashboard',
    ],
  };

  // Get the allowed paths based on the user's role or use default for other roles
  const allowedPathsForRole = allowedPaths[
    userData?.role as keyof typeof allowedPaths
  ] || ['/', '/activity-history', '/test'];

  // Filter links based on allowed paths
  const filteredLinks = links.filter((link) =>
    allowedPathsForRole.some((allowedPath) =>
      allowedPath === '/'
        ? link.href === '/'
        : link.href.startsWith(allowedPath),
    ),
  );

  return (
    <>
      {filteredLinks.map((link, index) => {
        const LinkIcon = link.icon;
        const isActive =
          pathname.startsWith(link.href) &&
          (link.href === '/' ? pathname === '/' : true);

        return (
          <React.Fragment key={index}>
            <li
              onClick={() => {
                closeMobileNav();
              }}
              className="block px-2 py-0 md:hidden"
            >
              <Link
                href={link.href}
                className={`flex h-10 flex-none items-center justify-start gap-2 rounded-sm border-b border-gray-300 p-2 px-3 text-base font-medium transition ${
                  isActive
                    ? 'border-none bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                aria-current="page"
              >
                <p className="">{link.name}</p>
              </Link>
            </li>
          </React.Fragment>
        );
      })}

      {userData && (
        <div className="mt-8 flex items-center justify-end px-2 py-0">
          <div
            onClick={() => {
              closeMobileNav();
            }}
          >
            <ProfileButtonMobile name={userData?.firstname} />
          </div>
          {/* <ButtonLogoutMoblie /> */}
          {/* <button
            onClick={() => signOut()}
            className="flex h-8 items-center justify-start gap-2 rounded-md bg-gray-200 p-2 px-3 text-sm font-medium text-gray-900 transition hover:bg-gray-300"
          >
            ออกจากระบบ
          </button> */}
        </div>
      )}
    </>
  );
}

export function ProfileButton({ name }: { name: string | undefined }) {
  const pathname = usePathname();
  const isActive = pathname === '/profile';

  return (
    <Link
      href="/profile"
      className={clsx(
        'hidden h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex md:flex-none md:justify-start md:p-2 md:px-3',
        {
          'bg-sky-100 text-blue-600': isActive,
        },
      )}
    >
      <UserIcon className="w-6" />
      <p className="hidden md:block">{'คุณ' + ' ' + name || 'โปรไฟล์'}</p>
    </Link>
  );
}

export function ProfileButtonMobile({ name }: { name: string | undefined }) {
  const pathname = usePathname();
  const isActive = pathname === '/profile';

  return (
    <Link
      href="/profile"
      className={`flex h-9 items-center justify-start gap-2 rounded-sm p-2 px-3 text-sm font-medium transition ${
        isActive
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
      }`}
    >
      <p className="">{'คุณ' + ' ' + name || 'โปรไฟล์'}</p>
    </Link>
  );
}
