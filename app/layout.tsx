import '@/app/components/global.css';
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
      <body className={`${notoThai.className} antialiased`}>{children}</body>
    </html>
  );
}
