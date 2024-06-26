'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import React from 'react';
// import { ButtonLogoutMoblie } from '../buttons/button-logout';
import { Users } from '@/app/model/user';
import { logout } from '@/app/lib/actions';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
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
  { name: 'แดชบอร์ด', href: '/dashboard', icon: SpaceDashboardOutlinedIcon },
  {
    name: 'จัดการคำร้องขอเสนอโครงการ/กิจกรรม (พน.01)',
    href: '/management/pn01',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'จัดการข้อมูลบันทึกการเข้าร่วมโครงการกิจกรรม (พน.10)',
    href: '/management/pn10',
    icon: ContactPageOutlinedIcon,
  },
  {
    name: 'จัดการคำร้องขอระเบียนกิจกรรม (พน.11)',
    href: '/management/pn11',
    icon: HistoryEduOutlinedIcon,
  },
  {
    name: 'จัดการข้อมูลผู้ใช้งานระบบ',
    href: '/management/users',
    icon: ManageAccountsOutlinedIcon,
  },
  {
    name: 'ตั้งค่า',
    href: '/setting',
    icon: SettingsOutlinedIcon,
  },
  {
    name: 'เข้าสู่ระบบ/สมัครสมาชิก',
    href: '/',
    icon: LoginOutlinedIcon,
  },
];

export default function NavLinks({ userData }: { userData: Users }) {
  const pathname = usePathname();

  const allowedPaths = {
    teacher: ['/project-proposal', '/activity-record', '/activity-history'],
    admin: [
      '/project-proposal',
      '/activity-record',
      '/activity-history',
      '/management',
      '/dashboard',
      '/setting',
    ],
  };

  const isUserVerified = userData?.is_verify;

  const allowedPathsForUnverifiedUser = ['/activity-history'];
  const defaultPaths = ['/', '/activity-history'];

  const userRole = userData?.role;

  const allowedPathsForRole = userRole
    ? isUserVerified
      ? allowedPaths[userRole as keyof typeof allowedPaths]
      : allowedPathsForUnverifiedUser
    : defaultPaths;

  const filteredLinks = links.filter((link) =>
    allowedPathsForRole.some((allowedPath: string) =>
      allowedPath === '/'
        ? link.href === '/'
        : link.href.startsWith(allowedPath),
    ),
  );

  return (
    <>
      {userRole === 'admin' ? (
        <>
          {/* Display title for 'ทั่วไป' group */}
          {filteredLinks.some((link) =>
            [
              '/project-proposal',
              '/activity-record',
              '/activity-history',
            ].includes(link.href),
          ) && (
            <div className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white">
              ทั่วไป
            </div>
          )}

          {/* Display links for 'ทั่วไป' group */}
          {filteredLinks.map((link, index) => {
            const LinkIcon = link.icon;
            const isActive =
              pathname.startsWith(link.href) &&
              (link.href === '/' ? pathname === '/' : true);

            if (
              [
                '/project-proposal',
                '/activity-record',
                '/activity-history',
              ].includes(link.href)
            ) {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    'hidden h-[45px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium transition hover:bg-sky-100 hover:text-blue-600 md:flex md:flex-none md:justify-start md:p-2 md:px-3',
                    {
                      'bg-sky-100 text-blue-600': isActive,
                    },
                  )}
                >
                  <LinkIcon className="w-6" />
                  <p className="hidden md:block">{link.name}</p>
                </Link>
              );
            }
            return null;
          })}

          {/* Display title for 'เจ้าหน้าที่' group */}
          {filteredLinks.some((link) =>
            [
              '/management/pn01',
              '/management/pn10',
              '/management/pn11',
              '/management/users',
              '/dashboard',
              '/setting',
            ].includes(link.href),
          ) && (
            <div className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white">
              เจ้าหน้าที่
            </div>
          )}

          {/* Display links for 'เจ้าหน้าที่' group */}
          {filteredLinks.map((link, index) => {
            const LinkIcon = link.icon;
            const isActive =
              pathname.startsWith(link.href) &&
              (link.href === '/' ? pathname === '/' : true);

            if (
              [
                '/management/pn01',
                '/management/pn10',
                '/management/pn11',
                '/management/users',
                '/dashboard',
                '/setting',
              ].includes(link.href)
            ) {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    'hidden h-[45px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium transition hover:bg-sky-100 hover:text-blue-600 md:flex md:flex-none md:justify-start md:p-2 md:px-3',
                    {
                      'bg-sky-100 text-blue-600': isActive,
                    },
                  )}
                >
                  <LinkIcon className="w-6" />
                  <p className="hidden md:block">{link.name}</p>
                </Link>
              );
            }
            return null;
          })}
        </>
      ) : (
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
      )}
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
    teacher: ['/project-proposal', '/activity-record', '/activity-history'],
    admin: [
      '/project-proposal',
      '/activity-record',
      '/activity-history',
      '/management',
      '/dashboard',
      '/setting',
    ],
  };

  const isUserVerified = userData?.is_verify;

  const allowedPathsForUnverifiedUser = ['/activity-history', '/test'];
  const defaultPaths = ['/', '/activity-history', '/test'];

  const userRole = userData?.role;

  const allowedPathsForRole = userRole
    ? isUserVerified
      ? allowedPaths[userRole as keyof typeof allowedPaths]
      : allowedPathsForUnverifiedUser
    : defaultPaths;

  const filteredLinks = links.filter((link) =>
    allowedPathsForRole.some((allowedPath: string) =>
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
        <div className="mt-8 flex items-center justify-end gap-1 px-2 py-0">
          <div
            onClick={() => {
              closeMobileNav();
            }}
          >
            <ProfileButtonMobile name={userData?.firstname} />
          </div>
          <button
            onClick={() => {
              logout();
              closeMobileNav();
            }}
            className="flex h-9 items-center justify-start gap-2 rounded-sm bg-gray-200 p-2 px-3 text-sm font-medium text-gray-900 transition hover:bg-gray-300"
          >
            ออกจากระบบ
          </button>
        </div>
      )}
    </>
  );
}

export function DevButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.replace('/dev')}
      className="text-center text-sm text-blue-500 underline hover:text-blue-400 active:text-blue-600"
    >
      นักพัฒนา
    </button>
  );
}

export function DevBackButton({ className }: { className: string }) {
  return (
    <div className={`${className} `}>
      <a type="button" href="/">
        <div className="flex items-center justify-center rounded-lg  border-2 border-amber-100 p-3 text-center text-sm text-amber-100 transition hover:border-amber-300 hover:text-amber-100 active:text-amber-300">
          BACK
        </div>
      </a>
    </div>
  );
}

export function ProfileButton({ name }: { name: string | undefined }) {
  const pathname = usePathname();
  const isActive = pathname.startsWith('/profile');

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
  const isActive = pathname.startsWith('/profile');

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
