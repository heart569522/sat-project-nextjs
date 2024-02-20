'use client';

import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { NavLinksMobile } from './nav-links';
import { Users } from '@/app/model/user';
import Link from 'next/link';

export default function NavHamberger({ userData }: { userData: Users }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <div className="fixed top-0 w-full z-10 shadow-lg">
      <nav className="flex h-16 items-center justify-between bg-blue-600 p-4 md:hidden">
        <Link href="/" className="pb-1 text-lg font-semibold text-white">
          ระบบระเบียนกิจกรรมนักศึกษา
        </Link>
        <button
          type="button"
          className="h-10 w-10 rounded-lg p-2 text-base text-white ring-1 ring-gray-200 transition focus:outline-none focus:ring-2"
          onClick={toggleMobileNav}
        >
          {isMobileNavOpen ? (
            <>
              <span className="sr-only">Close main menu</span>
              <XMarkIcon />
            </>
          ) : (
            <>
              <span className="sr-only">Open main menu</span>
              <Bars3Icon />
            </>
          )}
        </button>
      </nav>
      <div className="relative z-10" id="navbar-hamburger">
        <ul
          className={`${
            isMobileNavOpen ? 'block' : 'hidden'
          } absolute flex w-full flex-col bg-gray-50 py-2 font-medium shadow-lg md:hidden`}
        >
          <NavLinksMobile userData={userData} closeMobileNav={closeMobileNav} />
        </ul>
      </div>
    </div>
  );
}
