import '@/app/components/global.css';
import SideNav from '@/app/components/dashboard/sidenav';
import { notoThai } from '@/app/components/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | ระบบระเบียนกิจกรรมนักศึกษา',
    default: 'ระบบระเบียนกิจกรรมนักศึกษา มหาวิทยาลัยพายัพ',
  },
  description: 'สำนักพัฒนานักศึกษา มหาวิทยาลัยพายัพ',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${notoThai.className} antialiased`}>
        <div className="flex min-h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none border-r-2 shadow-xl print:hidden md:w-80">
            <SideNav />
          </div>
          <div className="grow p-6 print:pt-0 md:overflow-y-auto md:px-12">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
