import { sarabun } from '@/app/components/fonts';
import './style.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${sarabun.className}`}>{children}</div>
  );
}
