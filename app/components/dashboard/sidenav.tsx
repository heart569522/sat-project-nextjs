import Link from 'next/link';
import NavLinks, { ProfileButton } from '@/app/components/dashboard/nav-links';
import BannerLogo from '@/app/components/banner-logo';
import { PowerIcon, UserIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import { auth } from '@/auth';

export default async function SideNav() {
  const authResult = (await auth()) as any;
  const user = authResult?.user || null;

  return (
    <div className="flex md:h-screen md:fixed md:w-80 flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-full text-white">
          <BannerLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks userData={user} />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        {user && (
          <>
            <ProfileButton />
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                <PowerIcon className="w-6" />
                <div className="hidden text-base md:block">ออกจากระบบ</div>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
