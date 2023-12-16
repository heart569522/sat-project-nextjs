import { sarabun } from '@/app/components/fonts';
import './style.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={`${sarabun.className}`}>{children}</main>
  );
}
