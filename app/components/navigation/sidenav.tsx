import Link from 'next/link';
import NavLinks, { ProfileButton } from '@/app/components/navigation/nav-links';
import BannerLogo from '@/app/components/banner-logo';
import { auth, signOut } from '@/auth';
import { getUserLoginData } from '@/app/lib/api-service';
import NavHamberger from '@/app/components/navigation/nav-hamberger';
import { PowerIcon } from '@heroicons/react/24/outline';

export default async function SideNav() {
  const authResult = (await auth()) as any;
  const user = authResult?.user || null;

  const email = authResult?.user?.email ?? null;
  const userData = email ? await getUserLoginData(email) : null;

  return (
    <div className="z-10 flex w-full flex-col md:fixed md:h-screen md:w-80 md:px-2 md:py-4">
      <Link
        className="hidden h-16 items-end justify-start bg-blue-600 p-4 md:mb-2 md:flex md:h-40 md:rounded-md"
        href="/"
      >
        <div className="w-full text-white">
          <BannerLogo />
        </div>
      </Link>
      <NavHamberger userData={userData} />
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks userData={user} />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        {user && (
          <>
            <ProfileButton name={userData?.firstname} />
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button className="hidden h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex md:flex-none md:justify-start md:p-2 md:px-3">
                <PowerIcon className="w-6" />
                <div className="text-base">ออกจากระบบ</div>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
