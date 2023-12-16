import SideNav from '@/app/components/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-80 print:hidden">
        <SideNav />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12 print:pt-0">{children}</div>
    </div>
  );
}
